import { fetch } from 'expo/fetch'

export const fetchData = async (payload: any, endPoint: string, onChunk?: (chunk: string) => void) => {
    try {
        const response = await fetch(`http://192.168.0.103:3000/${endPoint}`, {
            method: payload ? "POST" : "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: 'text/event-stream'
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        if (onChunk) {

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader?.read() || {};
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                onChunk(chunk);
            }
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error("Error fetching:", error);
    }
};