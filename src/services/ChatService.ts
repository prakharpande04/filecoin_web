import MosaiaService from '../../mosaia.js';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

class ChatService {
  private mosaiaService: any;
  private messages: Message[] = [];
  
  constructor() {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      console.error('API key not found. Please check your .env file.');
    }
    
    try {
      this.mosaiaService = new MosaiaService(apiKey);
      // Add initial system message
      this.addMessage('assistant', 'Hello! I\'m your AI assistant. How can I help you today?');
    } catch (error) {
      console.error('Failed to initialize Mosaia service:', error);
    }
  }
  
  /**
   * Add a new message to the chat history
   */
  addMessage(role: 'user' | 'assistant', content: string): void {
    this.messages.push({ role, content });
  }
  
  /**
   * Get all messages in the chat history
   */
  getMessages(): Message[] {
    return this.messages;
  }
  
  /**
   * Send a message to the Mosaia AI and get a response
   */
  async sendMessage(content: string): Promise<string> {
    if (!content.trim()) {
      return '';
    }
    
    // Add user message to history
    this.addMessage('user', content);
    
    try {
      // Format messages for the API
      const apiMessages = this.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Call the Mosaia API
      const response = await this.mosaiaService.chat(apiMessages);
      
      if (response.success) {
        // Add AI response to history
        this.addMessage('assistant', response.response);
        return response.response;
      } else {
        // Handle error
        const errorMessage = 'Sorry, I encountered an error: ' + (response.error || 'Unknown error');
        this.addMessage('assistant', errorMessage);
        return errorMessage;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = 'Sorry, something went wrong. Please try again later.';
      this.addMessage('assistant', errorMessage);
      return errorMessage;
    }
  }
  
  /**
   * Clear all messages in the chat history
   */
  clearMessages(): void {
    this.messages = [];
    // Add back the initial greeting
    this.addMessage('assistant', 'Hello! I\'m your AI assistant. How can I help you today?');
  }
}

// Create a singleton instance
const chatService = new ChatService();
export default chatService;