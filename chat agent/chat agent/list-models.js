// List available Gemini models
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  console.log('Listing available Gemini models...\n');
  
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...${apiKey.slice(-4)}` : 'NOT FOUND');
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment');
    process.exit(1);
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try to list models
    console.log('\nAttempting to list models...\n');
    
    // Try a direct API call
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      if (response.status === 403) {
        console.log('\n⚠️  This API key may not be enabled or valid.');
        console.log('📝 Please check:');
        console.log('   1. Go to https://makersuite.google.com/app/apikey');
        console.log('   2. Verify your API key is correct');
        console.log('   3. Check if the Generative Language API is enabled');
        console.log('   4. You may need to enable it at: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
      }
      
      process.exit(1);
    }
    
    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      console.log('✅ Available models:\n');
      data.models.forEach(model => {
        console.log(`  📦 ${model.name.replace('models/', '')}`);
        if (model.displayName) console.log(`     Display: ${model.displayName}`);
        if (model.description) console.log(`     ${model.description.substring(0, 80)}...`);
        console.log('');
      });
    } else {
      console.log('No models available');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:');
    console.error(error);
  }
}

listModels();
