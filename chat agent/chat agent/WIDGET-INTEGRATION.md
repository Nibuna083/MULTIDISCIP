# Quick Integration Guide

## For Website Owners

### Step 1: Get Your Widget Code
After deploying to Vercel, add this snippet to your website's HTML (before `</body>`):

```html
<!-- AI Chatbot Widget - Add before </body> -->
<link rel="stylesheet" href="https://YOUR-PROJECT.vercel.app/widget/widget.css">
<div id="chat-widget-button" class="chat-widget-button" aria-label="Open chat">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
  </svg>
</div>
<div id="chat-widget-container" class="chat-widget-container hidden">
  <div class="chat-widget-header">
    <h3>AI Assistant</h3>
    <button id="chat-close-btn" class="close-btn">&times;</button>
  </div>
  <div id="chat-messages" class="chat-messages">
    <div class="message bot-message">
      <div class="message-content">Hi! I'm your AI assistant. How can I help you today?</div>
    </div>
  </div>
  <div class="chat-input-container">
    <input type="text" id="chat-input" placeholder="Type your message..." class="chat-input"/>
    <button id="chat-send-btn" class="send-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="white"/>
      </svg>
    </button>
  </div>
</div>
<script src="https://YOUR-PROJECT.vercel.app/widget/widget.js"></script>
```

### Step 2: Replace Placeholder
Replace `YOUR-PROJECT.vercel.app` with your actual Vercel deployment URL.

### That's It!
The chatbot widget will appear in the bottom-right corner of your website.

## Customization Options

### Change Colors
Edit the gradient in `widget.css`:
```css
background: linear-gradient(135deg, #YOUR-COLOR-1 0%, #YOUR-COLOR-2 100%);
```

### Change Position
Modify in `widget.css`:
```css
.chat-widget-button {
  bottom: 20px;  /* Distance from bottom */
  right: 20px;   /* Distance from right */
}
```

### Change Welcome Message
Edit in the HTML above or in `widget.js`

## Testing
1. Open your website
2. Click the chat bubble in the bottom-right
3. Type a message and press Enter
4. You should receive an AI response

## Need Help?
See the full `VERCEL-DEPLOYMENT.md` guide for detailed instructions.
