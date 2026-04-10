const express = require('express');
const router = express.Router();
const geminiService = require('../services/gemini');
const promptBuilder = require('../utils/promptBuilder');
const { validateChatRequest } = require('../middleware/validator');

/**
 * POST /chat
 * Main chat endpoint for AI agent
 */
router.post('/', validateChatRequest, async (req, res) => {
  try {
    const { user_message, session_id } = req.body;

    // Log incoming request (optional, remove in production if sensitive)
    console.log(`📨 Chat request [Session: ${session_id || 'none'}]: ${user_message.substring(0, 50)}...`);

    // Build system prompt with business knowledge
    const systemPrompt = session_id 
      ? promptBuilder.buildSessionPrompt(session_id)
      : promptBuilder.buildSystemPrompt();

    console.log(`🔧 System prompt length: ${systemPrompt.length} characters`);

    // Get AI response
    const aiResponse = await geminiService.generateResponse(systemPrompt, user_message);

    console.log(`🤖 AI response received: ${aiResponse.substring(0, 100)}...`);

    // Return successful response
    res.json({
      success: true,
      response: aiResponse,
      session_id: session_id || null,
      timestamp: new Date().toISOString()
    });

    console.log(`✅ Response sent successfully`);

  } catch (error) {
    console.error('❌ Chat endpoint error:', error);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));

    // Return user-friendly error
    res.status(500).json({
      success: false,
      error: 'Service Error',
      message: error.message || 'Unable to process your request. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
