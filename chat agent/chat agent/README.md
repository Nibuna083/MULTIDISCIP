# AI Agent Backend Template

Production-ready AI chatbot backend for website assistants. Built with Node.js, Express, and Google Gemini. Deploy once per client with custom business knowledge.

## 🚀 Features

- **AI-Powered Chat**: Google Gemini integration with custom system prompts
- **Business Knowledge Injection**: Load client-specific information from local file
- **Lead Capture Logic**: Automatically requests contact info for pricing/service inquiries
- **Security**: Rate limiting, request validation, environment-based configuration
- **Production-Ready**: Designed for Render/Railway deployment
- **Zero Database**: Simple, file-based knowledge management
- **Reusable Template**: Clone and customize for each client

## 📋 Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://ai.google.dev/))
- Git for version control

## 🛠️ Setup Instructions

### 1. Clone this repository
```bash
git clone <your-repo-url>
cd ai-agent-backend-template
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
```

Required environment variables:
```
GEMINI_API_KEY=your_actual_gemini_api_key
PORT=3000
NODE_ENV=production
```

### 4. Customize business knowledge
Edit `knowledge.txt` with your client's business information:
- Company details
- Services offered
- Pricing information
- Contact details
- FAQs

### 5. Run locally
```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-01T12:00:00.000Z",
  "service": "AI Agent Backend"
}
```

### Chat
```
POST /chat
```

**Request Body:**
```json
{
  "user_message": "What services do you offer?",
  "session_id": "optional-session-id"
}
```

**Success Response:**
```json
{
  "success": true,
  "response": "We offer custom web development, mobile app development, e-commerce solutions, and more. Would you like details on any specific service?",
  "session_id": "optional-session-id",
  "timestamp": "2026-02-01T12:00:00.000Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Service Error",
  "message": "Unable to process your request. Please try again later.",
  "timestamp": "2026-02-01T12:00:00.000Z"
}
```

## 📁 Project Structure

```
ai-agent-backend-template/
├── src/
│   ├── server.js                 # Express server setup
│   ├── routes/
│   │   └── chat.js              # Chat endpoint handler
│   ├── services/
│   │   └── gemini.js            # Gemini AI service
│   ├── middleware/
│   │   ├── rateLimiter.js       # Rate limiting protection
│   │   └── validator.js         # Request validation
│   └── utils/
│       ├── knowledgeLoader.js   # Loads business knowledge
│       └── promptBuilder.js     # Builds system prompts
├── knowledge.txt                 # Client business knowledge (EDIT THIS)
├── .env                         # Environment variables (create from .env.example)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🌐 Deployment

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`
5. Deploy!

### Deploy to Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables:
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`
4. Railway will auto-detect the Node.js app and deploy

## 🔒 Security Features

- **Rate Limiting**: 50 requests per 15 minutes per IP (configurable)
- **Request Validation**: Validates all incoming requests
- **No Hardcoded Secrets**: All sensitive data in environment variables
- **Timeout Protection**: 30-second timeout on AI requests
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🎨 Customization for Each Client

For each new client:

1. **Clone the repository**
   ```bash
   git clone <template-repo> client-name-ai-agent
   cd client-name-ai-agent
   ```

2. **Update knowledge.txt**
   - Add client's business information
   - Include services, pricing, contact details
   - Add FAQs specific to their business

3. **Configure environment**
   - Create new `.env` file
   - Add Gemini API key (can reuse same key)
   - Adjust rate limits if needed

4. **Optional: Customize system prompt**
   - Edit `src/utils/promptBuilder.js`
   - Adjust tone, style, or instructions

5. **Deploy**
   - Push to new GitHub repo
   - Deploy to Render/Railway
   - Each client gets their own deployment

## 🧪 Testing

### Test with curl
```bash
# Health check
curl http://localhost:3000/health

# Chat request
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "What services do you offer?"
  }'
```

### Test with Postman
1. Create POST request to `http://localhost:3000/chat`
2. Set Content-Type to `application/json`
3. Body:
```json
{
  "user_message": "What are your prices?",
  "session_id": "test-session"
}
```

## 🐛 Troubleshooting

**Issue**: "GEMINI_API_KEY environment variable is not set"
- **Solution**: Make sure `.env` file exists and contains valid API key

**Issue**: Rate limit errors during testing
- **Solution**: Increase `RATE_LIMIT_MAX_REQUESTS` in `.env` or test from different IPs

**Issue**: AI responses are slow
- **Solution**: Check `AI_TIMEOUT_MS` setting, ensure good internet connection

**Issue**: Knowledge not loading
- **Solution**: Verify `knowledge.txt` exists and has content, check file permissions

## 📚 Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | - | Yes |
| `PORT` | Server port | 3000 | No |
| `NODE_ENV` | Environment mode | development | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | 900000 | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 50 | No |
| `AI_TIMEOUT_MS` | AI request timeout (ms) | 30000 | No |
| `AI_MODEL` | Gemini model name | gemini-1.5-flash | No |

## 📝 Notes

- This template uses `gemini-1.5-flash` for fast, cost-effective responses
- For more complex reasoning, switch to `gemini-1.5-pro` in `.env`
- Knowledge is cached in memory; restart server after updating `knowledge.txt`
- No database required - perfect for simple deployments
- Free tier on Render/Railway is sufficient for moderate traffic

## 🤝 Support

For issues or questions about this template:
1. Check the troubleshooting section
2. Review environment variables
3. Check server logs for detailed error messages

## 📄 License

MIT License - Use freely for commercial projects
