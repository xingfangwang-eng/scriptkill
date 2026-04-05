const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 从源代码中提取的 URL
const urls = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap',
  'https://schema.org',
  'https://api.example.com',
  'https://scriptkill.ai',
  'https://scriptkill.ai/solutions',
  'https://scriptkill.ai/logo.png',
  'https://scriptkill.ai/generate-code.png',
  'https://scriptkill.ai/deploy-docker.png'
];

// 测试 URL 状态码
async function testUrls() {
  console.log('Testing URLs...');
  
  for (const url of urls) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      console.log(`✓ ${url} - ${response.status}`);
    } catch (error) {
      console.log(`✗ ${url} - ${error.message}`);
    }
  }
}

testUrls();