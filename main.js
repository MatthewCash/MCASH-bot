const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
let commandList = new Discord.Collection();
let publicCommandList = new Discord.Collection();

const commandPrefix = '>';

//--------------------------------------------
//----Load-Commands---------------------------
//--------------------------------------------

fs.readdir('./commands/', (error, data) => {
    if (error) console.error(error);

    let fileData = data.filter(fileName => fileName.split('.').pop() === 'js');

    if (fileData.length <= 0) return console.warn('No commands in ./commands/');

    fileData.forEach((fileName) => {
        let module = require(`./commands/${fileName}`);
        for (var i in module.responds){
            commandList.set(module.responds[i], module);   
        }
        console.log(`[+] ${fileName} loaded`);                
    });
});

fs.readdir('./publiccommands/', (error, data) => {
    if (error) console.error(error);

    let fileData = data.filter(fileName => fileName.split('.').pop() === 'js');
   
    if(fileData.length <= 0) return console.warn('No commands in ./publiccommands/');

    fileData.forEach((fileName) => {
        let module = require(`./publiccommands/${fileName}`);
        for (var i in module.responds){
            publicCommandList.set(module.responds[i], module);
        }
        console.log(`[+] ${fileName} loaded publically`);       
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
        let command = message.content.toLowerCase().split(' ')[0].substr(commandPrefix.length);
        let args = message.content.split(/ +/).slice(1);

        if (publicCommandList.get(command)) {

            publicCommandList.get(command).execute(bot, sender, message, args);
            console.log([sender.username + sender.discriminator, command, args]);

        } else if ((message.author == bot.user || message.channel.id === '508105216911212585') && commandList.get(command)) {
            
            commandList.get(command).execute(bot, sender, message, args);
            console.log([sender.username + sender.discriminator, command, args]);
        }        
    }

    if (message.channel.type == 'dm' || message.channel.type == 'group'){
        bot.users.get('498881915756216322').send('Deleting...').then(msg => {
            msg.delete(1);
        });
    }

    if (message.channel.type == 'dm' && message.author != bot.user) {
        message.channel.fetchMessages({ limit: 10 }).then(messages => {
            if (messages.size == 1){                
                //oldpublicCommandList.get('motd').execute(bot, null, message, null);
            }    
        }
        )
            .catch(console.error);
    }
});

bot.on('error', console.error);

console.log('Logging in with provided environmental token...');
bot.login(process.env.TOKEN);
