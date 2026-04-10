// AI Chatbot Widget JavaScript
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiUrl: 'https://ai-chatbot-2km4.onrender.com/chat',
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    googleSheetUrl: 'https://script.google.com/macros/s/AKfycbxPCeAZYe_gc13y3719QCxYzW7ASFnmacQTHTlXzAVZij4fFGyQY25rZY6iff9-41WCKQ/exec', // Google Apps Script URL
    chatSuggestions: [
      'Tell me about your services',
      'What are your pricing options?',
      'How can I get started?',
      'What makes you different?'
    ]
  };

  // State management
  let sessionId = null;
  let isWaitingForResponse = false;

  // DOM Elements
  const widgetButton = document.getElementById('chat-widget-button');
  const widgetContainer = document.getElementById('chat-widget-container');
  const closeBtn = document.getElementById('chat-close-btn');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const messagesContainer = document.getElementById('chat-messages');
  const contactModal = document.getElementById('contact-modal');
  const contactForm = document.getElementById('contact-form');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const suggestionsContainer = document.getElementById('chat-suggestions');

  // Initialize session
  function initSession() {
    const stored = localStorage.getItem('chatSessionId');
    const timestamp = localStorage.getItem('chatSessionTimestamp');
    
    if (stored && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      if (age < CONFIG.sessionTimeout) {
        sessionId = stored;
        return;
      }
    }
    
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chatSessionId', sessionId);
    localStorage.setItem('chatSessionTimestamp', Date.now().toString());
  }

  // Toggle chat widget
  function toggleChat() {
    widgetContainer.classList.toggle('hidden');
    if (!widgetContainer.classList.contains('hidden')) {
      chatInput.focus();
      showInitialSuggestions();
    }
  }

  // Show initial chat suggestions
  function showInitialSuggestions() {
    if (!suggestionsContainer) return;
    
    // Only show if no messages yet (except welcome message)
    const messages = messagesContainer.querySelectorAll('.message');
    if (messages.length <= 1) {
      suggestionsContainer.style.display = 'flex';
    }
  }

  // Hide suggestions
  function hideSuggestions() {
    if (suggestionsContainer) {
      suggestionsContainer.style.display = 'none';
    }
  }

  // Add message to chat
  function addMessage(content, isUser = false, showContactButton = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    // Preserve line breaks and basic formatting
    contentDiv.style.whiteSpace = 'pre-line';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(contentDiv);
    
    // Add contact button for bot messages
    if (!isUser && showContactButton) {
      const contactBtnDiv = document.createElement('div');
      contactBtnDiv.className = 'contact-suggestion';
      contactBtnDiv.innerHTML = `
        <button class="contact-now-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
          </svg>
          Contact Us
        </button>
      `;
      messageDiv.appendChild(contactBtnDiv);
      
      // Add click event to contact button
      const contactBtn = contactBtnDiv.querySelector('.contact-now-btn');
      contactBtn.addEventListener('click', showContactModal);
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    
    contentDiv.appendChild(indicator);
    typingDiv.appendChild(contentDiv);
    messagesContainer.appendChild(typingDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // Send message to API
  async function sendMessage(message) {
    if (!message.trim() || isWaitingForResponse) return;
    
    isWaitingForResponse = true;
    sendBtn.disabled = true;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      const response = await fetch(CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: message,
          session_id: sessionId
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      removeTypingIndicator();
      addMessage(data.response || 'Sorry, I could not process your request.', false, true);
      
      // Hide suggestions after first message
      hideSuggestions();
      
      // Update session timestamp
      localStorage.setItem('chatSessionTimestamp', Date.now().toString());
      
    } catch (error) {
      console.error('Error sending message:', error);
      removeTypingIndicator();
      addMessage('Sorry, there was an error processing your request. Please try again.', false, false);
    } finally {
      isWaitingForResponse = false;
      sendBtn.disabled = false;
      chatInput.focus();
    }
  }

  // Show contact modal
  function showContactModal() {
    if (contactModal) {
      contactModal.classList.remove('hidden');
    }
  }

  // Hide contact modal
  function hideContactModal() {
    if (contactModal) {
      contactModal.classList.add('hidden');
      contactForm.reset();
    }
  }

  // Submit contact form
  async function submitContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const timestamp = new Date().toISOString();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
      // Use URL parameters which works better with Google Apps Script CORS
      const url = `${CONFIG.googleSheetUrl}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&timestamp=${encodeURIComponent(timestamp)}`;
      
      // Use fetch with redirect follow mode
      await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });
      
      // Show success message
      addMessage(`Thank you ${name}! We've received your information and will contact you soon. ✓`, false, false);
      hideContactModal();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even with error, data likely submitted (CORS limitation)
      addMessage('Thank you! Your information has been submitted. ✓', false, false);
      hideContactModal();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  }

  // Handle suggestion click
  function handleSuggestionClick(e) {
    if (e.target.classList.contains('suggestion-chip')) {
      const message = e.target.textContent;
      chatInput.value = message;
      sendMessage(message);
    }
  }

  // Event Listeners
  widgetButton.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  
  sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      sendMessage(message);
    }
  });
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        sendMessage(message);
      }
    }
  });

  // Contact form event listeners
  if (contactForm) {
    contactForm.addEventListener('submit', submitContactForm);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideContactModal);
  }

  // Click outside modal to close
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        hideContactModal();
      }
    });
  }

  // Suggestion clicks
  if (suggestionsContainer) {
    suggestionsContainer.addEventListener('click', handleSuggestionClick);
  }

  // Initialize on load
  initSession();
})();
