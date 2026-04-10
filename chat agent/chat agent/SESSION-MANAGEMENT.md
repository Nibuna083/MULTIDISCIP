# Session Management Guide

## Current Implementation
The backend is **stateless** - it doesn't create or track session IDs.

### Frontend Responsibility
Your frontend (website widget, mobile app) should:

1. **Generate session ID on first message:**
   ```javascript
   // When user opens chat widget
   const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
   localStorage.setItem('chatSessionId', sessionId);
   ```

2. **Send same session ID for entire conversation:**
   ```javascript
   const sessionId = localStorage.getItem('chatSessionId');
   
   fetch('http://localhost:3000/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       user_message: message,
       session_id: sessionId
     })
   });
   ```

3. **New session for new user:**
   ```javascript
   // When user closes chat or after 30 minutes
   localStorage.removeItem('chatSessionId');
   ```

## Why This Design?

### ✅ Advantages
- **Scalable:** No database needed
- **Simple deployment:** Works on free tier (Render/Railway)
- **Client-controlled:** Frontend manages conversation flow
- **Multiple devices:** Each device has own session

### ❌ If You Want Server-Side Sessions

You would need:
- Database (Redis, PostgreSQL)
- Session storage
- Conversation history tracking
- More complex deployment
- Cost increases

## Auto-Generate Session ID (Optional)

If you want the backend to auto-create session IDs:

1. Replace `src/routes/chat.js` with `src/routes/chat-with-auto-session.js`
2. Restart server

The backend will create a session ID like: `session-1738412345678-a1b2c3d4e5f6g7h8`

## Frontend Example (Auto Session)

```javascript
class ChatWidget {
  constructor() {
    this.sessionId = null;
  }

  async sendMessage(message) {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_message: message,
        session_id: this.sessionId // null on first call
      })
    });

    const data = await response.json();
    
    // Store session ID from backend response
    if (!this.sessionId && data.session_id) {
      this.sessionId = data.session_id;
      console.log('Session started:', this.sessionId);
    }

    return data.response;
  }
}
```

## Storing Lead Capture Data

When users provide contact info, you should:

### Option 1: Log to File (Simple)
Add logging in `src/routes/chat.js`:
```javascript
// After AI response, check if it contains contact info
if (user_message.includes('@') || user_message.match(/\d{3}-\d{3}-\d{4}/)) {
  // Log lead to file
  const fs = require('fs');
  fs.appendFileSync('leads.txt', 
    `${new Date().toISOString()} - Session: ${session_id}\nMessage: ${user_message}\n\n`
  );
}
```

### Option 2: Send to Webhook (Recommended)
```javascript
// When lead detected, send to your CRM/email
const axios = require('axios');
await axios.post('https://your-crm.com/webhook', {
  session_id: session_id,
  message: user_message,
  timestamp: new Date().toISOString()
});
```

### Option 3: Add Database (Production)
- Use PostgreSQL/MongoDB
- Store conversations + leads
- Requires paid hosting

## Deployment Data Management

### Render
1. Files in `knowledge.txt` are read-only after deploy
2. Update: Edit locally → Git push → Auto-redeploys
3. Logs: View in Render dashboard

### Railway
1. Same as Render - file-based knowledge
2. Update: Git push → Auto-redeploys
3. Logs: View in Railway dashboard

### Environment Variables (Secrets)
Never put these in knowledge.txt:
- API keys
- Database passwords
- Webhook URLs

Use environment variables instead:
```javascript
const webhookUrl = process.env.LEAD_WEBHOOK_URL;
```

## Recommendation

**For your use case (one deployment per client):**
- Keep current design (frontend manages sessions)
- Update knowledge.txt via Git
- Add webhook for lead capture
- No database needed
- Stays on free tier
