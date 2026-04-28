import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChatMessages = () => {
    return useQuery({
        queryKey: ['chatMessages'],
        queryFn: async () => fetch('/api/chat').then(res => res.json()),
    });
};

export const useSendMessage = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (content: string) => 
            fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({ content }),
            }),
            onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['chatMessages'] });
          },
    });
};     
export default function ChatPage() {
    return (
        <>
            <h1>Chat Page</h1>
            <p>This is the chat page.</p>
        </>
    )
}