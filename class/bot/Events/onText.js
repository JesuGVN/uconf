module.exports.onText = function(){
    global.bot.onText(/\/start (.+)/, (msg, match) => {
        console.log(msg);
        console.log(match);

        // more...
    });
}