module.exports = function command_start(bot) {
    bot.start((ctx) => {
        ctx.replyWithPhoto(
            { source: require('path').join(__dirname, '../img/xxx.png') },
            {
                caption:
`Добро пожаловать в <b>Shadow Bot AI</b>! 👋

Это уникальное мини-приложение для Telegram, где ты можешь пообщаться с искусственным интеллектом в разных стилях:
🦾 <b>Грубо</b> — резкие и прямолинейные ответы
💤 <b>Лениво</b> — расслабленный и неторопливый стиль
😏 <b>Сарказм</b> — остроумные и ироничные реплики

Чтобы получить доступ ко всем возможностям и эксклюзивным режимам, обязательно пройди регистрацию в мини-приложении.

<b>Весь сок — только внутри!</b> Попробуй и убедись сам.`,
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: [
                        [{ text: "🚀 Открыть мини-приложение", web_app: { url: 'https://solid-pugs-return.loca.lt'} }],
                        [{ text: "ℹ️ Информация" }, { text: "❓ Помощь" }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            }
        );
    });
};