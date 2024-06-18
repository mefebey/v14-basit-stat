const { EmbedBuilder } = require("discord.js");
const Database = require("../../Database/index");
const ayarlar = require(`../../ayarlar.json`)
const mesaj = new Database("Database", "Mesaj");

exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let member;
    if(!user) member = message.guild.members.cache.get(message.member.id)
    else member = user

    let user2 = message.mentions.users.first() || client.users.cache.get(args[0])
    let member2;
    if(!user2) member2 = client.users.cache.get(message.member.id)
    else member2 = user2

    if(member2.bot) return message.channel.send(`${ayarlar.no} Botların istatistiği tutulmamaktadır.`)

    let messageData = mesaj.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`) || {messages: 0, channels: {}};

    let messageList;
    if(mesaj.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`)) messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);
    else messageList = "**Veri Bulunamadı!**"

   if(mesaj.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`)) messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
   if(mesaj.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`)) messageList = messageList.map((md, index)=> `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");

    let rolemap = member.roles.cache
    .filter((roles) => roles.id !== message.guild.id)
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(",");
    if (rolemap.length > 1024) rolemap = "Rol sayısı gösteremeyeceğim kadar çok!";
    if (!rolemap) rolemap = "Rol bulunamadı";

const embed3 = new EmbedBuilder()
.setTitle(`💬 **Chat İstatistiği**`)
.setColor("000000")
.setThumbnail(member2.avatarURL({dynamic: true, size: 2048 }))
.setDescription(
  `**(${member2.username}** - \`${member.id})\`
   
  ${messageList}
  `)
.addFields({name: `Not:`, value: `\`Chat İstatikleri anında güncellenir!\``})
.setFooter({text:client.user.username ,iconURL: member2.avatarURL({})})
.setTimestamp();
 await message.channel.send({embeds: [embed3], components: []})
};

exports.conf = {
    aliases: ["mesaj", "chat", "me-chat",'mechat',"chatstat","mesajstat","mesaj-stat"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'chat-stat', 
    description: 'Sunucudaki mesaj istatistikleriniz hakkında bilgi verir.',
    usage: '(prefix)chat-stat',
    kategori: 'Kullanıcı'
};
