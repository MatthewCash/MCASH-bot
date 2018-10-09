const Discord = require('discord.js');
const fs = require('fs');

var bot = new Discord.Client;

bot.on('ready', () => {
    console.log("Logged in to " + bot.user.username);
})

bot.on('message', message => {
    if (message.channel.type == 'dm'  ) { 
        switch (message.content){            
            case ">motd":
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
                    'fields': [
                        {
                        'name': 'Common Questions',
                        'value': '```css\r[Can I get staff/partner on one of your servers?]\r- I am a developer on all of my servers, I would recommend checking if we have a currently applications process, or contacting a different staff member!\r\r[Can I hire you?]\r- Sure, I work as a developer and system administrator, let me know some more info, and I will get back to you ASAP!\r\r#General-Information\r- Timezone = PST\r- Languages = Java, C#, Bash, JS(Learning)\r- Current Servers = AstroHQ, ChampionPvP```'
                        }
                    ]
                    }
                })


        }
    }

    if ((message.channel.type == 'dm' || message.channel.type == 'group') && message.channel.id != '498882439192510464'){
        console.log("Sending empty in " + message.channel.id)
        bot.users.get('498881915756216322').send('Deleting...')
        .then(msg => {
          msg.delete(1)
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
                      'fields': [
                        {
                          'name': 'Common Questions',
                          'value': '```css\r[Can I get staff/partner on one of your servers?]\r- I am a developer on all of my servers, I would recommend checking if we have a currently applications process, or contacting a different staff member!\r\r[Can I hire you?]\r- Sure, I work as a developer and system administrator, let me know some more info, and I will get back to you ASAP!\r\r#General-Information\r- Timezone = PST\r- Languages = Java, C#, Bash, JS(Learning)\r- Current Servers = AstroHQ, ChampionPvP```'
                        }
                      ]
                    }
                  })
        }    
    }
)
        .catch(console.error);       
    }
})

console.log("Logging in with token...")
bot.login('MTkyMDM1MDU1NTg0MDE4NDM1.DevVSA.5FdF6JsX7FrLzaSrSQRznWyxZ5Y');
