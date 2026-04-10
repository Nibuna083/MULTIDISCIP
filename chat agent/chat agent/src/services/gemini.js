const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Gemini AI Service
 * Handles communication with Google's Gemini API
 */
class GeminiService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = process.env.AI_MODEL || 'gemini-2.5-flash';
    this.timeout = parseInt(process.env.AI_TIMEOUT_MS) || 30000;
  }

  /**
   * Generate a response from Gemini
   * @param {string} systemPrompt - The system instructions
   * @param {string} userMessage - The user's message
   * @returns {Promise<string>} - The AI's response
   */
  async generateResponse(systemPrompt, userMessage) {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.modelName
      });

      // Combine system prompt with user message
      const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`;

      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('AI request timeout')), this.timeout);
      });

      // Generate content with timeout
      const generatePromise = model.generateContent(fullPrompt);
      
      const result = await Promise.race([generatePromise, timeoutPromise]);
      const response = result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Empty response from AI');
      }

      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Handle specific error types
      if (error.message && error.message.includes('timeout')) {
        throw new Error('The AI service is taking too long to respond. Please try again.');
      }
      
      if (error.message && error.message.includes('API key')) {
        throw new Error('AI service configuration error. Please contact support.');
      }

      // Log full error for debugging
      console.error('Full error details:', JSON.stringify(error, null, 2));
      
      throw new Error('Failed to generate AI response. Please try again later.');
    }
  }

  /**
   * Check if the service is properly configured
   * @returns {boolean}
   */
  isConfigured() {
    return !!process.env.GEMINI_API_KEY;
  }
}

module.exports = new GeminiService();
