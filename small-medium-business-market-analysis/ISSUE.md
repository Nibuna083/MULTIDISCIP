# Issue: Gemini API Free Tier Quota Exceeded (Error 429)

## Problem
The chatbot is showing the error: **"API quota exceeded. The free tier has daily limits."**

### What Happened?
- Your API key is on the **free tier** of the Google Gemini API
- The free tier has **strict daily limits** on API requests
- You've hit the daily quota limit, so the API is rejecting new requests
- This causes a **429 (Too Many Requests)** error

### Free Tier Limits
The Gemini API free tier allows:
- **15 requests per minute** (per model)
- **1,000 requests per day** (per model)
- **32,000 input tokens per day** (total across all requests)

Once you exceed these limits, the API blocks requests until the quota resets at midnight UTC.

---

## Solution

### Option 1: Upgrade to Paid Plan (Recommended)
Add a **credit card** to your Google Cloud project for billing. This removes quota limits.

**Steps:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/settings)
2. Click **"Billing"** or navigate to Google Cloud Console
3. Add a credit card for payment
4. Select a **paid plan** (you still get a free credit monthly)
5. Restart your app - the chatbot should work immediately

**Cost:** Pay-as-you-go (usually $0.075 per 1M input tokens)

---

### Option 2: Wait for Quota Reset
The daily quota resets automatically at **midnight UTC**.

**Steps:**
1. Wait until the next day
2. The chatbot should work again automatically
3. Be careful not to exceed limits again

---

### Option 3: Implement Rate Limiting (Development Only)
Add a daily request counter to prevent quota exhaustion.

**How to do it:**
Edit `src/services/chatbot.ts` and add:
```typescript
let requestCount = 0;

export async function generateChatResponse(userMessage: string): Promise<string> {
  if (requestCount >= 950) { // Leave 50 requests as buffer
    return "Daily API quota limit reached. Please wait until tomorrow or upgrade your plan.";
  }
  requestCount++;
  // ... rest of function
}
```

---

## Prevention Tips

1. **Monitor Usage**
   - Check requests in [Google Cloud Console](https://console.cloud.google.com/)
   - Keep track of daily usage

2. **Implement Rate Limiting**
   - Limit requests per user per day
   - Add request queuing for high traffic

3. **Use Caching**
   - Cache common responses to reduce API calls
   - Don't re-query for identical messages

4. **Upgrade Early**
   - If building a production app, upgrade to paid plan immediately
   - Free tier is only for testing

---

## Current Status

Your app now shows a **helpful error message** when quota is exceeded:
> "API quota exceeded. The free tier has daily limits. Please upgrade your plan with a credit card at https://aistudio.google.com/app/settings to continue using the chatbot."

**Next Steps:**
1. ✅ Add a credit card to your Google Cloud project
2. ✅ Reload the app
3. ✅ Chatbot should work immediately

---

## Need Help?
- [Gemini API Rate Limits Docs](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Google Cloud Billing Setup](https://cloud.google.com/billing/docs/how-to/manage-billing-account)
- [API Keys Management](https://aistudio.google.com/app/apikey)
