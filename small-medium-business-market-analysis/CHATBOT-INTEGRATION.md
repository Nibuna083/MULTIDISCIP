# Chatbot Integration Guide

## Overview

The chatbot has been successfully integrated into the SMB AI Index & Strategic Roadmap tool. The chatbot provides real-time assistance to users based on the knowledge base specific to the AI adoption assessment platform.

## What Was Added

### 1. **New Knowledge Base** 
- **File**: `/public/knowledge.txt`
- **Purpose**: Contains all information about the AI Adoption Index tool, features, benefits, and common questions
- **Customizable**: Update this file to change chatbot responses

### 2. **Chatbot Service**
- **File**: `/src/services/chatbot.ts`
- **Functions**:
  - `generateChatResponse()`: Generates AI responses using Google Gemini API
  - `buildSystemPrompt()`: Creates context-aware prompts
  - `loadKnowledge()`: Loads the knowledge base dynamically

### 3. **Chat Widget Component**
- **File**: `/src/components/ChatWidget.tsx`
- **Features**:
  - Floating chat button in the bottom-right corner
  - Collapsible chat window
  - Real-time message display
  - Loading indicators
  - Error handling
  - Responsive design

### 4. **Layout Integration**
- **Updated**: `/src/components/Layout.tsx`
- **Added**: ChatWidget component to appear on all pages

## How to Use

### For End Users
1. Look for the floating chat button in the bottom-right corner of any page
2. Click to open the chat window
3. Type your question and press Enter or click the send button
4. The AI assistant will respond based on the knowledge base
5. Click the X button to close the chat

### For Developers

#### Customize the Knowledge Base
Edit `/public/knowledge.txt` to change what the chatbot knows. The file uses a simple text format that's easy to maintain.

Example update:
```txt
NEW FEATURE NAME:
- Description
- Benefits
- How to use
```

#### Update System Prompt
To change how the chatbot responds, edit the `buildSystemPrompt()` function in `/src/services/chatbot.ts`.

#### Modify Chat Widget Styling
The ChatWidget uses Tailwind CSS. Modify `/src/components/ChatWidget.tsx` to change:
- Colors (uses `consultancy-blue` and `consultancy-accent`)
- Size and position
- Message styling
- Animation effects

#### API Configuration
The chatbot uses your existing Gemini API key from `.env`:
```
VITE_GEMINI_API_KEY=your_key_here
```

No additional setup needed - it uses the same API key as the market analysis feature.

## Architecture

### Flow Diagram
```
User Input (Chat Widget)
            ↓
generateChatResponse() (chatbot.ts)
            ↓
Load Knowledge Base (knowledge.txt)
            ↓
Build System Prompt
            ↓
Send to Google Gemini API
            ↓
Return Response to User
```

### Key Files
```
src/
├── components/
│   ├── ChatWidget.tsx          (UI Component)
│   └── Layout.tsx              (Integration point)
├── services/
│   └── chatbot.ts              (AI Service)
public/
└── knowledge.txt               (Knowledge Base)
```

## Features

✅ **Intelligent Responses**: Uses Google Gemini API for natural conversations
✅ **Context-Aware**: Pulls from the knowledge base automatically
✅ **Fast Loading**: Knowledge base is loaded dynamically
✅ **Error Handling**: Gracefully handles API errors
✅ **Responsive Design**: Works on desktop and mobile
✅ **Dark Mode Support**: Adapts to light/dark theme
✅ **Typing Indicators**: Shows when the bot is thinking

## Troubleshooting

### Chatbot Not Responding
1. Check if `.env` has `VITE_GEMINI_API_KEY` set
2. Verify the API key is valid in Google Cloud Console
3. Check browser console for error messages
4. Ensure `/public/knowledge.txt` exists

### Knowledge Base Not Loading
1. Verify `/public/knowledge.txt` exists and is readable
2. Check for encoding issues (should be UTF-8)
3. Look for network errors in browser console
4. Ensure the file path is correct in `chatbot.ts`

### Styling Issues
1. Verify Tailwind CSS is properly configured
2. Check for conflicting CSS classes
3. Ensure color variables are defined in `tailwind.config.js`
4. Clear build cache and rebuild

## Maintenance

### Weekly Tasks
- Monitor error logs for issues
- Review user questions to identify knowledge gaps
- Update knowledge base with new information

### Monthly Tasks
- Review and update feature information
- Check Gemini API usage and costs
- Update common questions based on user feedback

### As Needed
- Update system prompt for better responses
- Add new features to knowledge base
- Gather user feedback for improvements

## Advanced Customization

### Add Custom Commands
You can modify the `generateChatResponse()` function to detect specific keywords and return custom responses.

### Connect to Database
Extend the chatbot to:
- Save conversation history
- Track user interactions
- Provide personalized responses based on previous assessments
- Store feedback for improvements

### Multi-Language Support
The chatbot can be extended to:
- Detect user language
- Load language-specific knowledge base
- Translate responses

### Analytics Integration
Add tracking to:
- Monitor chat volume
- Track response quality
- Measure user satisfaction
- Identify popular topics

## Security Considerations

✓ API key is stored in environment variables
✓ Knowledge base is a public text file (no sensitive data)
✓ Responses are generated on-the-fly (no caching of sensitive data)
✓ CORS is configured for the API calls

## Cost Implications

The chatbot uses Google Gemini API, which has:
- **Free Tier**: 60 requests per minute
- **Pricing**: Based on input/output tokens
- **Estimate**: ~$0.001-0.01 per conversation

Monitor API usage in your Google Cloud Console.

## Support

For issues or questions about integration:
1. Check this guide first
2. Review error messages in the browser console
3. Check the knowledge base for relevant information
4. Contact development team for technical support

## Next Steps

1. **Test the chatbot** by asking sample questions
2. **Update the knowledge base** with domain-specific information
3. **Monitor performance** and gather user feedback
4. **Iterate and improve** based on user interactions
5. **Plan enhancements** like conversation history or personalization

---

**Integration Date**: April 2026
**Status**: ✅ Active and Ready
**Last Updated**: April 9, 2026
