'use strict';

var minimist = require('./minimist.js');
var toString = function toString(obj) {
    return Object.prototype.toString.call(obj);
};

var Samma = function Samma(command, config) {
    if (toString(command) !== '[object String]') {
        throw '命令需要求String类型';
    }
    var arr = command.split(' ');
    var orderStr = arr[0];
    // const args = arr.slice(1);
    var argsObj = minimist(arr);
    var cmdArr = config.cmd;
    var cmdItem = cmdArr.find(function (item) {
        return item.name === orderStr;
    });
    if (cmdItem) {
        cmdItem.callback(argsObj, orderStr);
    } else {
        throw 'command not found ' + orderStr;
    }
};

var commander = function commander(config) {
    if (toString(config) !== '[object Object]') {
        throw 'config要求Object类型';
    }

    if (toString(config.cmd) !== '[object Array]') {
        throw 'cmd属性要求Array类型';
    }

    var execute = config.global || 'Samma';
    var executeFn = function executeFn(command) {
        Samma(command, config);
    };

    if (typeof window === 'undefined') {
        return executeFn;
    }

    if (window[execute]) {
        throw 'window\u4E0B\u5DF2\u6709' + execute + '\u5C5E\u6027\uFF0C\u8BF7\u6539\u53D8global\u5C5E\u6027\u503C';
    } else {
        window[execute] = executeFn;
    }
};

module.exports = commander;