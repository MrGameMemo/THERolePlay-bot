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
        if (message.content === prefix + 'candidatures') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#333333')
                .setDescription('Voici les deux candidatures disponibles pour ce serveur: \nPour le [staff](https://goo.gl/forms/JhydYecWVfJ1LzZA2) \nPour les [métiers]( https://docs.google.com/forms/d/1CswoyBr2ZZYeyDyifZ36uRudq8_sHsSo0fESzLRGI-c/edit?usp=drivesdk) \n Pour le gouvernement se référé au métiers (provisoire)')
            message.channel.send(help_embed)
                .then(message => console.log(`Sent message: Candidatures`))
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
        }
        if (message.content === prefix + 'info') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription("J'ai été développé par transiSciences#6105 \nEt suis administré et organisé par MrGame#9298. \nPour plus d'informations sur les commandes que je propose, faites +help")
            message.channel.send(help_embed)
        }
        if (message.content === prefix + 'invite') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription("Pour m'inviter sur ton serveur, [clique ici](https://discordapp.com/oauth2/authorize?client_id=424720833043496971&scope=bot&permissions=1010007255)")
            message.channel.send(help_embed)
        }
        if (message.content === prefix + 'ping') {
            message.channel.send(`pong \`${Date.now() - message.createdTimestamp} ms\``)
        }
        if (message.content.startsWith(prefix + 'report')) {
            message.delete()
            let content = message.content.substr(8);
            message.guild.channels.get('432512830483464192').send(`${message.author} fait un report car: ${content}`)
            message.channel.send(`:white_check_mark: | Le report à bien été efféctué, le staff s'en occupera dès que possible.`)
        }
        if (message.content === prefix + 'serv') {
            var serv_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription("Pour rejoindre mon serveur, [c'est par là](https://discord.io/the-rpds)")
            message.channel.send(serv_embed)
        }
        if (message.content === prefix + 'site-web') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription('Pour aller sur notre site web, [clique ici]( https://the-rp-server.e-monsite.com/)')
            message.channel.send(help_embed)
        }
        if (message.content.startsWith(prefix + 'sms')) {
            message.delete()
            let sender = message.author.username;
            let content = message.content.substr(5);
            let member = message.mentions.users.first();
            member.send(`Message de ${sender}: \nContenu --> ${content} \n \n \`Si cette commande est spammée n'hésitez pas à prévenir le staff \``)
        }
        if (message.content === prefix + 'support') {
            let supportRole = message.guild.roles.find('name', 'Support');
            message.guild.channels.get('424964584605220874').send(`${message.author} a besoin d'un membre du ${supportRole}`)
            message.member.addRole('425367442202689547')
        }
        if (message.content === prefix + 'version') {
            message.channel.send('Je suis en version: ' + '**' + version + '**')
        }
        if (message.content === prefix + 'help') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setTitle(`Les commandes disponibles du bot ${Client.user.username}`)
                .setDescription(`Le prefix est: ` + prefix)
                .setThumbnail(`${Client.user.avatarURL}`)
                .addBlankField(true)
                .addField(":book: utiles", "=candidatures => Te permet d'accéder aux candidatures du serveur\n=support => Te met un rôle et mentionne le staff\n=invite => Te permet d'inviter le bot sur ton serveur\n=version => Te donne ma version\n=serv => Te donne l'invitation du serveur\n=contact => Te permet d'avoir les informations de contact du bot\n=report => Te permet de reporter un joueur\n=invite => Te permet d'inviter le bot sur ton serveur\n+site-web => Te permet d'accéder à notre site web\n+sms => Te permet d'envoyer un sms à un utilisateur")
                .addBlankField(true)
                .setFooter(Client.user.username)
                .setTimestamp()
            message.author.send(help_embed)
            sendValid(message, "Les commandes utilisables vous ont été envoyées en MP. :envelope_with_arrow:")
        } else {}
    } else {
        let member = message.author.username;
        message.channel.send(`:x: | Le bot est en cours de préparation ${message.author} tu ne peux pas l'utiliser`)
            .then(message => console.log(`Active Firewall: ${member} try to use the bot.`))
            .catch(console.error)
    }
});

Client.login(process.env.TOKEN)
