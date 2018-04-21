const Samma = require('../lib/index.js');

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