
module.exports.init = function(){
// Подключаем Бота Telegram
    const TelegramBot       = require("node-telegram-bot-api"),
          token             = global.config.TELEGRAM.TOKEN;

    const logger            = require('../logs/logfunc');

    global.bot              = new TelegramBot(token, {polling: true, parse_mode: "html"});

    const CallBack          = require('./Events/onCallback'),
          Message           = require('./Events/onMessage'),
          Text              = require('./Events/onText');

    setTimeout(() => {
        Message.onMessage();
        CallBack.onCallback();
        Text.onText();


      // console.log('TELEGRAM БОТ ПОДКЛЮЧЕН УСПЕШНО');
      logger.doneLog('Telegram Бот Запущен Успешно');

    }, 2000);
}
