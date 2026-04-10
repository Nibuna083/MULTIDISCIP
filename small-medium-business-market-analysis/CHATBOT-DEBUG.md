# Chatbot Troubleshooting Guide

## Error: "Sorry, I encountered an error processing your message. Please try again."

This error means the chatbot encountered an issue. Here's how to debug:

### Step 1: Check Browser Console
1. Open your browser (Chrome, Firefox, etc.)
2. Press **F12** or **Right-click > Inspect**
3. Go to the **Console** tab
4. Try sending a message to the chatbot
5. Look for error messages with 🤖, ❌, or 📋 emoji markers

### Step 2: Common Issues & Fixes

#### Issue 1: API Key Missing or Invalid
**Error in Console**: `🔑 API Key present: false` or `🔐 Authentication error detected`

**Fix**:
```bash
# Check your .env file has the correct key
cat .env
```

The `.env` file should have:
```
VITE_GEMINI_API_KEY="your_actual_key_here"
```

**Solution**:
1. Get a fresh API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Update `.env` with the new key
3. Restart the dev server: `npm run dev`

#### Issue 2: Knowledge File Not Loading
**Error in Console**: `Knowledge file not found` or network error

**Fix**:
1. Verify `public/knowledge.txt` exists:
   ```bash
   ls public/knowledge.txt
   ```
2. If missing, create it again:
   - File must be at: `public/knowledge.txt`
   - Must contain the business knowledge content
   - Must be UTF-8 encoded

#### Issue 3: Rate Limited
**Error in Console**: `⏱️  Rate limit error detected`

**Fix**:
- The Gemini API has limits (~60 requests/minute for free tier)
- Wait a few minutes before trying again
- Consider implementing request throttling

#### Issue 4: Content Moderation Block
**Error in Console**: `🚫 Content moderation issue`

**Fix**:
- The message triggered safety filters
- Rephrase your question without potentially harmful content
- Keep questions relevant to AI adoption

#### Issue 5: Timeout
**Error in Console**: `⏳ Timeout error detected`

**Fix**:
- Check your internet connection
- Try again in a few seconds
- The Gemini API might be slow

### Step 3: Test the API Directly

Create a test file `test-gemini.js`:

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "YOUR_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello!");
    const response = await result.response;
    console.log("✅ API Works:", response.text());
  } catch (error) {
    console.error("❌ API Error:", error);
  }
}

test();
```

Run it:
```bash
node test-gemini.js
```

### Step 4: Verify Knowledge File is Served

Open your browser and navigate to:
```
http://localhost:5173/knowledge.txt
```

If you see the knowledge content, it's being served correctly.
If you get a 404, the file is missing or in the wrong location.

### Step 5: Full Debug Checklist

- [ ] `.env` file exists in project root
- [ ] `VITE_GEMINI_API_KEY` has a valid key
- [ ] `public/knowledge.txt` exists and is not empty
- [ ] Dev server is running (`npm run dev`)
- [ ] No error messages in browser console (F12)
- [ ] Knowledge file loads at `http://localhost:5173/knowledge.txt`
- [ ] Gemini API is working (test with test-gemini.js)
- [ ] API key has not hit rate limits
- [ ] You have internet connection

## Debug Output Reference

Look for these in console:

**Good Signs** ✅:
```
🤖 Chatbot - Starting response generation
📝 User message: your message here
🔑 API Key present: true
📚 Loading system prompt...
✅ System prompt ready
📤 Sending to Gemini API...
📥 Response received from API
✅ Response generated successfully
```

**Problem Signs** ❌:
```
🔑 API Key present: false          → API key missing
❌ Chat error:                      → Something went wrong
🔐 Authentication error detected   → API key invalid
⏱️  Rate limit error detected       → Too many requests
🚫 Content moderation issue        → Message blocked
⏳ Timeout error detected           → API too slow
```

## Advanced Debugging

### Enable Verbose Logging

Edit `src/services/chatbot.ts` and add more console.log() calls in the `loadKnowledge()` function:

```typescript
async function loadKnowledge(): Promise<string> {
  try {
    console.log('📂 Fetching knowledge file...');
    const response = await fetch('/knowledge.txt');
    console.log('📊 Response status:', response.status, response.statusText);
    if (!response.ok) {
      console.warn('⚠️ Knowledge file not found');
      return 'No specific knowledge available.';
    }
    const content = await response.text();
    console.log('📖 Knowledge loaded, chars:', content.length);
    return content.trim() || 'No specific knowledge available.';
  } catch (error) {
    console.error('💥 Error loading knowledge:', error);
    return 'No specific knowledge available.';
  }
}
```

### Monitor Network Requests

1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter by "knowledge" to see knowledge.txt request
4. Look for failed requests (red X)

### Check Environment Variables

In browser console, run:
```javascript
console.log(import.meta.env.VITE_GEMINI_API_KEY)
```

Should show your API key (first 10 chars visible).

## Need More Help?

1. **Check the error in console first** - most specific info is there
2. **Restart the dev server** - fixes many issues
3. **Clear browser cache** - sometimes stale files cause issues
4. **Check `.env` file** - most common issue
5. **Verify API key** - test at [Google AI Studio](https://aistudio.google.com/app/apikey)

---

**Last Updated**: April 9, 2026
**Version**: 1.0
