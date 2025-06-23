module.exports = function command_info(bot) {
    bot.hears(["ℹ️ Информация", "/info"], (ctx) => {
        ctx.reply(
`<b>Shadow Bot AI</b> — современное мини-приложение для Telegram, где ты можешь вести диалог с искусственным интеллектом в разных стилях.

<b>Возможности:</b>
• Несколько режимов общения: грубый, ленивый, саркастичный (и другие в разработке)
• Удобное меню для выбора стиля
• Постоянные обновления и расширение функционала
• Эксклюзивные функции доступны после регистрации в мини-приложении

<b>Разработчики:</b> @xxxnomercyxxx, @lambert_mpa
<b>Версия:</b> 1.0.0`,
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