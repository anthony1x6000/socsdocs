import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';
import { useSession } from '../lib/auth-client';
import Typography from '../components/ui/Typography';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Card from '../components/ui/Card';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Moveable } from '../components/ui/Moveables';
import { textAnimationMap } from '../assets/config/animations';
import { textColors, titleWeights } from '../assets/config/componentStyles';
import { API_URL } from '../config/protectedExports';

// --- Types ---

interface Message {
    id: string;
    content: string;
    senderId: string;
    date: string | Date;
    sender?: {
        name: string;
    };
}

// --- Hooks ---

/**
 * Hook to fetch chat messages from the server.
 */
export const useChatMessages = (token?: string) => {
    return useQuery<Message[]>({
        queryKey: ['chatMessages'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/chat`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed to fetch messages');
            return res.json();
        },
        enabled: !!token,
        refetchInterval: 3000, // Poll every 3 seconds for real-time updates
    });
};

/**
 * Hook to send a chat message to the server.
 */
export const useSendMessage = (token?: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (content: string) => {
            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ content }),
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed to send message');
            return res.json();
        },
        onSuccess: () => {
            // Immediate refetch on success for the sender
            qc.invalidateQueries({ queryKey: ['chatMessages'] });
        },
    });
};

// --- Sub-components ---

/**
 * Formats a date into a 24-hour EST string.
 */
const formatESTTime = (dateInput: string | Date) => {
    return new Date(dateInput).toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

/**
 * Renders a single message bubble with metadata.
 */
const MessageItem = ({ 
    message, 
    isMe 
}: { 
    message: Message; 
    isMe: boolean 
}) => {
    const estTime = formatESTTime(message.date);

    return (
        <div className={twMerge(
            "flex flex-col max-w-[75%]",
            isMe ? "self-end items-end" : "self-start items-start"
        )}>
            {/* Sender Name (only for others) */}
            {!isMe && (
                <Typography variant="text" className="text-xs text-gray-400 mb-1 ml-1">
                    {message.sender?.name || 'Unknown User'}
                </Typography>
            )}

            {/* Message Bubble (Button style) */}
            <Button 
                className={twMerge(
                    "p-3 h-auto text-left font-normal flex flex-col items-start border chat-font",
                    isMe 
                        ? 'bg-blue-600/30 border-blue-500 hover:bg-blue-600/50 active:bg-blue-600/70' 
                        : 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 active:bg-gray-700/70'
                )}
            >
                <Typography variant="text" className="chat-font">
                    {message.content}
                </Typography>
            </Button>

            {/* External Timestamp */}
            <Typography variant="text" className="text-[10px] text-gray-400 mt-1 opacity-70 chat-font mx-1">
                {estTime}
            </Typography>
        </div>
    );
};

/**
 * The input form at the bottom of the chat.
 */
const ChatInput = ({ 
    onSend, 
    disabled 
}: { 
    onSend: (content: string) => void; 
    disabled: boolean 
}) => {
    const [content, setContent] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || disabled) return;
        
        onSend(content);
        setContent('');
        
        // Ensure the input remains focused after sending
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <div className="p-4 border-t border-gray-700 bg-black/20">
            <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1">
                    <Input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Type a message..." 
                        className="chat-font"
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        disabled={disabled}
                    />
                </div>
                <Button 
                    type="submit" 
                    className="rounded-none chat-font" 
                    disabled={!content.trim() || disabled}
                >
                    {disabled ? 'Sending...' : 'Send'}
                </Button>
            </form>
        </div>
    );
};

// --- Main Page ---

export default function ChatPage() {
    const { data: session, isPending: isSessionPending } = useSession();
    const token = session?.session?.token;
    
    const { data: messages, isPending: isMessagesPending, error: fetchError } = useChatMessages(token);
    const sendMessage = useSendMessage(token);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (isSessionPending) return <Typography variant="text">Loading...</Typography>;
    if (!session) return <Typography variant="text">Please login to view the chat.</Typography>;

    return (
        <Moveable className="w-full overflow-hidden h-[calc(100vh-4em)] p-8 flex flex-col items-center">
            <div className="flex flex-col items-center gap-[2em] w-full max-w-4xl h-full mx-auto">
                
                {/* Header Section */}
                <Moveable as="div" animationMap={textAnimationMap} colorDict={textColors} weightDict={titleWeights} className="flex flex-col items-center">
                    <Typography variant="title">Global Chat</Typography>
                    <Button variant="link" to="/" className="text-gray-400 mt-2">Go Back to Dashboard</Button>
                    <ErrorMessage>
                        {fetchError?.message || sendMessage.error?.message}
                    </ErrorMessage>
                </Moveable>

                {/* Main Chat Container */}
                <Card className="flex flex-col w-full flex-1 overflow-hidden p-0 gap-0">
                    
                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scrollbar-thin">
                        {isMessagesPending ? (
                            <div className="text-center text-gray-400">Loading messages...</div>
                        ) : messages?.length === 0 ? (
                            <div className="text-center text-gray-400">No messages yet. Say hello!</div>
                        ) : (
                            messages?.map((msg) => (
                                <MessageItem 
                                    key={msg.id} 
                                    message={msg} 
                                    isMe={msg.senderId === session.user.id} 
                                />
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Section */}
                    <ChatInput 
                        onSend={(content) => sendMessage.mutate(content)} 
                        disabled={sendMessage.isPending} 
                    />
                </Card>
            </div>
        </Moveable>
    );
}
