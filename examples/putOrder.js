var io = require('socket.io-client');
var tncrypto = require('./tn-crypto');

var pubKey = '*** PUBLIC KEY ***';
var secKey = '*** SECRET KEY ***';

var ws = io('https://wsbeta.tradernet.ru', {
    transports: ['websocket']
});

ws.on('connect', function () {
    console.log('WS connect');
    auth(ws, pubKey, secKey, function (err, auth) {
        if (err) return console.error('Ошибка авторизации', err);
        console.log('login:', auth.login);
        console.log('mode:', auth.mode);
        if (auth.trade)
            console.log('Приказы подавать можно');
        else
            console.log('Приказы подавать нельзя');

        var order = {
            "instr_name":"VTBR",
            "action_id":1,
            "order_type_id":2,
            "limit_price":0.123,
            "stop_price":0,
            "qty":10000,
            "stop_loss":"",
            "take_profit":"",
            "expiration_id":3
        };

        ws.emit('putOrder', order, function (err, res) {
            console.log('putOrder result', err, res);
        });
    });
});

function auth(ws, pubKey, secKey, cb) {
    var data = {
        apiKey: pubKey,
        cmd: 'getAuthInfo',
        nonce: Date.now()
    };
    var sig = tncrypto.sign(data, secKey);
    ws.emit('auth', data, sig, cb);
}