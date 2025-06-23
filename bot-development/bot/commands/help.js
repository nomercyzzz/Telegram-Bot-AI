module.exports = function command_info(bot) {
    bot.hears(["❓ Помощь", "/help"], (ctx) => {
        ctx.reply(
`<b>Помощь по Shadow Bot AI</b>

• Выберите режим общения и начните диалог с ботом.
• Для возврата в главное меню используйте кнопку "⬅️ Главное меню" или команду /menu.
• Чтобы открыть все функции и новые стили общения, зарегистрируйтесь в мини-приложении — там вас ждёт самое интересное!
• Если возникли вопросы или предложения — пишите: @xxxnomercyxxx

Shadow Bot AI всегда рядом, чтобы удивлять тебя!`,
            {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: [
                        [{ text: "⬅️ Главное меню" }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            }
        );
    });
        bot.hears('⬅️ Главное меню', (ctx) => {
        ctx.reply('<b>✅ Вы вернулись в главное меню </b>',{
            parse_mode: "HTML",
            reply_markup: {
                keyboard: [
                    [{ text: "ℹ️ Информация" }, { text: "❓ Помощь" }]
                ],
                resize_keyboard: true, 
                one_time_keyboard: false 
            }
        });
    });
};