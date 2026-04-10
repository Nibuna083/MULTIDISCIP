const express = require('express');
const router = express.Router();
const geminiService = require('../services/gemini');
const promptBuilder = require('../utils/promptBuilder');
const { validateChatRequest } = require('../middleware/validator');
const crypto = require('crypto');

/**
 * Generate a unique session ID
 */
function generateSessionId() {
  return `session-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
}

/**
 * POST /chat
 * Main chat endpoint for AI agent
 */
router.post('/', validateChatRequest, async (req, res) => {
  try {
    let { user_message, session_id } = req.body;

    // Generate session_id if not provided
    if (!session_id) {
      session_id = generateSessionId();
      console.log(`🆕 New session created: ${session_id}`);
    }

    // Log incoming request (optional, remove in production if sensitive)
    console.log(`📨 Chat request [Session: ${session_id}]: ${user_message.substring(0, 50)}...`);

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
      session_id: session_id, // Always returns a session_id now
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
