const minimist = require('./minimist.js');
const toString = function(obj){
    return Object.prototype.toString.call(obj);
};

const Samma = function(command, config){
    if(toString(command) !== '[object String]'){
        throw '命令需要求String类型';
    }
    const arr = command.split(' ');
    const orderStr = arr[0];
    // const args = arr.slice(1);
    const argsObj = minimist(arr);
    const cmdArr = config.cmd;
    const cmdItem = cmdArr.find(function(item){
        return item.name === orderStr;
    });
    if(cmdItem){
        cmdItem.callback(argsObj, orderStr);
    }
    else{
         throw `command not found ${orderStr}`;
    }

};

const commander = function(config){
    if(toString(config) !== '[object Object]'){
        throw 'config要求Object类型';
    }

    if(toString(config.cmd) !== '[object Array]'){
        throw 'cmd属性要求Array类型';
    }

    const execute = config.global || 'Samma';
    const executeFn = function(command){
        Samma(command, config);
    };

    if(typeof window === 'undefined'){
        return executeFn;
    }

    if(window[execute]){
        throw `window下已有${execute}属性，请改变global属性值`;
    }
    else{
        window[execute] = executeFn;
    }
};

module.exports = commander;