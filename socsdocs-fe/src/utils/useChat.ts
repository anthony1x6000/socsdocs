import { useMutation, useQuery, useQueryClient, queryOptions } from '@tanstack/react-query';
import { API_URL } from '../config/protectedExports';

export interface Message {
    id: string;
    content: string;
    senderId: string;
    date: string | Date;
    sender?: {
        name: string;
    };
}

/**
 * Query options for fetching chat messages.
 */
export const chatMessagesQueryOptions = (token?: string) => queryOptions({
    queryKey: ['chatMessages', token],
    queryFn: async () => {
        const res = await fetch(`${API_URL}/api/chat`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch messages');
        return res.json() as Promise<Message[]>;
    },
    enabled: !!token,
    refetchInterval: 3000,
});

/**
 * Hook to fetch chat messages from the server.
 */
export const useChatMessages = (token?: string) => {
    return useQuery(chatMessagesQueryOptions(token));
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
            qc.invalidateQueries({ queryKey: chatMessagesQueryOptions(token).queryKey });
        },
    });
};
