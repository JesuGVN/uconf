
module.exports._Init = function(){
    global.functions        = require('../class/functions');
    global.config           = require("../config/config.json"); // Конфигурация
    global.DataBase         = require('../class/database/db');  // Модули Базы Данных


        // Подключаем Базу Данных
    const DataBase          = global.DataBase;
          DataBase.DB_Connect();

        // Подключаем Бота
    var _InitBot = require('../class/bot/_botInit');
        _InitBot.init();
}
