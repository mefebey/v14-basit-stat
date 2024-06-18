const { EmbedBuilder } = require("discord.js");
const ayarlar = require(`../../ayarlar.json`)
const Database = require("../../Database/index");
const ses = new Database("Database", "Ses");
const moment = require("moment");
require("moment-duration-format");

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

    let voiceData = ses.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`) || {voice: 0, channels: {}};

    let voiceList;
     if(ses.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`)) voiceList = Object.keys(voiceData.channels).map(vd => {
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);
    else voiceList = "**Veri Bulunamadı!**"

   if(ses.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`)) voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
   if(ses.bul(`stats.${message.guild.id}.${message.guild.id}.${member.id}`)) voiceList = voiceList.map((vd, index)=> `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [hours,] m [minutes] s [seconds]")}\``).join("\n");
   
    let rolemap = member.roles.cache
    .filter((roles) => roles.id !== message.guild.id)
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(",");
    if (rolemap.length > 1024) rolemap = "Rol sayısı gösteremeyeceğim kadar çok!";
    if (!rolemap) rolemap = "Rol bulunamadı";

const embed2 = new EmbedBuilder()
.setTitle(`🔉 **Ses İstatistiği**`)
.setColor("000000")
.setThumbnail(member2.avatarURL({dynamic: true, size: 2048 }))
.setDescription(
  `**(${member2.username}** - \`${member.id})\`
   
  ${voiceList}
  `)
.addFields({name: `Not:`, value: `\`Ses İstatistikleri sesten çıktıktan sonra güncellenir!\``})
.setFooter({text:client.user.username ,iconURL: member2.avatarURL({})})
.setTimestamp();

await message.channel.send({embeds: [embed2], components: []})
};

exports.conf = {
    aliases: ["ses","voice","sesstat","voicestat","voice-stat","meses","ses-me","sesme","voice-me","voiceme"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'ses-stat', 
    description: 'Sunucudaki istatistikleriniz hakkında bilgi verir.',
    usage: '(prefix)me',
    kategori: 'Kullanıcı'
};
