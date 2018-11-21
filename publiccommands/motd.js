const Discord = require('discord.js');

let embed = new Discord.RichEmbed();

async function execute(bot, sender, message, args) {

    if (message.channel.type == 'text') return;    

    embed
        .setTitle('Welcome!')
        .setColor(1993413)
        .setFooter('Created by Matthew_Cash#0210')
        .setAuthor('If you are looking for staff/partner on one of my servers, react to this message!', bot.user.avatarURL);
    

    message.channel.send(embed).then(function (ban){
        ban.react('✅');
        
        const filter = (reaction, user) => {
            return ['✅'].includes(reaction.emoji.name);
        };
        
        ban.awaitReactions(filter, { max: 2, time: 8000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.count == 2) {
                    
                    message.channel.send("Ban Confirmed");
                    console.log('f' + message.author.fetchProfile().mutualGuilds());
                    for (var i in message.author.fetchProfile().mutualGuilds().toArray) {

                        console.log(i);
                    }

                }
                
                
                
                
                
            }).catch(() => {
                embed
                    .setTitle('Ok, I will get back to you ASAP!')
                    .setColor(1993413)
                    .setFooter('Created by Matthew_Cash#0210');
                message.channel.send(embed);
            });
    });
        
}

module.exports.execute = execute;
module.exports.responds = ['motd'];