import * as Discord from 'discord.js';
import * as figlet from 'figlet';

let embed = new Discord.RichEmbed();

async function execute(bot, sender, message, args): Promise<void> {
    if (!args[0] || (message.author !== bot.user && !args[1])) {
        embed = new Discord.RichEmbed();
        embed
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.avatarURL)
            .setDescription('**Error** Please specify both a channel ID and a message!')
            .setFooter('Matthew_Cash Bot')
            .setColor('#ff0000');
        return message.channel.send(embed);
    }

    let providedChannel = bot.channels.get(args[0]);

    if (providedChannel) {
        figlet(args.splice(1).join(' '), (err, ascii) => providedChannel.send('```' + ascii + '```'));
    } else if (message.author == bot.user) {
        message.delete();
        figlet(args.join(' '), (err, ascii) => message.channel.send('```' + ascii + '```'));
    } else {
        embed = new Discord.RichEmbed();
        embed
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.avatarURL)
            .setDescription('**Error** Please specify both a channel ID and a message!')
            .setFooter('Matthew_Cash Bot')
            .setColor('#ff0000');
        message.channel.send(embed);
    }
}

export default {
    execute,
    responds: ['bigtext', 'ascii', 'big']
};
