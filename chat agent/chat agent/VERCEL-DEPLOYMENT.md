# 🚀 Vercel Deployment Guide

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- Your GEMINI_API_KEY

## Step 1: Prepare Your Repository

Make sure all files are committed to your Git repository:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure your project:
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `GEMINI_API_KEY` = `your-actual-api-key-here`
   - Add: `NODE_ENV` = `production`

6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? (default or custom name)
# - In which directory is your code located? ./
# - Want to override the settings? No

# Add environment variables
vercel env add GEMINI_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development

# Deploy to production
vercel --prod
```

## Step 3: Get Your Deployment URL

After deployment, Vercel will provide you with a URL like:
```
https://your-project-name.vercel.app
```

## Step 4: Update Widget Configuration

1. Open `widget/widget.js`
2. Update the `apiUrl` in the CONFIG object:
```javascript
const CONFIG = {
  apiUrl: 'https://your-project-name.vercel.app/chat',
  sessionTimeout: 30 * 60 * 1000,
};
```

## Step 5: Integrate Widget into Your Website

### Method 1: Direct Integration (Recommended)

Add this code to your website's HTML, right before the closing `</body>` tag:

```html
<!-- AI Chatbot Widget -->
<link rel="stylesheet" href="https://your-project-name.vercel.app/widget/widget.css">
<div id="chat-widget-button" class="chat-widget-button" aria-label="Open chat">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
  </svg>
</div>
<div id="chat-widget-container" class="chat-widget-container hidden">
  <div class="chat-widget-header">
    <h3>AI Assistant</h3>
    <button id="chat-close-btn" class="close-btn" aria-label="Close chat">&times;</button>
  </div>
  <div id="chat-messages" class="chat-messages">
    <div class="message bot-message">
      <div class="message-content">Hi! I'm your AI assistant. How can I help you today?</div>
    </div>
  </div>
  <div class="chat-input-container">
    <input type="text" id="chat-input" placeholder="Type your message..." class="chat-input"/>
    <button id="chat-send-btn" class="send-btn" aria-label="Send message">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="white"/>
      </svg>
    </button>
  </div>
</div>
<script src="https://your-project-name.vercel.app/widget/widget.js"></script>
```

### Method 2: Self-Hosted Widget Files

1. Copy the `widget` folder files to your website's assets directory
2. Update paths in your HTML:
```html
<link rel="stylesheet" href="/assets/widget.css">
<script src="/assets/widget.js"></script>
```

### Method 3: Using NPM Package (Advanced)

You can also bundle the widget with your existing build process.

## Step 6: Test Your Widget

1. Open your website in a browser
2. Click the chat widget button in the bottom-right corner
3. Send a test message
4. Verify you receive a response from the AI

## Troubleshooting

### Widget Not Appearing
- Check browser console for errors
- Verify CSS and JS files are loading correctly
- Check network tab for 404 errors

### API Errors
- Verify your GEMINI_API_KEY is set in Vercel dashboard
- Check Vercel deployment logs for errors
- Test API endpoint directly: `https://your-project-name.vercel.app/health`

### CORS Issues
- The server already has CORS enabled
- If issues persist, check Vercel logs

## Monitoring and Logs

View your deployment logs:
```bash
vercel logs your-project-name
```

Or view them in the Vercel dashboard under your project's "Deployments" tab.

## Updating Your Deployment

After making changes:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically redeploy your project.

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update widget.js with your custom domain URL

## Production Checklist

- ✅ GEMINI_API_KEY is set in Vercel
- ✅ Widget URL is updated in widget.js
- ✅ Widget is integrated into your website
- ✅ Test messages work correctly
- ✅ Update knowledge.txt with your business information
- ✅ Monitor Vercel logs for errors
- ✅ Set up custom domain (optional)

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Check deployment logs in Vercel dashboard
- Test API endpoint: `https://your-project-name.vercel.app/health`
