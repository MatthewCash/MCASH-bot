const DiscordRPC = require('discord-rpc');

let client = new DiscordRPC.Client({transport: 'ipc'});

function setGame(){

    client = new DiscordRPC.Client({transport: 'ipc'});
    client.login({clientId: '510347079302905856'}).catch(console.error);
    client.on('ready', () => {

        client.setActivity({
            details: 'Add me on Discord!',
            state: 'Whats up, friend!',
            largeImageKey: 'logo',
            largeImageText: 'Matthew_Cash',
            instance: true,
        });  
    });
}

setGame();
setInterval(setGame, 15000);
console.log('[+] Rich Presence Enabled');