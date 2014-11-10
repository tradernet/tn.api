var socket = require('socket.io-client')('https://wsbeta.tradernet.ru');

socket.on('error', function (err) {
    console.log('err', err);
});

socket.on('connect', function() {
    console.log('connect');
    //socket.on('event', function (data) {});
    //socket.on('disconnect', function () {});
});

socket.on('q', function (q) {
    console.log(q);
});

socket.emit('notifyQuotes', ['SBER', 'LKOH']);


//
//
//websocket = new WebSocket(wsUri);
//websocket.onmessage = function(evt) {
//    switch (evt.type) {
//        case 'q':
//            console.log(JSON.parse(evt.data));
//    }
//};
//websocket.onopen = function(evt) {
//    websocket.send(JSON.stringify({type:'notifyQuotes', data: ['SBER', 'LKOH']}));
//};