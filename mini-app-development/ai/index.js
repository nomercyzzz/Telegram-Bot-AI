const { Ollama } = require('ollama');
const readline = require('readline');
const fs = require('fs');

const MODEL = 'gemma3';
let Mode = 'default'

const ollama = new Ollama();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`Чат с Shadow Bot ${MODEL}`);
console.log('Доступные команды: "злой", "ленивый", "фембой", "обычный", "exit"');

function chat() {
  rl.question('Вы: ', handleMessage);
}

async function handleMessage(input) {
  const prompt = fs.readFileSync(`./ai/prompts/${Mode}.txt`, 'utf-8');

  if (input === 'exit') return rl.close();

  if (input.startsWith('!')) {
    const command = input.slice(1).toLowerCase();
    
    if (command === 'злой') {
      Mode = 'zloy';
      console.log('Бот: Теперь я грубый!');
      return chat();
    }
    if (command === 'ленивый') {
      Mode = 'lenb';
      console.log('Бот: Теперь я ленивый...');
      return chat();
    }
    if (command === 'фембой') {
      Mode = 'femboy';
      console.log('Бот: Теперь я фембой!');
      return chat();
    }
    if (command === 'обычный') {
      Mode = 'default';
      console.log('Бот: Теперь я вежливый');
      return chat();
    }
  }
  const response = await ollama.chat({
    model: MODEL,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: input }
    ]
  });
  console.log('ИИ:', response.message.content);
  chat();
}

chat();

rl.on('close', () => {
  console.log('До свидания!');
});