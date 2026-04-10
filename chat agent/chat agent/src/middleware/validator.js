/**
 * Validates incoming chat requests
 */
const validateChatRequest = (req, res, next) => {
  const { user_message, session_id } = req.body;

  // Validate user_message
  if (!user_message) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'user_message is required'
    });
  }

  if (typeof user_message !== 'string') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'user_message must be a string'
    });
  }

  if (user_message.trim().length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'user_message cannot be empty'
    });
  }

  if (user_message.length > 5000) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'user_message is too long (max 5000 characters)'
    });
  }

  // Validate session_id if provided
  if (session_id !== undefined && typeof session_id !== 'string') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'session_id must be a string'
    });
  }

  next();
};

module.exports = { validateChatRequest };
