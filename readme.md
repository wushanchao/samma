# samma
`samma`是一个命令行语法解析配置库。  
目标是方便用户在Chrome控制台使用命令行语法进行页面交互。  
也可用于Node环境。  

### 命令行语法
`cmd x`  
解析成  
```
{
    _:["cmd","x"]
}
```

`cmd -x`
解析成 
```
{
    _:["cmd"],
    x:true
}
```

`cmd -x hello`  
解析成  
```
{
    _:["cmd"],
    x:"hello"
}
```


`cmd --x=hello`
解析成  
```
{
    _:["cmd"],
    x:"hello"
}
```

`cmd -x --y`
解析成
```
{
    _:["cmd"],
    x:true,
    y:true
}
```

### 使用方法
浏览器环境下：  
在页面JS中注入代码：  
```javascript
const Samma = require('samma');

Samma({
    global:'samma',
    cmd:[
        {
            name:'Hello',
            callback: function(args, command){
                console.log(command + ' ' + args['name']);
            }
        }
    ]
});
```

在Chrome的开发者工具中打开Console执行
```
samma('Hello -name world');
```


Node环境下：  
```javascript
const Samma = require('samma');

const samma = Samma({
    cmd:[
        {
            name:'Hello',
            callback: function(args, command){
                console.log(command + ' ' + args['name']);
            }
        }
    ]
});


samma('Hello -name world');
```

### 备注
基于`minimist`二次开发。  
个人对`minimist`进行了小部分魔改。   
修复其bug  
```
-x3=4解析不出来  
-x3解析成{x:3}  
```