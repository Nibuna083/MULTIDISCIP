// Quick test of Gemini API
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  console.log('Testing Gemini API...\n');
  
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment');
    process.exit(1);
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try different model names
    const modelsToTry = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.0-pro'
    ];
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`\nTrying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent('Say hello in one short sentence.');
        const response = result.response;
        const text = response.text();
        
        console.log(`✅ SUCCESS with ${modelName}`);
        console.log('Response:', text);
        console.log(`\n🎉 Use this model: ${modelName}`);
        break;
        
      } catch (err) {
        console.log(`❌ ${modelName} failed:`, err.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:');
    console.error(error);
  }
}

testGemini();
