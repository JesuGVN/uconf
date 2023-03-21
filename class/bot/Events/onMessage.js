const USER      =  require('../../user/user');
const botFunc   =  require('../Functions/functions');

const regStatus = true;

module.exports.onMessage = async function(){
    const logger = require('../../logs/logfunc');
    global.bot.on('message', async (msg) => {
        
        var bot  = global.bot;
        var id   = msg.from.id;
        var text = msg.text;

        console.log(msg);

        var keyboard = ['📅Расписание', '🌐Соц. сети', '🔥Лидерские интенсивы', '❗️Размещение'];

        // bot.sendMessage(msg.from.id, msg.text);
        console.log(0);
        var h_user =  await USER.haveUser(id);
      
        if(regStatus == false && h_user == 0){
            bot.sendMessage(id,`<b>Приветствую тебя!</b>
<i>К сожалению регистрация в Боте уже закрыта</i>`, {parse_mode: 'html'});
            return 1;
        }
       
        logger.log("@" + msg.from.username + ": " + msg.text);

        if (h_user == 1){
            // Если пользователь Зарегистрирован
            var USER_ACTION = await USER.userAction(id);

            if(text == '/restart'){
                let del =  await USER.delUser(msg.from.id);
 
                if(del == true) {
                    var reg = await USER.regUser(msg.from);
                
                    if(reg == 1){
                        bot.sendMessage(id,`<b>Добро пожаловать!</b>`, {parse_mode: 'html'});
 
                        setTimeout(() => {
                         bot.sendMessage(id,`<b>Cмотрю ты решил(a) пройти регистрацию повторно🙂</b>`, {parse_mode: 'html'});
                        }, 1500);
     
                        setTimeout(() => {
                            
                            bot.sendMessage(id,`<i>Как тебя Зовут?</i>
<i>Имя и Фамилия</i>                        
                            `, {parse_mode: 'html'});
                        }, 1500);
     
                          await USER.setAction(id,'GET_YOUR_NAME');
                    }
                }

 
            }else if(text == '/admin') {
                if(id == '239823355' || id == '455913586' || id == '274525728') {

                    await bot.sendMessage(id,"<b>💭Собираю Данные...</b>", {parse_mode: 'html'});                    

                    await getAppList(id);
                }
            }else if(text == '/mailsend'){
                if(id == '239823355' || id == '455913586' || id == '274525728') {

                    // console.log(msg.reply_to_message.entities);

                    // Если есть Фото
                    if(msg.reply_to_message.photo) {
                        mailSender(msg.reply_to_message.caption,'photo', msg.reply_to_message.photo[2].file_id );
                    } else {
                        mailSender(msg.reply_to_message.text, 'text');
                    }
                }
            }else if (USER_ACTION != 'DEFAULT') {
                if(text == undefined) {
                    bot.sendMessage(id,"<b>🚫Не правильный формат</b>", {parse_mode: 'html'});
                }else {

                    if(keyboard.indexOf(text) == -1) {
                        if(USER_ACTION == 'GET_YOUR_NAME'){
                            if(!(typeof text == undefined || typeof text == "undefined")){
                                var setName = await USER.setName(id,text);
                                console.log(setName);
            
                                if(setName == true){
                                    await USER.setAction(id,'GET_YOUR_YEAR_OLD');
            
                                    bot.sendMessage(id, "<b>Очень рады, что ты присоединился к нам!</b>", {parse_mode: 'html'});
            
                                    setTimeout(function() {
                                        bot.sendMessage(id, "Сколько тебе лет?", {parse_mode: 'html'});
                                    }, 1500)
                                }
                            }else{
                                bot.sendMessage(id,"<b>❌Ошибка: Укажите Действующее Имя пользователя</b>", {parse_mode: 'html'});
                            }
                        }else if(USER_ACTION == 'GET_YOUR_YEAR_OLD'){
                            if(!(typeof text == undefined || typeof text == "undefined")){
                             
                                var setYearOld = await USER.setYearOld(id,text);
            
                                if(setYearOld){
                                    await USER.setAction(id,'GET_CITY');  
                                    
                                    bot.sendMessage(id,"<b>C какого ты города?</b>", {parse_mode: 'html'});
                                }
                            
                            }else{
                                bot.sendMessage(id, "<b>❌Не правильный формат</b>", {parse_mode: 'html'});
            
                                setTimeout(function() {
                                    bot.sendMessage(id, "<b>Сколько тебе лет?</b>", {parse_mode: 'html'});
                                }, 1000)
                            }
                        }else if(USER_ACTION == 'GET_CITY') {
                            if(!(typeof text == undefined || typeof text == "undefined")){
                                var setCity = await USER.setUserCity(id,text);
            
                                if(setCity) {
                                    await USER.setAction(id,'GET_CHURCH_NAME');
            
                                    setTimeout(function() {
                                        bot.sendMessage(id, "<b>Из какой ты Церкви?</b>", {parse_mode: 'html'});
                                    }, 1000)
            
                                }
            
                            }else{
                                bot.sendMessage(id,"<b>❌Ошибка: Укажите Действующее Имя пользователя</b>", {parse_mode: 'html'});
                            }
            
                        }else if(USER_ACTION == 'GET_CHURCH_NAME'){
                            if(!(typeof text == undefined || typeof text == "undefined")){
                                var setChurch = await USER.setUserChurch(id,text);
            
                                await USER.setAction(id,'DEFAULT');  
            
                                if(setChurch) {
                                    bot.sendMessage(id,`<b>Остался последний шаг👇</b>
                                    
<i>Подпишись на наш канал и нажми на кнопку "✅Я подписался"</i>
    
<i>Ссылка на Канал: https://t.me/+EB93BkPL2OI0MDhi</i>
                                    `, {parse_mode: 'html', disable_web_page_preview: true, reply_markup:{
                                            inline_keyboard: [
                                                [{text: '✅Я подписался', callback_data: 'CHECKSUB_'+id}],
                                                
                                            ]
                                        }
                                    });
                                }
                            }
            
                        }else if(USER_ACTION == 'GET_PROOF_CHECK') {
                            console.log(typeof msg.photo);
            
                            if(typeof msg.photo != 'undefined') {
            
                                
                                await USER.setAction(id,'DEFAULT'); // '239823355' || id == '391024678'
            
                                bot.sendMessage(id,`<b>Ураа🔥</b> Регистрация почти завершенна, сейчас твоя заявка проходит проверку, ожидай🙂`, {parse_mode: 'html'});
            
            
                            }else {
                                bot.sendMessage(id,"<b>❌Ошибка: Отправьте скриншот оплаты</b>", {parse_mode: 'html'});
                            }
            
                        }
                    } else {
                        bot.sendMessage(id,`<b>🚫Не правильный формат!</b> 
<i>Eсли ты запутался, то отправь мне комманду /restart</i>`, {parse_mode: 'html'});
                    }

                }
            }else if(USER_ACTION == 'DEFAULT') {
                if(text == "📅Расписание") {

                    const txt = `
<b>Расписание на сегодня</b>

<b>16:00 - </b> Открытие регистрации
<b>18:30 - </b> Открытие Конфы

----------------------------

<b>22 марта </b>

<b>9:00 - </b> Молитва
<b>9:45 - </b> Мастер - классы
<b>11:00 - </b> Сессия 1
<b>12:30 - </b> Нетворкинг

<b>12:45 - ОБЕД </b>

<b>13:45 - </b> Сессия 2
<b>15:15 - </b>  Перерыв
<b>15:35 - </b>  Сессия 3

<b>17:05 - ПЕРЕКУС </b> 

<b>18:15 - </b>  Евангелизационный вечер

----------------------------

<b>23 марта</b>

<b>10:30 - </b> Молитва
<b>11:00 - </b> Мастер-классы
<b>12:00 - </b> Сессия 1

<b>13:30 - Обед </b>

<b>14:30 - </b> Сессия 2

<b>17:00 - Перекус </b>

<b>18:00 - </b> Сессия 3
                    `

                    bot.sendPhoto(msg.from.id, 'AgACAgIAAxkBAANsZBmaDVDa4aeKg7xh40b13cfbVLIAArLFMRuSPslI9o8-x3rxKgsBAAMCAANzAAMvBA', {caption: txt, disable_web_page_preview: true, parse_mode: "html"})

                }else if(text == '🌐Соц. сети') {
                    bot.sendMessage(msg.from.id, `
<b>Соц. сети</b>

Хештег конференции в этом году — #UCONF23
Смотри и делись яркими моментами с конференции.

Подпишись на наши соц.сети, чтобы ничего не упустить.

Telegram: https://t.me/united_conf
Instagram: https://www.instagram.com/united.conf/

                `,
                                    {parse_mode: 'html',disable_web_page_preview: true});
                }else if(text == '🔥Лидерские интенсивы') {
                    bot.sendMessage(id,"Если вы хотите принять участие в лидерских интенсивах, заполните анкету:", 
                    { 
                        parse_mode: 'html',
                        reply_markup:{
                            inline_keyboard:[
                                 [{text: '🖋Анкета', url: "https://docs.google.com/forms/d/e/1FAIpQLSfSDxmyXrP815oiOr7lMXvm2eHdbpCAigrQL-pl1VTTbuXM0A/viewform?usp=sf_link"}],
                            ]
                        }
                    });
                }else if(text == '❗️Размещение') {
                    bot.sendMessage(id,`
🇰🇿Наша замечательная страна славится своим гостепреимством, поэтому мы сделаем все возможное, чтобы найти тебе место для ночлега во время конференции🙌

Если ты едешь с командой, то подай заявку на размещение своему пастору / лидеру, чтобы он передал информацию организаторам.

По остальным вопросам, связанным с размещением, пиши <a href="https://wa.me/77077069237?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%F0%9F%91%8B%D1%8F%20%D0%BD%D0%B0%20%D1%81%D1%87%D0%B5%D1%82%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%D0%BE%20%D0%B2%D1%80%D0%B5%D0%BC%D1%8F%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8">Юле Земской</a>
                    `, {parse_mode: 'html', disable_web_page_preview: true});
                } else if (text == '/start') {
                    bot.sendMessage(id,`<b>Ты уже зарегистрирован на конференцию 😁</b>`, {parse_mode: 'html'});
                } else if (text == '/start qr_code') {
                    bot.sendMessage(msg.from.id, `<b>🔥С Возвращением</b>
`,
                    {parse_mode: 'html',disable_web_page_preview: true, reply_markup: {
                        'keyboard': [['📅Расписание', '❗️Размещение'], ['🌐Соц. сети']],
                        'resize_keyboard': true
                    }});
                }
            }
        }else{
            if(text == '/start' || text == '/start reg' || text == '/start qr_code'){
                register(msg);
            }else{
                bot.sendMessage(id,"<b>‼️Вы не зарегистрированны в системе, для регистрации пропишите /start</b>", {parse_mode: 'html'});
            }
        }
    });
}

async function mailSender(text,type, photoID) {
    return new Promise(async function(resolve,reject) {
        var req =  global.connection.query('SELECT * FROM applications WHERE STATUS = ? AND MAIL_SEND = 0', 'DONE', async function(err,res){
            // console.log(err);
            if(err) console.log(err);
            else{
                  if(res.length > 0){
                     for(var i = 0; i <= res.length - 1; i++) {
                        console.log(res[i].TG_ID);
                        await (e => {
                            return new Promise(async function(r,j) {
                                setTimeout(async function(a) {
                                    if(type == 'text') {
                                        await bot.sendMessage(res[i].TG_ID, text)
                                        .then(function(data) {
                                            console.log('success');
                                            r(1);
                                        })
                                        .catch(function(error) {
                                            if (error.response && error.response.statusCode === 403) {
                                                console.log('blocked');
                                            }
                                            r(0);
                                        })

                                        r(1);
                                    } else if(type == 'photo') {
                                        await bot.sendPhoto(res[i].TG_ID, photoID, {caption: text, disable_web_page_preview: true})
                                        .then(function(data) {
                                            console.log('success');
                                            r(1);
                                        })
                                        .catch(function(error) {
                                            if (error.response && error.response.statusCode === 403) {
                                                console.log('blocked');
                                            }
                                            r(0);
                                        })
                                    }

                                    r(0);
                                }, 1200);
                            })
                        })();

                        if(i == res.length - 1) {
                            resolve(1);
                        }

                     }
                  }
              }

          });
    });
}

async function register(msg) {
    return new Promise( async function(resolve, reject) {
        // Зарегистрировать

        console.log(msg);
        var reg = await USER.regUser(msg.from);
        var id = msg.from.id;

        console.log('reg: ' + reg);

        if(regStatus == false){
            bot.sendMessage(id,`<b>Приветствую тебя!</b>
        <i>К сожалению регистрация уже закрыта</i>`, {parse_mode: 'html'});
            return 1;
        }

        if(reg == true){
        
            bot.sendMessage(id,`<b>Приветствую тебя!</b>`, {parse_mode: 'html'});

            setTimeout(() => {
                
                bot.sendMessage(id,`<i>Как тебя Зовут?</i>
<i>Имя и Фамилия</i>                        
                `, {parse_mode: 'html'});
            }, 3000);



            await USER.setAction(id,'GET_YOUR_NAME');
        }
    });
}

async function getAppList(id) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            var req =  global.connection.query('SELECT * FROM applications WHERE STATUS = "NONE" LIMIT 10 ', async function(err,res){
                if(err) throw err;
                else{
                    if(res.length > 0){
                     await bot.sendMessage(id,`<b>Найдено `+ res.length +` </b> Заявок`, {parse_mode: 'html'});
                   

                       for(var i = 0; i <= res.length - 1; i++) {

                            console.log(res[i]);

                            let getUserInfo = await USER.getUserInfo(res[i].TG_ID);

                            console.log(getUserInfo)

                     
                            if(getUserInfo != 0) {
                                let info = res[i];
                                let text = `
<b>🔥Заявка номер: </b> ` + info.ID + `
<b>🔰Имя: </b> <a href="tg://user?id=`+ info.TG_ID +`">` + info.NAME + `</a>
<b>ℹ️Возраст: </b>` + getUserInfo.Y_OLD + `
<b>🇰🇿Город: </b>` + info.CITY + `
<b>⛪Церковь: </b>` + info.CHURCH + `


<b>#️⃣ID в Telegram: </b> ` + info.TG_ID + `
<b>📅Дата Регистрации (МСК): </b> ` + info.REG_DATE + `
                                        `;
            
                                let opt = {
                                    parse_mode: 'html',
                                    disable_web_page_preview: true,
                                    caption: text,
                                    reply_markup:{
                                        inline_keyboard:[
                                        [{text: '✅Подтвердить', callback_data: 'accept_' + info.ID + '_' + info.TG_ID}],
                                        [{text: '❌Отклонить', callback_data: 'cancel_' + info.ID + '_' + info.TG_ID}],
                                        ]
                                    }
                                }
                                const fileId = info.PHOTO_ID;
                                bot.sendPhoto(id,fileId,opt).then(function(data){
                                    console.log('photo sended');
                                });
                            }
                          

                       }

                       resolve(1)
                    }else {
                        bot.sendMessage(id,`<b>Заявок не найдено 🙁</b>`, {parse_mode: 'html'});
                    }
                }
            });
        }, 2500)
    })
}