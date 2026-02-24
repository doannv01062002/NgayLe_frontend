import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://localhost:8080/ws';

class WebSocketService {
    private client: Client;
    private connected: boolean = false;

    private connectListeners: (() => void)[] = [];

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS(SOCKET_URL),
            onConnect: () => {
                console.log('Connected to WebSocket');
                this.connected = true;
                this.connectListeners.forEach(listener => listener());
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                this.connected = false;
            },
            onStompError: (frame: any) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
    }

    activate() {
        if (!this.client.active) {
            this.client.activate();
        }
    }

    deactivate() {
        if (this.client.active) {
            this.client.deactivate();
        }
    }

    subscribe(topic: string, callback: (message: Message) => void) {
        return this.client.subscribe(topic, callback);
    }
    
    // Helper to run code when connected
    onConnect(callback: () => void) {
        if (this.connected) {
            callback();
        }
        // Always add to listeners in case of reconnect? 
        // Or just add if not connected? 
        // For useChat useEffect, we don't want it to fire twice if we are already connected.
        // But if it disconnects and reconnects, we might want to resubscribe.
        // Let's add it to listeners only if we rely on it for re-subscription.
        // For now, simpler:
        if (!this.connected) {
             this.connectListeners.push(callback);
        }
    }

    // New method to remove listener if needed, avoiding memory leaks
    removeConnectListener(callback: () => void) {
        this.connectListeners = this.connectListeners.filter(l => l !== callback);
    }

    sendMessage(destination: string, body: any) {
        if (this.client.connected) {
            this.client.publish({
                destination: destination,
                body: JSON.stringify(body),
            });
        } else {
            console.warn('Client is not connected');
        }
    }
    
    getClient() {
        return this.client;
    }
}

export const webSocketService = new WebSocketService();
