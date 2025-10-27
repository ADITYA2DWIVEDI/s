export interface ChatMessage {
    role: 'user' | 'model' | 'loading';
    text: string;
}
