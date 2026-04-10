# Quick Start Guide

Get your AI agent running in 5 minutes.

## 1. Install Dependencies
```bash
npm install
```

## 2. Setup Environment
```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=production
```

## 3. Customize Knowledge
Edit `knowledge.txt` with your client's business information.

## 4. Run Server
```bash
npm start
```

## 5. Test It
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"user_message": "What services do you offer?"}'
```

## What's Next?

- Review [README.md](README.md) for full documentation
- Check [EXAMPLES.md](EXAMPLES.md) for API examples
- Customize the system prompt in `src/utils/promptBuilder.js`
- Deploy to Render or Railway

## Deploy to Render (2 minutes)

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your repo
5. Settings:
   - Build: `npm install`
   - Start: `npm start`
6. Add environment variable: `GEMINI_API_KEY`
7. Click "Create Web Service"

Done! Your API will be live at `https://your-service.onrender.com`
