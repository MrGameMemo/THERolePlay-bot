const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '+';
const name = 'THERolePlay Bot';
const version = 'Béta 9.8.9';
const lang = 'fr';

function sendError(message, description) {
    var help_embed = new Discord.RichEmbed()
        .setColor('#ffff')
        .setDescription(':x: ' + description)
    message.channel.send(help_embed)


};

function sendValid(message, description) {
    var help_embed = new Discord.RichEmbed()
        .setColor('#ffff')
        .setDescription(':white_check_mark: ' + description)
    message.channel.send(help_embed)
};

Client.on('ready', function() {
    console.log('Logged in as: ' + name + ' ' + version + ' ' + lang)
    Client.user.setActivity('https://discord.io/the-rpds | +help ')
})

Client.login(process.env.TOKEN)
