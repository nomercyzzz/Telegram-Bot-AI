const { Ollama } = require('ollama');
const path = require('path');
const fs = require('fs');

const MODEL = 'llama3';

function getSystemPrompt(mode = 'default') {
  const promptPath = path.join(__dirname, 'prompts', `${mode}.txt`);
  return fs.readFileSync(promptPath, 'utf-8');
}

// Получить ответ Ollama с учётом режима
async function getAIReply(message, mode = 'default') {
  const systemPrompt = getSystemPrompt(mode);
  const ollama = new Ollama();
  const response = await ollama.chat({
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ]
  });
  return response.message.content;
}

module.exports = { getAIReply, getSystemPrompt };