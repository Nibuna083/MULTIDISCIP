import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

/**
 * Load knowledge base from file
 */
async function loadKnowledge(): Promise<string> {
  try {
    // Fetch the knowledge base from the public folder
    const response = await fetch('/knowledge.txt');
    if (!response.ok) {
      console.warn('Knowledge file not found');
      return 'No specific knowledge available.';
    }
    const content = await response.text();
    return content.trim() || 'No specific knowledge available.';
  } catch (error) {
    console.error('Error loading knowledge:', error);
    return 'No specific knowledge available.';
  }
}

/**
 * Build the system prompt with business knowledge
 */
async function buildSystemPrompt(): Promise<string> {
  const businessKnowledge = await loadKnowledge();

  return `You are a friendly and knowledgeable AI assistant for the AI Adoption Index & Strategic Roadmap platform.

CRITICAL RULES:
1. Answer ONLY using the business knowledge below
2. Keep responses SHORT (2-4 sentences max)
3. Use bullet points ONLY when listing 3+ items
4. NO long paragraphs - break into small chunks
5. Be conversational and natural
6. If you don't know something, say so and suggest the user starts the assessment
7. Be helpful and encouraging about AI adoption

RESPONSE STYLE:
✓ Start with a direct answer (1 sentence)
✓ Add 1-2 key details if needed
✓ Use emojis occasionally: ✓ • 📊 💡 🚀 ⭐
✓ End with a friendly closing if appropriate
✓ NO formatting symbols - just plain text

GOOD EXAMPLE:
"Our AI Adoption Index assessment takes about 4-5 minutes. ✓

It evaluates your business across 4 key pillars: Strategy, Technology, Talent, and Data.

Want to get started? Begin your free assessment now!"

BAD EXAMPLE:
**AI Adoption Assessment**
Here are the features:
• Feature 1 with long explanation
• Feature 2 with more details

(Too structured, formatting symbols visible)

===== BUSINESS KNOWLEDGE (USE ONLY THIS) =====
${businessKnowledge}
===== END OF BUSINESS KNOWLEDGE =====

Remember: Short, sweet, helpful. Be encouraging about AI adoption. No formatting symbols. Natural conversation.`;
}

/**
 * Generate a chatbot response using Gemini
 */
export async function generateChatResponse(userMessage: string): Promise<string> {
  console.log('🤖 Chatbot - Starting response generation');
  console.log('📝 User message:', userMessage);
  console.log('🔑 API Key present:', !!API_KEY);

  if (!API_KEY) {
    console.error('❌ Chatbot - API Key is missing');
    return "I'm not configured properly. Please check your Gemini API key in the environment.";
  }

  try {
    console.log('📚 Loading system prompt...');
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
    });

    const systemPrompt = await buildSystemPrompt();
    console.log('✅ System prompt ready');
    
    const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`;
    console.log('📤 Sending to Gemini API...');

    const result = await model.generateContent(fullPrompt);
    console.log('📥 Response received from API');
    
    const response = await result.response;
    const text = response.text();

    if (!text) {
      console.error('❌ Empty response from API');
      throw new Error('Empty response from AI');
    }

    console.log('✅ Response generated successfully');
    return text;
  } catch (error) {
    console.error('❌ Chat error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();
      
      if (errorMsg.includes('api key') || errorMsg.includes('authentication')) {
        console.error('🔐 Authentication error detected');
        return "Authentication error. Please verify your Gemini API key.";
      }
      
      // Check for quota exceeded (429 error)
      if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('exceeded')) {
        console.error('💰 Quota exceeded - Free tier limit reached');
        return "API quota exceeded. The free tier has daily limits. Please upgrade your plan with a credit card at https://aistudio.google.com/app/settings to continue using the chatbot.";
      }
      
      if (errorMsg.includes('rate limit')) {
        console.error('⏱️  Rate limit error detected');
        return "Too many requests. Please wait a moment and try again.";
      }

      if (errorMsg.includes('safety') || errorMsg.includes('moderation')) {
        console.error('🚫 Content moderation issue');
        return "That message triggered safety filters. Please rephrase and try again.";
      }

      if (errorMsg.includes('timeout')) {
        console.error('⏳ Timeout error detected');
        return "The request timed out. Please check your connection and try again.";
      }
      
      console.error('📋 Raw error message:', error.message);
    }
    
    throw new Error('Failed to generate response. Please try again.');
  }
}
