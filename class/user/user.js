const waitSync  = require('wait-sync');
const func      = require('../functions');

var haveUser = function(id){

    return new Promise(function(resolve, reject) {
        var status = 0;
        
        var req =  global.connection.query('SELECT 1 FROM users WHERE TG_ID = ?', id, async function(err,res){
           // console.log(err);
             if(err) console.log(err);
             else{
                 if(res.length > 0){
                    status = 1;
                 }
             }

             resolve(status);
         });
    });
}

var regUser = function(data){

    return new Promise(function(resolve, reject) {
        var USER = {
            TG_ID: data.id,
            USER_NAME: data.username || 'NONE',
            NAME: 'NULL',
            USER_ACTION: 'GET_YOUR_NAME',
            REG_DATE: func.getDateTime(),
            CITY: 'nan'
        }
        var status = 0;

        console.log(USER);
    
        if(USER){
     
            var req = global.connection.query('INSERT INTO users SET ?', USER, function(err){
                if(err) console.log(err);
                else{
                    status = 1;
                    console.log('true true')
                }

                resolve(status);
            });
        }
    })

}

var delUser = function(id) {

    return new Promise(function(resolve, reject){
        global.connection.query('DELETE FROM users WHERE TG_ID = ?', id, function(err) {
            if(err) resolve(false);
            else{
                global.connection.query('DELETE FROM applications WHERE TG_ID = ?', id, function(err) {
                    if(err) resolve(false);
                    else {
                        resolve(true)
                    }
                })
            }
        })
    })
}


var getUserInfo = function(id) {

    return new Promise(function(resolve, reject){
        global.connection.query('SELECT * FROM users WHERE TG_ID = ?',id,function(err,res){
            if(err) resolve(0);
            else{
                if(res.length > 0){
                   resolve(res[0]);
                }else {
                    resolve(0)
                }
            }
        });
    })
}

var userAction = function(id){

    return new Promise(function(resolve, reject) {
        var action = null;
        var req = global.connection.query('SELECT * FROM users WHERE TG_ID = ?', id, function(err,res){
            if(err) throw err;
            else{
                if(res.length > 0){
                    action = res[0].USER_ACTION;
                }

                resolve(action);
            }
        });

    })
}

var setAction = function(id,action){
    return new Promise(function(resolve, reject) {
        var callback;
        var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{USER_ACTION: action}, id], function(err,field){
            if(err) throw err;
            else{
                callback = 1;
            }

            resolve(callback)
        });
    })

}

var setName = function(id,name){

    return new Promise(function(resolve, reject) {
        var callbaack;
        var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{NAME: name}, id], function(err){
            if(err) throw err;
            else{
                callbaack = true;
            }

            resolve(callbaack);
        });

    })
}

var setUserCity = function(id,city){

    return new Promise(function(resolve, reject) {
        var callbaack;
        var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{CITY: city}, id], function(err){
            if(err) throw err;
            else{
                callbaack = true;
            }

            resolve(callbaack);
        });
    })
}

var setUserChurch = function(id,church){

    return new Promise(function(resolve, reject) {
        var callbaack;
        var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{CHURCH: church}, id], function(err){
            if(err) throw err;
            else{
                callbaack = true;
            }

            resolve(callbaack);
        });
    })
}

var setYearOld = function(id,year){

    return new Promise(function(resolve, reject) {
        var callbaack;
        var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{Y_OLD: year}, id], function(err){
            if(err) throw err;
            else{
                callbaack = true;
            }

            resolve(callbaack);
        });

    })

}

var setContact = function(data){

    return new Promise(function(resolve, reject) {
        var callback;
        var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{TEL_NUMBER: data.phone_number},data.user_id], function(err){
            if(err) throw err;
            else{
                callback = true;
            }

            resolve(callback);
        });
    
    })

}


var getInfo = function(id){

    return new Promise(function(resolve, reject) {
        var callback;
        var req = global.connection.query('SELECT * FROM users WHERE TG_ID = ?',id,function(err,res){
            if(err) throw err;
            else{
                if(res.length > 0){
                    callback = res[0];
                }
            }

            resolve(callback);
        });

    })

}

var sendApplication = function(msg) {
    const userID = msg.from.id;

    var req = global.connection.query('SELECT * FROM users WHERE TG_ID = ?',userID, async function(err,res){
        if(err) throw err;
        else {
            if(res.length > 0) {

                const USER = {
                    TG_ID: userID,
                    NAME: res[0].NAME,
                    Y_OLD: res[0].Y_OLD,
                    CITY: res[0].CITY,
                    CHURCH: res[0].CHURCH,
                    PHOTO_ID: 'AgACAgIAAxkBAAOZY_MZAmz4xJGT6UgN0eeibpxZcfAAArPFMRuc45hL398zo1d0FgQBAAMCAAN5AAMuBA',
                    PHOTO_UNIQUE_ID: 'AQADs8UxG5zjmEt-',
                    REG_DATE: func.getDateTime(),
                    STATUS: 'DONE'
                }

                var user = await global.connection.query('INSERT INTO applications SET ?', USER,function(err,res){
                    if(err) throw err;
                });
            }
        }
    })

}



module.exports.haveUser        = haveUser;
module.exports.regUser         = regUser;
module.exports.userAction      = userAction;
module.exports.setAction       = setAction;
module.exports.setUserCity     = setUserCity;
module.exports.setUserChurch   = setUserChurch;
module.exports.setName         = setName;
module.exports.setContact      = setContact;
module.exports.setYearOld      = setYearOld;
module.exports.getInfo         = getInfo;
module.exports.sendApplication = sendApplication;
module.exports.getUserInfo     = getUserInfo;
module.exports.delUser         = delUser;