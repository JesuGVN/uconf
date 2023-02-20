var USER   = require('../../user/user');
var bot    = global.bot;
var menu = {
    "parse_mode": 'html',
    "reply_markup": {
        "resize_keyboard": true,
        "keyboard": [
            [{text: "🔰 Аккаунт"},{text: "💥Новинки"}],
            [{text: "🔸Каталог"},{text: "🛒Корзина"}],
            [{text: "📝Категории"}, {text: "🔝Топ"}],
            [{text: "✏️Стол Заказов", text: "📭Контакты"}]
        ]
    }
}

var getMainMenu = function(id){
    bot.sendMessage(id,"<b>Главное Меню</b>", menu);
}



module.exports.getMainMenu = getMainMenu;