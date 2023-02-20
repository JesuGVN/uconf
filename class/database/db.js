    global.connection_count = 0;
    const logger = require('../logs/logfunc');
    var error_log_count = 0;
    
    var DB_Connect = function(){
        const mysql     = require('mysql');
        const option    = global.config.DATABASE;
        global.connection_count++

        global.connection = mysql.createConnection(option); // Пересоздание соединения
                                                            // так как прошлое соединение использовать невозможно
        global.connection.connect(function(err) {           // Сервер либо не работает
            if(err) {                                         // либо перезагружается(может занять некоторое время)
                 console.log('\x1b[41m \x1b[30mОшибка при подключении к Базе Данных: \x1b[0m',err);
                setTimeout(DB_Connect, 2000);       // Мы делаем небольшую задержку перед попыткой переподключения
            }  
           
            if(error_log_count > 0) {
                logger.doneLog('Переподключение к Базе прошло успешно');
            }
        });                                   // Асинхронные запросы
        global.connection.on('error', function(err) {
             console.log('\x1b[41m \x1b[37mОшибка Базы Данных: \x1b[33m ПРЕВЫШЕННО ВРЕМЯ ПРОСТОЯ\x1b[0m');
             logger.doneLog('Переподключение к Базе...');
             DB_Connect();  
             error_log_count++;
        });

        global.connection.on('connect', function(){
            // console.log('Подключение к Базе Данных прошло успешно');
            if(global.connection_count == 1){
              logger.doneLog('Подключение к Базе Данных Прошло Успешно');
            }
        });
    }

    var CHECK_CONNECT = function(){
        var connect = global.connection;

        if(connect.state == 'disconnected'){
            return false;
        }else{
            return true;
        }
    }




// Экспортируем Модули

module.exports.DB_Connect    = DB_Connect;
module.exports.CHECK_CONNECT = CHECK_CONNECT;