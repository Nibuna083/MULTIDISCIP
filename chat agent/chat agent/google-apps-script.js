/**
 * Google Apps Script for Contact Form Submission
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. YOUR GOOGLE SHEET IS READY:
 *    URL: https://docs.google.com/spreadsheets/d/1BE5pGB_u82NBHo9jKwYMGbYQmFu1G-RoTuZLPx6U_Q0/edit?usp=sharing
 *    Make sure Row 1 has headers: Name | Email | Timestamp
 * 
 * 2. OPEN APPS SCRIPT EDITOR:
 *    - In your Google Sheet, go to Extensions > Apps Script
 *    - Delete any existing code
 *    - Copy and paste this entire script
 * 
 * 3. DEPLOY AS WEB APP:
 *    - Click the "Deploy" button (top right)
 *    - Select "New deployment"
 *    - Click the gear icon next to "Select type"
 *    - Choose "Web app"
 *    - Fill in the details:
 *      * Description: "Contact Form API"
 *      * Execute as: "Me"
 *      * Who has access: "Anyone" (Important!)
 *    - Click "Deploy"
 *    - Copy the "Web app URL" that appears
 * 
 * 4. UPDATE YOUR WIDGET:
 *    - Open widget.js
 *    - Update the googleSheetUrl with your new Web app URL
 */

function doGet(e) {
    try {
        // Open the specific sheet by URL
        var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1BE5pGB_u82NBHo9jKwYMGbYQmFu1G-RoTuZLPx6U_Q0/edit").getActiveSheet();
        
        // Check if this is a form submission
        if (e.parameter.name && e.parameter.email) {
            // Create a new row with name, email, and timestamp
            var timestamp = new Date();
            sheet.appendRow([
                e.parameter.name || "N/A",
                e.parameter.email || "N/A",
                timestamp
            ]);
            
            return ContentService.createTextOutput(JSON.stringify({ 
                "status": "success", 
                "message": "Contact information saved successfully" 
            })).setMimeType(ContentService.MimeType.JSON);
        }
        
        // Default response for testing
        return ContentService.createTextOutput(JSON.stringify({ 
            "status": "success", 
            "message": "Contact Form API is running" 
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
        Logger.log('Error: ' + error.toString());
        return ContentService.createTextOutput(JSON.stringify({ 
            "status": "error", 
            "message": error.toString() 
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function doPost(e) {
    try {
        // Open the specific sheet by URL
        var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1BE5pGB_u82NBHo9jKwYMGbYQmFu1G-RoTuZLPx6U_Q0/edit").getActiveSheet();
        
        // Parse the incoming JSON data
        var data = JSON.parse(e.postData.contents);
        
        // Create a new row with name, email, and timestamp
        var timestamp = new Date();
        sheet.appendRow([
            data.name || "N/A",
            data.email || "N/A",
            timestamp
        ]);
        
        return ContentService.createTextOutput(JSON.stringify({ 
            "status": "success", 
            "message": "Contact information saved successfully" 
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
        Logger.log('Error: ' + error.toString());
        return ContentService.createTextOutput(JSON.stringify({ 
            "status": "error", 
            "message": error.toString() 
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Handle preflight CORS requests
function doOptions(e) {
    return ContentService.createTextOutput("")
        .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function to verify the script works
 * Run this from the Apps Script editor to test
 */
function testSubmission() {
    var testData = {
        parameter: {
            name: 'Test User',
            email: 'test@example.com'
        }
    };
    
    var result = doGet(testData);
    Logger.log(result.getContent());
}
