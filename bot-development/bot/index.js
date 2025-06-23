require('dotenv').config();
const { Telegraf } = require('telegraf');
const path = require('path');


// импортируем модули
const command_start = require('./commands/start');
const coommand_info = require('./commands/info');
const command_help = require('./commands/help');


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);


command_start(bot);
coommand_info(bot);
command_help(bot);


bot.command("menu", (ctx) => {
    ctx.reply('<b>✨ Выберите действие:</b>', {
        parse_mode: "HTML",
        reply_markup: {
            keyboard: [
                [ { text: "ℹ️ Информация", callback_data: 'info' }, { text: "❓ Помощь", callback_data: 'help' } ]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
});






bot.launch(); 
console.log('бот запущен');

process.once('SIGINT', () => {
    console.log('бот останавливается...');
    bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
    console.log('бот останавливается...');
    bot.stop('SIGTERM');
});