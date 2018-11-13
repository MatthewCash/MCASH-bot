function execute(bot, sender, message, args) {
    
    if (args.length <= 0 || message.channel.type !== 'text'){
        return message.channel.send('<@' + message.author.id + '> you hella lit neighba :fire: 8/8 litness alert');
    }

    let tagged = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (tagged) {
        message.channel.send('<@' + tagged.id + '> you hella lit neighba :fire: 8/8 litness alert');        
    }else message.channel.send(':fire: Yeah.. i cant find that user, litness 0/0 D: ');
    
}

module.exports.execute = execute;
module.exports.responds = ['lit'];