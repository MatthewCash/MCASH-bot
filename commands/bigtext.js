const figlet = require('figlet');

function execute(bot, sender, message, args) {

    if (!args[1]){
        message.channel.send('**ERROR:** Please specify both a channel ID and a message!');
    }else{
        let providedChannel = bot.channels.get(args[0]);
        if (providedChannel) {            

            figlet(args.splice(1).join(' '), (err, ascii) => providedChannel.send('```' + ascii + '```'));
            
        }else message.channel.send('**ERROR:** Channel *' + args[0] + '* not found!');
    }
}

module.exports.execute = execute;
module.exports.responds = ['bigtext', 'ascii'];