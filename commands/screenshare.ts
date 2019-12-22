async function execute(bot, sender, message, args): Promise<void> {
    message.channel.send(
        'https://discordapp.com/channels/' +
            message.guild.id +
            '/' +
            (await message.guild.fetchMember(message.author)).voiceChannelID
    );
}

export default {
    execute,
    responds: ['ss', 'screenshare']
};
