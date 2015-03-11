var crypto = require('crypto');

var isObject = function (val) { return Object.prototype.toString.call(val) === '[object Object]'; };

var hash_hmac = function (type, data, key) {
    var hash = crypto.createHmac(type, key);
    hash.update(data);
    return hash.digest('hex');
};

var sign = function (data, apiSec) {
    return hash_hmac('sha256', preSign(data), apiSec);
};

// Сортирует элементы массива в соотвествии с результатом применения колбэка к каждому элементу
var sortBy = function (arr, cb) {
    return arr.sort(function (a, b) {
        var aKey = cb(a);
        var bKey = cb(b);
        if (aKey < bKey) return -1;
        if (aKey > bKey) return 1;
        return 0;
    });
};

// Возвращает пары ключ-значение
var pairs = function (collection) {
    return Object.keys(collection).map(function (key) {
        return [key, collection[key]];
    });
};

// Возвращает пары ключ-значение, отсортированные по ключу
var ksort = function (collection) {
    return sortBy(pairs(collection), function (a) {
        return a[0];
    });
};

// Метод для генерации строки для подписи
var preSign = function (collection) {
    var keyVals = ksort(collection);

    return keyVals.map(function (keyVal) {
        var key = keyVal[0];
        var value = keyVal[1];
        if (isObject(value)) {
            value = preSign(value);
        }
        return key + '=' + value;
    }).join('&');
};

exports.pairs = pairs;
exports.ksort = ksort;
exports.sign = sign;