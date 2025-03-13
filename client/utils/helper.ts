import { fetch } from 'expo/fetch'

export const fetchData = async (payload: any, endPoint: string, onChunk: (chunk: string) => void) => {
    try {
        const response = await fetch(`http://192.168.0.103:3000/${endPoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'text/event-stream'
            },
            body: JSON.stringify(payload),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader?.read() || {};
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            onChunk(chunk);
        }
    } catch (error) {
        console.error("Error fetching:", error);
    }
};