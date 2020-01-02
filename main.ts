import Discord from 'discord.js';
import fs from 'fs';
const bot = new Discord.Client();
let commandList = {};
let publicCommandList = {};

const commandPrefix = '>';

//--------------------------------------------
//----Load-Commands---------------------------
//--------------------------------------------

fs.readdir('./commands/', (err, data) => {
    if (err) console.error(err);

    let files = data.filter(file => file.split('.').pop() === 'ts');

    if (files.length <= 0) {
        return console.warn('No commands in ./commands/');
    }

    files.forEach((file: String) => {
        let { default: module } = require('./commands/' + file);
        for (let respond of module.responds) {
            commandList[respond] = module;
        }
        console.log('[+] ' + file + ' loaded');
    });
});

fs.readdir('./publiccommands/', (err, data) => {
    if (err) console.error(err);

    let files = data.filter(file => file.split('.').pop() === 'ts');

    if (files.length <= 0) {
        return console.warn('No commands in ./publiccommands/');
    }

    files.forEach((file: String) => {
        let { default: module } = require('./publiccommands/' + file);
        for (let respond of module.responds) {
            publicCommandList[respond] = module;
        }
        console.log('[+] ' + file + ' loaded publically');
    });
});

bot.on('ready', async () => {
    console.log('[Ready] Logged in to ' + bot.user.username);
    bot.user.setActivity('matthew-cash.com', { type: 'STREAMING', url: 'https://www.twitch.tv/matthew_cashmc' });
});

//--------------------------------------------
//----Command-Executer------------------------
//--------------------------------------------

bot.on('message', async message => {
    if (message.content === 'Deleting...') return;

    if (message.content.indexOf(commandPrefix) === 0) {
        let sender = message.author;
        let command = message.content
            .toLowerCase()
            .split(' ')[0]
            .substr(commandPrefix.length);
        let args = message.content.split(/ +/).slice(1);

        if (publicCommandList[command]) {
            publicCommandList[command].execute(bot, sender, message, args);
            console.log([sender.username + sender.discriminator, command, args]);
        } else if (
            (message.author == bot.user || message.channel.id === '508105216911212585') &&
            commandList[command]
        ) {
            commandList[command].execute(bot, sender, message, args);
            console.log([sender.username + sender.discriminator, command, args]);
        }
    }

    if (message.channel.type == 'dm' || message.channel.type == 'group') {
        bot.users
            .get('498881915756216322')
            .send('Deleting...')
            .then((msg: Discord.Message) => {
                (msg as Discord.Message).delete(1);
            });
    }
});

bot.on('error', console.error);

console.log('Logging in with provided environmental token...');
bot.login(process.env.TOKEN);
