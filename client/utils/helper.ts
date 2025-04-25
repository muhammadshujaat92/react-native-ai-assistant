import { fetch } from 'expo/fetch'
import { getAuthToken } from './storage';

export const fetchData = async (payload: any, endPoint: string, onChunk?: (chunk: string) => void) => {
    try {
        const token = await getAuthToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            ...(token ? { 'auth-token': token } : {})
        };

        const response = await fetch(`http://192.168.0.103:3000/${endPoint}`, {
            method: payload ? "POST" : "GET",
            headers,
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