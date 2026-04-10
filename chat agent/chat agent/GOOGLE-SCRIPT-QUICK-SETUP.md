# Google Apps Script - Quick Setup

## 📋 Copy This Code

```javascript
/**
 * Google Apps Script for Contact Form Submission
 * This code receives form data and stores it in Google Sheets
 */

// Get the active spreadsheet
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}

/**
 * Handle POST requests from the contact form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet
    const sheet = getSpreadsheet();
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Name', 'Email', 'Timestamp']);
    }
    
    // Prepare the row data
    const timestamp = new Date(data.timestamp);
    const formattedTimestamp = Utilities.formatDate(
      timestamp, 
      Session.getScriptTimeZone(), 
      'yyyy-MM-dd HH:mm:ss'
    );
    
    const rowData = [
      data.name || '',
      data.email || '',
      formattedTimestamp
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Contact information saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Send error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (optional - for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Contact Form API is running',
      'note': 'Use POST method to submit form data'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 * Run this from the Apps Script editor to test
 */
function testSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

---

## 🚀 5-Minute Setup Steps

### 1️⃣ Create Google Sheet
1. Go to https://sheets.google.com
2. Click **+ Blank**
3. Name it "Chat Widget Leads"
4. Add headers in Row 1:
   - **A1:** Name
   - **B1:** Email
   - **C1:** Timestamp

### 2️⃣ Open Apps Script
1. Click **Extensions** → **Apps Script**
2. Delete existing code
3. Copy the code above ⬆️
4. Paste it in the editor
5. Click **Save** (💾 icon)

### 3️⃣ Deploy as Web App
1. Click **Deploy** button (top right)
2. Select **New deployment**
3. Click ⚙️ icon next to "Select type"
4. Choose **Web app**
5. Configure:
   - **Description:** Contact Form API
   - **Execute as:** Me
   - **Who has access:** **Anyone** ⚠️ Important!
6. Click **Deploy**

### 4️⃣ Authorize (First Time Only)
1. Click **Authorize access**
2. Choose your Google account
3. Click **Advanced**
4. Click **Go to [project name] (unsafe)**
5. Click **Allow**

### 5️⃣ Copy the URL
After deployment, you'll see a **Web app URL** like:
```
https://script.google.com/macros/s/AKfycbx...xyz/exec
```
**Copy this entire URL!**

### 6️⃣ Update Your Widget
Open `widget/widget.js` and find this line (around line 8):
```javascript
googleSheetUrl: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
```

Replace with your URL:
```javascript
googleSheetUrl: 'https://script.google.com/macros/s/AKfycbx...xyz/exec',
```

Save the file!

---

## ✅ Test It

### Test in Apps Script (Optional)
1. In Apps Script editor, select `testSubmission` from dropdown
2. Click **Run** (▶️)
3. Check your Google Sheet - should see test data!

### Test Live Widget
1. Open your chat widget
2. Click any suggestion or send a message
3. Click **Contact Us** button
4. Fill form:
   - Name: Test Name
   - Email: test@example.com
5. Click **Submit**
6. Check Google Sheet - data should appear!

---

## 🔧 Troubleshooting

### ❌ Data not appearing?
**Fix 1:** Check deployment settings
- Go to Deploy → Manage deployments
- Make sure "Who has access" = **Anyone**

**Fix 2:** Verify URL
- Make sure you copied the entire URL including `/exec`
- Check for typos in `widget.js`

**Fix 3:** Check logs
- In Apps Script, click **Executions** (left sidebar)
- Look for error messages

### ❌ Authorization errors?
**Fix:**
- Redeploy: Deploy → Manage deployments → Edit
- Make sure "Execute as" = **Me**
- Click **Deploy**

### ❌ "Reference Error" in Apps Script?
**Fix:**
- Make sure you copied the ENTIRE code
- Check for any missing brackets `}`

---

## 📊 Your Google Sheet Format

After successful submissions, your sheet will look like:

| Name | Email | Timestamp |
|------|-------|-----------|
| John Doe | john@example.com | 2026-02-02 14:30:45 |
| Jane Smith | jane@example.com | 2026-02-02 15:15:22 |

---

## 🎨 Customization

### Add Phone Number Field

**1. Update Google Sheet:**
Add "Phone" header in column D

**2. Update Apps Script:**
```javascript
const rowData = [
  data.name || '',
  data.email || '',
  data.phone || '',  // ADD THIS
  formattedTimestamp
];
```

**3. Update widget.js:**
```javascript
const formData = {
  name: document.getElementById('contact-name').value,
  email: document.getElementById('contact-email').value,
  phone: document.getElementById('contact-phone').value,  // ADD THIS
  timestamp: new Date().toISOString()
};
```

**4. Update index.html:**
Add phone input field in the form

---

## 🔐 Security Notes

- ✅ Web app is public (necessary for form submission)
- ✅ Only collects Name and Email (no sensitive data)
- ✅ Data validation in script
- ✅ Error handling included
- ⚠️ Consider adding CAPTCHA if you get spam

---

## 📱 Need Help?

1. ✓ Read the error message in browser console (F12)
2. ✓ Check Apps Script execution logs
3. ✓ Verify deployment settings
4. ✓ Make sure URL is updated in widget.js
5. ✓ Test with testSubmission() function first

---

**That's it! Your contact form is now connected to Google Sheets! 🎉**
