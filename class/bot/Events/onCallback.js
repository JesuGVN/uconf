const USER      =  require('../../user/user');

module.exports.onCallback = function(){
    global.bot.on('callback_query', async function(msg){
        let action = msg.data;
        var bot = global.bot;

        action = action.split('_');


        console.log(msg);
        
        
        if(action[0] == 'accept') {
            await global.connection.query('UPDATE applications SET ? WHERE ID = ?', [{STATUS: 'DONE'}, action[1]], function(err){
                if(err) throw err;
                else{
                    bot.sendMessage(action[2],`
<b>🔥Поздравляем с успешной регистрацией на конференцию!</b>
                    
                    `, {parse_mode: 'html',disable_web_page_preview: true});



                    bot.editMessageCaption('✅<b>Заявка номер ' +action[1]+ ' Успешно Одобрена</b>',
                    {
                      chat_id: msg.message.chat.id, message_id: msg.message.message_id, parse_mode: "html"
                    });
                }
            });
        }else if(action[0] == 'cancel') {

            await global.connection.query('UPDATE applications SET ? WHERE ID = ?', [{STATUS: 'FALSE'}, action[1]], function(err){
                if(err) throw err;
                else{
                    bot.sendMessage(action[2], `<b>😔К Сожалению вы не прошли регистрацию</b>
<i>Возможно в заявке есть ошибки, перепроверьте пожалуйста и следуйте инструкции</i>

<i>Чтобы подать заявку повторно напишите - /restart</i>
<i>По всем вопросам обращайтесь сюда:</i>
@evgenia_shumaeva`,
                    {parse_mode: 'html',disable_web_page_preview: true});

                    bot.editMessageCaption('❌<b>Заявка номер ' +action[1]+ ' Отклонена</b>',
                    {
                      chat_id: msg.message.chat.id, message_id: msg.message.message_id, parse_mode: "html"
                    });
                }
            });
           
        }else if(action[0] == 'CHECKSUB') {
            console.log('идет проверка, id = ' + msg.from.id);


            bot.getChatMember('-1001591371772',msg.from.id).then(async (data) => { 

                console.log(data);

                if(data.status == 'member' || data.status == 'creator' || data.status == 'admin') {
                    console.log('подписан =)')
                    bot.deleteMessage(msg.from.id, msg.message.message_id);
                    bot.sendMessage(msg.from.id, `<b>Ураа🔥</b> Регистрация почти завершенна, сейчас твоя заявка проходит проверку, ожидай🙂
    
<b>Хотим напомнить:</b>
<i>Регистрационный взнос 2000KZT (оплата на месте)</i>

<i>Вы можете добавить в регистрацию питание на дни конференции (обеды + кофебрейки) всего за 3000KZT (тогда общая стоимость участия будет 5000KZT</i>
`,
                        {parse_mode: 'html',disable_web_page_preview: true});
    
    
                    setTimeout(function() {
                        bot.sendMessage(msg.from.id, `
<b>Расписание</b>

<i>Регистрация на конференцию будет отркыта 21-го марта 16:00 </i>

<i>Закончится конференция 23-го марта в 20:00</i>

<i>Детальное распиание будет доступно чуть позже🙌</i>
    
                        `,
                                            {parse_mode: 'html',disable_web_page_preview: true});
    
                        setTimeout( async function(){
                            bot.sendMessage(msg.from.id, `
<b>Соц. сети</b>

Хештег конференции в этом году — #UCONF23
Смотри и делись яркими моментами с конференции.

Подпишись на наши соц.сети, чтобы ничего не упустить.

Telegram: https://t.me/united_conf
Instagram: https://www.instagram.com/united.conf/
    
                    `,
                                        {parse_mode: 'html',disable_web_page_preview: true, reply_markup: {
                                            'keyboard': [['📅Расписание', '❗️Размещение'], ['🌐Соц. сети'], ['🔥Лидерские интенсивы']],
                                            'resize_keyboard': true
                                        }});
    
                            
                        }, 1500)
    
    
                    }, 2000);
    
                
                    await USER.sendApplication(msg);
    
                    // 455913586
    
                    bot.sendMessage('239823355',`
<b>🔥Новая заявка!</b>
    
<i>Скорее пришли мне команду /admin</i>
<i>И я покажу тебе сколько у тебя еще работы!!!</i>`, {parse_mode: 'html'});
    
    
    
                    bot.sendMessage('455913586',`
<b>🔥Новая заявка!</b>
    
<i>Скорее пришли мне команду /admin</i>
<i>И я покажу тебе сколько у тебя еще работы!!!</i>`, {parse_mode: 'html'});

                } else {
                    console.log('не подписан (')
                    bot.sendMessage(msg.from.id, `<b>❌Ошибка:</b> Ты не подписался на канал
                
Подпишись и нажми кнопку снова.
                `,
                                    {parse_mode: 'html',disable_web_page_preview: true});
                }

            })

        }
    });
}