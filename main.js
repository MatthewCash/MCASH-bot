
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
let commandList = new Discord.Collection();
let publicCommandList = new Discord.Collection();

const commandPrefix = '>';

//--------------------------------------------
//----Load-Commands---------------------------
//--------------------------------------------

fs.readdir('./commands/', (err, data) => {
    if(err) console.error(err);

    let fileData = data.filter(fileName => fileName.split('.').pop() === 'js');

    if(fileData.length <= 0) {return console.warn('No commands in ./commands/');}

    fileData.forEach((fileName) => {
        let module = require(`./commands/${fileName}`);
        for (var i in module.responds){
            commandList.set(module.responds[i], module);   
        }
        console.log(`[+] ${fileName} loaded`);                
    });
});

fs.readdir('./publiccommands/', (err, data) => {
    if(err) console.error(err);

    let fileData = data.filter(fileName => fileName.split('.').pop() === 'js');
   
    if(fileData.length <= 0) {return console.warn('No commands in ./publiccommands/');}

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
});

//--------------------------------------------
//----Command-Executer------------------------
//--------------------------------------------

bot.on('message', async message => {

    if (message.content === 'Deleting...') return;

    if (message.content.indexOf(commandPrefix) === 0) {
        let sender = message.author;
        let command = message.content.toLowerCase().split(' ')[0].substr(commandPrefix.length);
        let args = message.content.split(' ').slice(1);

        console.log([sender.id, command, args]);

        if(publicCommandList.get(command)) {
            publicCommandList.get(command).execute(bot, sender, message, args);
        }else{
            if (message.channel.type == 'text' && message.channel.id === '508105216911212585' && commandList.get(command)){
                commandList.get(command).execute(bot, sender, message, args);
            }
        }   
    }

    if (message.channel.type == 'dm' || message.channel.type == 'group'){
        console.log('Sending empty to user ' + message.channel.id);
        bot.users.get('498881915756216322').send('Deleting...')
            .then(msg => {
                msg.delete(1);
            });
    }

    if (message.channel.type == 'dm' && message.author != bot.user) {
        message.channel.fetchMessages({ limit: 10 })
            .then(messages => {
                if (messages.size == 1){                
                    message.channel.send({
                        'embed': {
                            'title': 'Welcome!',
                            'description': 'Responses are generally sent within `2 hours`!\rI get a lot of DMs, please read over the list below to see if your question has already been answered!',
                            'color': 1993413,
                            'footer': {
                                'text': 'Created by Matthew_Cash#0210'
                            },
                            'author': {
                                'name': 'Hello! Thank you for contacting me!',
                                'icon_url': 'http://gravatar.com/avatar/2b152bb63629cff42dee60ed95409e19'
                            },
                            'fields': [{
                                'name': 'Common Questions',
                                'value': '```css\r[Can I get staff/partner on one of your servers?]\r- I am a developer on all of my servers, I would recommend checking if we have a currently applications process, or contacting a different staff member!\r\r[Can I hire you?]\r- Sure, I work as a developer and system administrator, let me know some more info, and I will get back to you ASAP!\r\r#General-Information\r- Timezone = PST\r- Languages = Java, C#, Bash, JS(Learning)\r- Current Servers = AstroHQ, ChampionPvP```'
                            }]
                        }
                    });
                }    
            }
            )
            .catch(console.error);
    }
});

bot.on('error', console.error);

console.log('Logging in with provided environmental token...');
bot.login(process.env.TOKEN);