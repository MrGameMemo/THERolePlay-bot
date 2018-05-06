const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '+';
const name = 'THE RolePlay Bot';
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

Client.on('message', (message, members) => {
    if (!message.content.startsWith(prefix)) return;
    if (message.member.roles.some(r => ["Béta testeur"].includes(r.name))) {
        let splitMessage = message.content.split(' ');
        if (message.content === prefix + 'help') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription(`Tu as demandé d'avoir des informations me concernant, les voici: \n\n  **Commandes RP:** \n+Candidatures \n+`)
            message.author.send(help_embed)
                .then(message => console.log(`Sent message: Help`))
                .catch(console.error)
            sendValid(message, "Les commandes utilisables vous ont été envoyées en MP. :envelope_with_arrow:")
        }
        if (message.content === prefix + 'candidatures') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#333333')
                .setDescription('Voici les deux candidatures disponibles pour ce serveur: \nPour le [staff](https://goo.gl/forms/JhydYecWVfJ1LzZA2) \nPour les [métiers]( https://docs.google.com/forms/d/1CswoyBr2ZZYeyDyifZ36uRudq8_sHsSo0fESzLRGI-c/edit?usp=drivesdk) \n Pour le gouvernement se référé au métiers (provisoire)')
            message.channel.send(help_embed)
                .then(message => console.log(`Sent message: Candidatures`))
                .catch(console.error)
        }
        if (message.content === prefix + 'support') {
            let supportRole = message.guild.roles.find('name', 'Support');
            message.guild.channels.get('424964584605220874').send(`${message.author} a besoin d'un membre du ${supportRole}`)
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error)
        }
        if (message.content.startsWith(prefix + 'MP')) {
            message.delete()
            if (!message.author.id === '375966230265462785' || !message.author.id === '318316245265154048') return message.author.send(":x: | Tu n'a pas accès à cette commande")
            let receiver = message.mentions.users.first()
            let content = message.content.substr(4);
            var MP_embed = new Discord.RichEmbed()
                .setColor('#efd404')
                .addField(`Message de ${message.author.tag}`, `${content}`)
                .setFooter("THERolePlay Bot | Service d'administation")
                .setTimestamp()
            receiver.send(MP_embed)
        }
        if (message.content === prefix + 'contact') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription("Pour contacter le fondateur: \nMr Game: <@318316245265154048> ou pour le chef développeur \ntransiSciences: <@375966230265462785>")
            message.channel.send(help_embed)
        } else {}
    } else {
        let member = message.author.username;
        message.channel.send(`:x: | Le bot est en cours de préparation ${message.author} tu ne peux pas l'utiliser`)
            .then(message => console.log(`Active Firewall: ${member} try to use the bot.`))
            .catch(console.error)
    }
});

Client.login(process.env.TOKEN)
