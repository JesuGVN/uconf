const fs   = require('fs'),
      func = global.functions;



var log = function(text){

    let time = func.getDateTime();
    let txt = time + text;

    let fileContent = fs.readFileSync('./logs/logs.txt', 'utf8');
    fs.writeFileSync("./logs/logs.txt", fileContent + '\n' + txt);
    console.log('\x1b[43m\x1b[30m' + time + '\x1b[0m  ' + text);
}

var doneLog = function(text){
    let time = func.getDateTime();
    let txt = time + text;

    let fileContent = fs.readFileSync('./logs/logs.txt', 'utf8');
    fs.writeFileSync("./logs/logs.txt", fileContent + "\n" + txt);
    console.log('\x1b[42m\x1b[37m' + time + '\x1b[0m  \x1b[42m ' + '\x1b[30m' + text + '\x1b[0m');
}

var errorLog = function(text,data){

    let time = func.getDateTime();
    let txt = time + data.from.username+"("+ data.from.id +")"+ " TEXT: " +text;

    let fileContent = fs.readFileSync('./logs/errorLogs.txt', 'utf8');
    fs.writeFileSync("./logs/errorLogs.txt", fileContent + "\n" + txt);
    console.log('\x1b[41m\x1b[37m' + time + '\x1b[0m  \x1b[41m ' + '\x1b[37m' + data.from.username+"("+ data.from.id +")" +" TEXT: "+ text + '\x1b[0m');

}

var regLog = function(data){
    let time = func.getDateTime();
    let txt =  "Пользователь " + data.NAME + "(" + data.TG_ID + ")" + " Зарегистрирован";

    let fileContent = fs.readFileSync('./logs/regLogs.txt', 'utf8');
    fs.writeFileSync('./logs/regLogs.txt', fileContent + "\n"+ txt);

    console.log('\x1b[42m\x1b[37m' + time + '\x1b[0m  \x1b[42m ' + '\x1b[30m' + txt + '\x1b[0m');
}




module.exports.log         = log;
module.exports.doneLog     = doneLog;
module.exports.errorLog    = errorLog;
module.exports.regLog      = regLog;






/*

=====  COLORS  ======
 
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"


*/