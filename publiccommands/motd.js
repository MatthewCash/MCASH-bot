function execute(bot, sender, message, args) {

    if (message.channel.type == 'text') return;
    
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

module.exports.execute = execute;
module.exports.responds = ['motd'];