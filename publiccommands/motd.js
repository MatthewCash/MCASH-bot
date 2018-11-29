const Discord = require('discord.js');

let embed = new Discord.RichEmbed();

async function execute(bot, sender, message, args) {

    if (message.channel.type == 'text') return;    

    embed = new Discord.RichEmbed();
    embed
        .setTitle('')
        .setColor(1993413)
        .setFooter('Automated Message by Matthew_Cash#0210')
        .setAuthor('If you are looking for staff/partner on one of my servers, react to this message!', bot.user.avatarURL);
    message.channel.send(embed).then((msg) => {
        msg.react('✅');
       
        const reactionFilter = reaction => reaction.emoji.name === '✅';
        const messageFilter = () => true;
        
        msg.awaitReactions(reactionFilter, { max: 2, time: 5000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.count == 2) {          
                    embed = new Discord.RichEmbed();
                    embed
                        .setAuthor('Great! I should be able to help,', bot.user.avatarURL)
                        .setTitle('Please enter the name of the specific server:')
                        .setColor(1993413)
                        .setFooter('Created by Matthew_Cash#0210');
                    message.channel.send(embed);
                    message.channel.awaitMessages(messageFilter, { max: 2, time: 10000, errors: ['time'] })
                        .then(collected => {                            
                            function serverTry(server){
                                return collected.first(2)[1].content.toLowerCase().includes(server);
                            }
                            switch (true){
                            case serverTry('mineman'):
                                embed = new Discord.RichEmbed();
                                embed
                                    .setAuthor('To apply on Mineman Lounge:', bot.user.avatarURL)
                                    .setTitle('')
                                    .setDescription('Visit https://minemanlounge.com and visit the staff applications forum!')
                                    .setURL('https://minemanlounge.com')
                                    .setFooter('Matthew_Cash Bot')
                                    .setColor('#42f48f');
                                return message.channel.send(embed);
                            case serverTry('astro'):
                                embed = new Discord.RichEmbed();
                                embed
                                    .setAuthor('To apply on AstroHQ:', bot.user.avatarURL)
                                    .setTitle('')
                                    .setDescription('Visit https://astrohq.us and visit the staff applications forum!')
                                    .setURL('https://astrohq.us')
                                    .setFooter('Matthew_Cash Bot')
                                    .setColor('#42f48f');
                                return message.channel.send(embed);
                            case serverTry('playershq'):
                                embed = new Discord.RichEmbed();
                                embed
                                    .setAuthor('To apply on PlayersHQ:', bot.user.avatarURL)
                                    .setTitle('')
                                    .setDescription('Visit the official PlayersHQ Discord and create a new ticket! https://discord.gg/mdzUS8h')
                                    .setURL('https://discord.gg/mdzUS8h')
                                    .setFooter('Matthew_Cash Bot')
                                    .setColor('#42f48f');
                                return message.channel.send(embed);
                            default:
                                embed = new Discord.RichEmbed();
                                embed
                                    .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.avatarURL)
                                    .setTitle('')
                                    .setDescription('**Error** I could not find that server, if this is a mistake I will get back to you as fast as possible!')
                                    .setFooter('Matthew_Cash Bot')
                                    .setColor('#ff0000');
                                return message.channel.send(embed);
                            }
                        })
                        .catch(collected => {
                            embed = new Discord.RichEmbed();
                            embed
                                .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.avatarURL)
                                .setDescription('Request timed out, run the command >motd to start the form again!')
                                .setFooter('Matthew_Cash Bot')
                                .setColor('#ff0000');
                            message.channel.send(embed);
                        });
                }
            })
            .catch(collected => {
                embed = new Discord.RichEmbed();                
                embed
                    .setAuthor('Sorry, that I (AI) could not help! Please expect a response soon!', bot.user.avatarURL)
                    .setColor(1993413)
                    .setFooter('Created by Matthew_Cash#0210');
                message.channel.send(embed);
            });    
    });        
}

module.exports.execute = execute;
module.exports.responds = ['motd'];