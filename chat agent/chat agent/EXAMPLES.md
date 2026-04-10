## Example API Requests & Responses

### Example 1: General Question
**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "What services do you offer?"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "We offer several services including:\n\n• Custom Web Development (React, Vue, Node.js)\n• Mobile App Development for iOS & Android\n• E-commerce Solutions (Shopify, WooCommerce, Custom)\n• API Development & Integration\n• Cloud Deployment & DevOps\n• UI/UX Design\n• Ongoing Maintenance & Support\n\nWhich service are you interested in learning more about?",
  "session_id": null,
  "timestamp": "2026-02-01T12:30:00.000Z"
}
```

---

### Example 2: Pricing Inquiry (Lead Capture)
**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "How much does it cost to build a mobile app?",
    "session_id": "user-12345"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "We provide custom quotes based on your specific requirements. Mobile app pricing depends on features, complexity, and timeline. Typically, mobile apps take 12-20 weeks to develop.\n\nTo give you an accurate quote, I'd love to connect you with our team. Could you please share:\n• Your Name\n• Email Address\n• Phone Number\n\nSomeone will get back to you within 24 hours to discuss your project!",
  "session_id": "user-12345",
  "timestamp": "2026-02-01T12:35:00.000Z"
}
```

---

### Example 3: Technical Question
**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Do you work with React Native?"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "Yes! We specialize in React Native for mobile app development. It allows us to build both iOS and Android apps from a single codebase, which is cost-effective and efficient. We've delivered several React Native apps, including a fitness app with 10,000+ downloads.",
  "session_id": null,
  "timestamp": "2026-02-01T12:40:00.000Z"
}
```

---

### Example 4: Out of Scope Question
**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "What is the capital of France?"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "I'm here to help answer questions about TechFlow Solutions and our services. I don't have information about that particular topic. Is there anything about our web development, mobile apps, or other services I can help you with?",
  "session_id": null,
  "timestamp": "2026-02-01T12:45:00.000Z"
}
```

---

### Example 5: Contact Information Provided
**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "My name is John Smith, email is john@example.com, and phone is 555-9876",
    "session_id": "user-12345"
  }'
```

**Response:**
```json
{
  "success": true,
  "response": "Thank you, John! I've noted your contact information:\n• Email: john@example.com\n• Phone: 555-9876\n\nOur team will reach out to you within 24 hours to discuss your project requirements and provide a detailed quote. Looking forward to working with you!",
  "session_id": "user-12345",
  "timestamp": "2026-02-01T12:50:00.000Z"
}
```

---

### Example 6: Error Response (Missing user_message)
**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user-12345"
  }'
```

**Response:**
```json
{
  "error": "Bad Request",
  "message": "user_message is required"
}
```

---

### Example 7: Error Response (Rate Limit)
**Request:**
```bash
# After exceeding rate limit (50 requests in 15 minutes)
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_message": "Hello"
  }'
```

**Response:**
```json
{
  "error": "Too Many Requests",
  "message": "You have exceeded the rate limit. Please try again later."
}
```

---

### Example 8: JavaScript/Fetch Request
```javascript
// Frontend integration example
async function sendMessage(message, sessionId = null) {
  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_message: message,
        session_id: sessionId
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('AI Response:', data.response);
      return data.response;
    } else {
      console.error('Error:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}

// Usage
await sendMessage("What services do you offer?");
await sendMessage("How much does a website cost?", "session-abc-123");
```

---

### Example 9: Python Request
```python
import requests
import json

def send_message(message, session_id=None):
    url = "http://localhost:3000/chat"
    
    payload = {
        "user_message": message,
        "session_id": session_id
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        data = response.json()
        
        if data.get("success"):
            print(f"AI: {data['response']}")
            return data['response']
        else:
            print(f"Error: {data.get('message')}")
            return None
            
    except Exception as e:
        print(f"Request failed: {e}")
        return None

# Usage
send_message("What services do you offer?")
send_message("How much for a mobile app?", "session-xyz-789")
```

---

## Testing Workflow

### Step 1: Start the server
```bash
npm start
```

### Step 2: Test health endpoint
```bash
curl http://localhost:3000/health
```

### Step 3: Test basic chat
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"user_message": "Hello!"}'
```

### Step 4: Test lead capture
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"user_message": "I need a quote for web development"}'
```

### Step 5: Monitor logs
Watch the terminal for:
- ✅ Knowledge loaded confirmation
- 📨 Incoming chat requests
- ✅ Successful responses
- ❌ Any errors
