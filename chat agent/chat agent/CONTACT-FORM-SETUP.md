# Contact Form & Google Sheets Integration - Setup Guide

## Overview
This guide will help you set up the contact form feature that collects visitor information and stores it in Google Sheets in real-time.

## Features Implemented

### 1. **Structured AI Responses**
- The AI now provides well-formatted, structured responses with:
  - Clear headings and sections
  - Bullet points for key information
  - Emojis for visual appeal
  - Professional formatting

### 2. **Initial Chat Suggestions**
- When users open the chat, they see 4 suggestion buttons:
  - "Tell me about your services"
  - "What are your pricing options?"
  - "How can I get started?"
  - "What makes you different?"
- Users can click these to start a conversation quickly
- Suggestions disappear after the first message

### 3. **Contact Us Button**
- After every AI response, a "Contact Us" button appears
- Users can click to open a contact form modal
- Form collects: Name and Email
- Clean, modern modal design

### 4. **Google Sheets Integration**
- Form submissions are sent directly to Google Sheets
- Data is stored in real-time
- Includes timestamp for each submission

---

## Google Sheets Setup Instructions

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it something like "Chat Widget Leads"
4. In Row 1, add these headers:
   - Column A: **Name**
   - Column B: **Email**
   - Column C: **Timestamp**

### Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** in the menu
2. Select **Apps Script**
3. A new tab will open with the Apps Script editor
4. Delete any existing code in the editor

### Step 3: Add the Script Code

1. Open the file: `google-apps-script.js` (in your project root)
2. Copy ALL the code from that file
3. Paste it into the Apps Script editor
4. Click the **Save** icon (or Ctrl+S / Cmd+S)
5. Name your project (e.g., "Contact Form API")

### Step 4: Deploy as Web App

1. In the Apps Script editor, click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in the deployment settings:
   - **Description**: "Contact Form API"
   - **Execute as**: Select **Me** (your Google account)
   - **Who has access**: Select **Anyone** ⚠️ (This is important!)
6. Click **Deploy**
7. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [project name] (unsafe)**
   - Click **Allow**
8. After authorization, you'll see a **Web app URL**
9. **COPY THIS URL** - you'll need it in the next step!

The URL will look something like:
```
https://script.google.com/macros/s/AKfycbx.../exec
```

### Step 5: Update Your Widget Configuration

1. Open the file: `widget/widget.js`
2. Find this line (around line 7):
   ```javascript
   googleSheetUrl: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'` with your actual Web app URL:
   ```javascript
   googleSheetUrl: 'https://script.google.com/macros/s/AKfycbx.../exec',
   ```
4. Save the file

---

## Testing Your Setup

### Test the Script in Apps Script Editor (Optional)

1. In the Apps Script editor, find the function `testSubmission`
2. Select it from the function dropdown (top toolbar)
3. Click the **Run** button (▶️)
4. Check your Google Sheet - you should see a test entry!

### Test the Live Widget

1. Deploy your chat widget to your server or hosting
2. Open your website with the chat widget
3. Click the chat button to open the widget
4. Try clicking one of the suggestion buttons
5. After the AI responds, you'll see a "Contact Us" button
6. Click "Contact Us"
7. Fill in the form:
   - Name: Your Test Name
   - Email: test@example.com
8. Click **Submit**
9. Check your Google Sheet - the data should appear within seconds!

---

## Troubleshooting

### Data Not Appearing in Google Sheet?

**Check 1: Deployment Settings**
- Make sure "Who has access" is set to **Anyone**
- Try redeploying: Deploy → Manage deployments → Edit → New version

**Check 2: URL Configuration**
- Verify the URL in `widget.js` is correct
- Make sure you copied the entire URL including `/exec` at the end

**Check 3: Apps Script Logs**
- In Apps Script editor, go to **Executions** (left sidebar)
- Check for any error messages

**Check 4: Browser Console**
- Open browser developer tools (F12)
- Check the Console tab for any JavaScript errors

### Form Shows But Doesn't Submit?

**Check: CORS Issues**
- The script uses `mode: 'no-cors'` to avoid CORS errors
- This means you won't see a response, but data should still submit
- Check your Google Sheet to verify

### Authorization Issues?

**Solution:**
1. Go to Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the Edit button (pencil icon)
4. Make sure "Execute as" is set to **Me**
5. Click **Deploy**

---

## Customization Options

### Change Suggestion Messages

Edit `widget/widget.js`, find the `chatSuggestions` array:

```javascript
chatSuggestions: [
  'Your custom message 1',
  'Your custom message 2',
  'Your custom message 3',
  'Your custom message 4'
]
```

### Add More Form Fields

1. **In widget/index.html**, add new form fields:
   ```html
   <div class="form-group">
     <label for="contact-phone">Phone</label>
     <input type="tel" id="contact-phone" name="phone" class="form-input" />
   </div>
   ```

2. **In widget/widget.js**, update the `submitContactForm` function:
   ```javascript
   const formData = {
     name: document.getElementById('contact-name').value,
     email: document.getElementById('contact-email').value,
     phone: document.getElementById('contact-phone').value,  // Add this
     timestamp: new Date().toISOString()
   };
   ```

3. **In google-apps-script.js**, update the `rowData` array:
   ```javascript
   const rowData = [
     data.name || '',
     data.email || '',
     data.phone || '',  // Add this
     formattedTimestamp
   ];
   ```

4. **In your Google Sheet**, add a "Phone" column header

### Customize the Contact Button Text

In `widget/widget.js`, find this line:
```javascript
Contact Us
```

Change it to any text you prefer.

---

## Security Notes

1. **Public Access**: The Web app is set to "Anyone" access because the chat widget needs to submit data without authentication
2. **Data Validation**: The script validates incoming data
3. **No Sensitive Data**: Only collect necessary information (Name, Email)
4. **Rate Limiting**: Consider adding rate limiting if you get spam submissions
5. **Spam Protection**: Consider adding a simple CAPTCHA if needed

---

## Next Steps

- Test thoroughly with different scenarios
- Monitor your Google Sheet for submissions
- Set up email notifications for new submissions (optional)
- Customize the styling to match your brand

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the Apps Script execution logs
3. Check browser console for errors
4. Verify all URLs are correctly configured

---

**Important Files:**
- `widget/widget.js` - Main widget logic
- `widget/widget.css` - Styling
- `widget/index.html` - HTML structure
- `google-apps-script.js` - Google Sheets integration
- `src/utils/promptBuilder.js` - AI prompt configuration
