const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '=';
const name = 'CodeUs';
const version = 'Béta 5.4.9';
const lang = 'fr';

//variable mute vcs
var modVcs1 = '295211285405237248';
var modVcs2;
var vcsMuted1;
var vcsMuted2;
var vcsMuted3;
var vcsMuted4;
var vcsMuted5;
var vcsMuted6;
var vcsMuted7;
var vcsMuted8;
var vcsMuted9;
var vcsMuted10;

// Les fonctions validé / réfuté
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

// Le ready du bot
Client.on('ready', function() {
    console.log('Logged in as: ' + name + ' ' + version + ' ' + lang)
    Client.user.setActivity(`=help | ${Client.guilds.size} Serveurs ${Client.users.size}  Utilisateurs !`);
})

Client.on('message', (message, member) => {
    let splitMessage = message.content.split(' ');
    if (message.content[0] === prefix) {

        // commande ping
        if (message.content === prefix + 'ping') {
            var ping_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription(`pong :ping_pong: | \`${Date.now() - message.createdTimestamp} ms\``)
            message.channel.send(ping_embed)
                .then(message => console.log(`Sent message: Ping`))
                .catch(console.error)
        }

        // commande help
        if (message.content === prefix + 'help') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setTitle(`Les commandes disponibles du bot ${Client.user.username}`)
                .setDescription(`Le prefix est: ` + prefix)
                .setThumbnail(`${Client.user.avatarURL}`)
                .addBlankField(true)
                .addField(":book: utiles", "=candidatures => Te permet d'accéder aux candidatures du serveur\n=credits => T'indique les credits du bot\n=invite => Te permet d'inviter le bot sur ton serveur\n=vcs => Pour envoyer des messages inter-serveurs néccéssite un channel vcs\n=version => Te donne ma version\n=serveur => Te donne des informations sur le serveur")
                .addBlankField(true)
                .addField("🙂 FUN", "=id => Te permet de connaître ton identifiant\n=list => Te permet de savoir sur quel serveur je suis\n=user Te permet d'avoir des informations sur un utilisateur usage: =user ou =user@User1234")
                .addBlankField(true)
                .addField("🔒 Moderation", "=ban => Te permet de bannir un utilisateur en cas de besoin\n=kick => Te permet d'expulser un membre gênant\n=mute => Te permet de mute quelqu'un d'un channel\n=unmute => Te permet de le unmute...")
                .addBlankField(true)
                .setFooter(Client.user.username)
                .setTimestamp()
            message.author.send(help_embed)
            sendValid(message, "Les commandes utilisables vous ont été envoyées en MP. :envelope_with_arrow:")
        }

        //commande version
        if (message.content === prefix + 'version') {
            message.channel.send('Je suis en version: ' + '**' + version + '**')
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error)
        }

        //commande candidatures
        if (message.content === prefix + 'candidatures') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#333333')
                .setDescription('Voici les formulaires de candidatures disponiblent pour le serveur officiel: \nPour le [staff](https://goo.gl/forms/JtR9DaOE07ieELJw1) Vous devez être sur le serveur Les petits développeur\nPour la [modération vcs](https://goo.gl/forms/Zvk4DJg9dd5vSmw63)')
            message.channel.send(help_embed)
                .then(message => console.log(`Sent message: Candidatures`))
                .catch(console.error)
        }

        //commande invite
        if (message.content === prefix + 'invite') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription("Pour m'inviter sur ton serveur, [clique ici](https://discordapp.com/oauth2/authorize?client_id=423156012502089731&scope=bot&permissions=471039222)")
            message.channel.send(help_embed)
                .then(message => console.log(`Sent message: Invitation`))
                .catch(console.error)
        }

        //commande credits
        if (message.content === prefix + 'credits') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffff')
                .setDescription("Je suis développé et administré par transiSciences#6105 \nPour plus d'informations sur les commandes que je propose, faites =help")
            message.channel.send(help_embed)
                .then(message => console.log(`Sent message: Information`))
        }

        //commande id
        if (message.content === prefix + 'id') {
            if (message.channel.type === 'dm') return message.channel.send("Tu sais que c'est sur les serveurs qu'il faut utiliser les commandes ? :joy:");
            message.channel.send(`**${message.author.username}** voici ton ID: __${message.author.id}__`)
                .then(message => console.log('Sent message: Identifiant'))
                .catch(console.error)
        }

        //commande ban
        if (message.content.startsWith(prefix + "ban")) {
            if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(":x: | Tu n'a pas la permission de bannir des membres");
            if (!message.guild.member(Client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(":x: | Je n'ai pas la permission pour bannir des membres");
            let member = message.mentions.members.first();
            if (!member) return message.reply(":x: | Mauvais usage fait comme ça : `=ban @User#1234`");
            if (!member.bannable) return message.reply(":x: | Je ne peux pas le bannir")
            if (member && message.member.permissions.has("BAN_MEMBERS")) {
                member.send(`Vous avez été banni du serveur ${message.guild.name} par ${message.author.tag}`)
                member.ban(`banni par ${message.author.tag}`);
                message.channel.send(`${member.username} a été banni avec succès. :white_check_mark:`);
            }

        }


        //commande kick
        if (message.content.startsWith(prefix + 'kick')) {
            if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Tu n'a pas la permission d'expulser des utilisateurs");
            if (!message.guild.member(Client.user).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Je n'ai pas la permission gérer le serveur");
            let member = message.guild.member(message.mentions.users.first());
            if (!member) return message.channel.send(":x: | Mauvais usage fais comme ça: `=kick @User#1234`")
            member.send(`Vous avez été expulsé du serveur ${message.guild.name} par ${message.author.tag}`)
            message.reply("Cet utilisateur a bien été expulsé du serveur :white_check_mark:")
            member.kick(`Expulsé par ${message.author.tag}`)
        }


        //commande mute
        if (message.content.startsWith(prefix + 'mute')) {
            if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Vous n'avez pas la permission de mute des utilisateurs");
            if (!message.guild.member(Client.user).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Je n'ai pas la permission gérer le serveur");
            let member = message.guild.member(message.mentions.users.first());
            if (!member) return message.channel.send(":x: | Mauvais usage fais comme ça: `=mute @User#1234`")
            member.send(`Vous avez été mute du serveur ${message.guild.name} par ${message.author.tag}`)
            message.channel.overwritePermissions(member, { SEND_MESSAGES: false }).then(member => {})
        }


        //commande unmute
        if (message.content.startsWith(prefix + 'unmute')) {
            if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Vous n'avez pas la permission de unmute des utilisateurs");
            if (!message.guild.member(Client.user).hasPermission("MANAGE_GUILD")) return message.channel.send(":x: | Je n'ai pas la permission gérer le serveur");
            let member = message.guild.member(message.mentions.users.first());
            if (!member) return message.channel.send(":x: | Mauvais usage fais comme ça: `=mute @User#1234`")
            member.send(`Vous avez été unmute du serveur ${message.guild.name} par ${message.author.tag}`)
            message.channel.overwritePermissions(member, { SEND_MESSAGES: true }).then(member => {
                message.channel.send(`:white_check_mark: | est désormais unmute du serveur :mute:`)
            })
        }

        //commande serveurs
        if (message.content === prefix + 'serveurs') {
            message.guild.name.forEach(message => {
                return message.channel.send(`Je suis sur: ${message.guild.name}`)
            })
        }

        //commande vcs
        if (message.content.startsWith(prefix + "vcs")) {
            message.delete();
            var vcsc = Client.channels.findAll('name', 'vcs');
            var vcsc2 = message.guild.channels.find('name', 'vcs');
            if (!vcsc2) {
                return message.reply("❌ | Je ne trouve pas le salon ``vcs`` . Sois je n'ai pas les permissions d'y acceder ou sois il y en a pas")
            }
            if (message.content.length <= 5) return message.author.send(":x: | Tu ne peux pas ne pas envoyer un message vide");
            if (message.author.id === vcsMuted1 || (message.author.id === vcsMuted2 || message.author.id === vcsMuted3 || message.author.id === vcsMuted4 || message.author.id === vcsMuted5 || message.author.id === vcsMuted6 || message.author.id === vcsMuted7 || message.author.id === vcsMuted8 || message.author.id === vcsMuted9 || message.author.id === vcsMuted10)) return message.author.send(':x: | Vous avez été mute de mon vcs. Vous ne pouvez envoyer aucun message.')
            vcsc.forEach(channel => {
                message.delete();
                const embeduser = new Discord.RichEmbed()
                    .setAuthor("►Utilisateur " + message.author.tag)
                    .setThumbnail(message.author.avatarURL)

                .addField(":black_small_square:", `${message.content.substr(5)}`)
                    .setFooter("Sent in " + message.guild.name, message.guild.iconURL)
                    .setTimestamp()
                    .setColor("#FFFFFF");
                const embedmod = new Discord.RichEmbed()
                    .setAuthor("►Service modération " + message.author.tag)
                    .setThumbnail(message.author.avatarURL)

                .addField(":black_small_square:", `${message.content.substr(5)}`)
                    .setFooter("Sent in " + message.guild.name, message.guild.iconURL)
                    .setTimestamp()
                    .setColor("#f001f9");
                const embedow = new Discord.RichEmbed()
                    .setAuthor("►Créateur " + message.author.tag)
                    .setThumbnail(message.author.avatarURL)

                .addField(":black_small_square:", `${message.content.substr(5)}`)
                    .setFooter("Sent in " + message.guild.name, message.guild.iconURL)
                    .setTimestamp()
                    .setColor("#f90202");
                const embedbot = new Discord.RichEmbed()
                    .setAuthor("►Bot Officiel " + message.author.tag)
                    .setThumbnail(message.author.avatarURL)

                .addField(":black_small_square:", `${message.content.substr(5)}`)
                    .setFooter("Sent in " + message.guild.name, message.guild.iconURL)
                    .setTimestamp()
                    .setColor("#0206f9");


                if (message.author.id == process.env.OWNERID) {

                    channel.send(embedow)
                } else {
                    if (message.author.id == process.env.MODID1 || message.author.id === process.env.MODID2) {
                        channel.send(embedmod)

                    } else {
                        if (message.author.id == process.env.BOTID) {
                            channel.send(embedbot)
                        } else {
                            channel.send(embeduser)


                        }
                    }
                }
            })
        }

        //commande off
        if (message.content.startsWith(prefix + "off")) {

            if (message.author.id === process.env.OWNERID) {

                message.reply("Arrêt en cours");

                console.log('/ Je suis désormais offline / ');

                Client.destroy();

                process.exit()

            } else {

                message.channel.send(":x: **Erreur** ! Tu n'es pas le Créateur")

            }
        }

        //commande user
        if (message.content.startsWith(prefix + 'user')) {
            var mentionned = message.mentions.users.first();
            var membername = message.author.username
            var usr;
            if (mentionned) {
                var usr = mentionned;
            } else {
                var usr = message.author;
            }
            if (usr.presence.status == 'online') {
                var status = 'En ligne';
            }
            if (usr.presence.status == 'dnd') {
                var status = 'Occupé';
            }
            if (usr.presence.status == 'idle') {
                var status = 'Inactif';
            } else {
                var status = 'Hors ligne';
            }
            if (!usr.presence.game) {
                var game = 'Joue à aucun jeu';
            } else {
                var game = usr.presence.game.name
            }
            var user_embed = new Discord.RichEmbed()
                .setColor('#01f9ec')
                .setTitle(usr.tag, usr.avatarURL)
                .setThumbnail(usr.avatarURL)
                .addField('Pseudo', usr.username)
                .addField('id', usr.id)
                .addField("***Tag***", "#" + usr.discriminator)
                .addField('status', status)
                .addField('Joue à', game)
                .setFooter(`Request by ${membername}`)
                .setTimestamp()
            message.channel.send(user_embed)
        }



        //commande list

        if (message.content.startsWith(prefix + "list")) {



            let ginfoEmbed = new Discord.RichEmbed()
                .setDescription("__**Infos**__")
                .setColor('#00FFE8')
                .addField("Serveur liste", `${Client.guilds.map(g=>g.name).join("\n")}`)

            message.channel.send(ginfoEmbed);
        }

        //commande sendMessage
        if (message.content.startsWith(prefix + 'sendMessage')) {
            message.delete()
            if (message.author.id === process.env.OWNERID) {
                let content = message.content.substr(12)
                message.channel.send(content)
            } else {
                message.channel.send(":x: **Erreur** | Vous n'êtes pas le Créateur !")
            }
        }

        //commande serveur
        if (message.content === prefix + 'serveur') {
            var infoserveur = new Discord.RichEmbed()
                .setColor('0x0000FF')
                .setTitle('Information concernant le serveur ' + message.guild.name)
                .setThumbnail(message.guild.iconURL)
                .addField('Propriétaire du serveur', message.guild.owner)
                .addField('Crée le', message.guild.createdAt)
                .addField('Vous avez rejoint le', message.member.joinedAt)
                .addField('Membres', message.guild.memberCount)
                .addField('Channels', message.guild.channels.size)
                .addField('Roles', message.guild.roles.size)
                .addField('id', message.guild.id)
                .setFooter(`Request by ${message.author.tag}`)
                .setTimestamp()
            message.channel.send(infoserveur)

        }

        //commande sondage
        if (message.content.startsWith(prefix + "sondage")) {
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            let embed = new Discord.RichEmbed()
                .setDescription("Sondage")
                .addField(thingToEcho, "Répondre avec :one:(oui/choix) ou :two:(non/choix)")
                .setColor("#C3FE01")
                .setTimestamp()
                .setFooter(`Sondage réalisé par ${message.author} | © 🌺🍃FroGroZe🍃🌺#6893`)
            message.channel.send({ embed })
                .then(function(message) {
                    message.react("1⃣")
                    message.react("2⃣")
                }).catch(function() {});
        }

        //commande list roles
        if (message.content === prefix + 'list roles') {
            var rinfo_embed = new Discord.RichEmbed()
                .setColor('#00FFE8')
                .setDescription(`__**Infos rôles liste**__`)
                .addField('Rôles liste', `${Client.channels.map(r => r.name).join("\n")}`)
        }

        //commande serveur officiel
        if (message.content === prefix + 'serveur officiel') {}


        //commande MuteVcs
        if (message.content.startsWith(prefix + 'MuteVcs')) {
            if (!message.author.id === modVcs1 || modVcs2) return message.author.send(":x: **Erreur** | Vous n'êtes pas de l'équipe de modération de mon vcs")
            if (message.content.substr(9) === 0) return message.author.send(":x: | Vous devez spécifié l'id d'un membre exemple 067549873150")
            if (vcsMuted1.length === 0) {
                var vcsMuted1 = message.content.substr()
            }
        } else {};
    };
});

Client.login(process.env.TOKEN)