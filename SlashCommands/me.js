const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require("discord.js");
const Database = require("../Database/index");
const ayarlar = require(`../ayarlar.json`)
const mesaj = new Database("Database", "Mesaj");
const ses = new Database("Database", "Ses");
const moment = require("moment");
require("moment-duration-format");
module.exports = async (interaction) => {
    let client = interaction.client;
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'me') {
    
        const num = interaction.options.getUser("kullanıcı")

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('sohbet')
                .setLabel('Chat Stat')
                .setStyle('Success')
                .setEmoji("💬"),
        
                new ButtonBuilder()
                .setCustomId('ses')
                .setLabel('Ses Stat')
                .setStyle('Danger')
                .setEmoji("🔉")
        )
    let member;
    if(!num) member = interaction.guild.members.cache.get(interaction.member.id)
    else member = interaction.guild.members.cache.get(num.id)

    let member2;
    if(!num) member2 = client.users.cache.get(interaction.member.id)
    else member2 = client.users.cache.get(num.id)

    if(member2.bot) return interaction.reply({content: `${ayarlar.no} Botların istatistiği tutulmamaktadır.`, ephemeral: true})

    let voiceData = ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`) || {voice: 0, channels: {}};
    let messageData = mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`) || {messages: 0, channels: {}};

    let voiceList;
     if(ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) voiceList = Object.keys(voiceData.channels).map(vd => {
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);
    else voiceList = "**Veri Bulunamadı!**"

    let messageList;
    if(mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);
    else messageList = "**Veri Bulunamadı!**"

   if(ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
   if(ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) voiceList = voiceList.map((vd, index)=> `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [hours,] m [minutes] s [seconds]")}\``).join("\n");
   if(mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
   if(mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) messageList = messageList.map((md, index)=> `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");

    let rolemap = member.roles.cache
    .filter((roles) => roles.id !== interaction.guild.id)
    .sort((a, b) => b.position - a.position)
    .map(r => r)
    .join(",");
    if (rolemap.length > 1024) rolemap = "Rol sayısı gösteremeyeceğim kadar çok!";
    if (!rolemap) rolemap = "Rol bulunamadı";

const embed = new EmbedBuilder()
.setTitle(`**Kullanıcı Bilgileri**`)
.setColor("000000")
.setThumbnail(member2.avatarURL({dynamic: true, size: 2048 }))
.setDescription(
  `• Kullanıcı: (${member.toString()} - \`${member.id}\`) (${member.roles.highest})
   • Hesap Kurulum Tarihi: \`${moment(member.user.createdAt).format('D MMMM YYYY')}\`
   • Sunucuya Katılma Tarihi: \`${moment(member.joinedAt).format('D MMMM YYYY')}\`
   • Rolleri: ${rolemap}`)
.setFooter({text:client.user.username ,iconURL: member2.avatarURL({})})
.setTimestamp();

await interaction.reply({embeds: [embed], components: [row]}).then((msg) => {

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

const filter = i => i.user.id === interaction.member.id;
const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
collector.on('collect', async i => {
if(i.customId === "ses") {
await msg.edit({embeds: [embed2], components: []})
}
if(i.customId === "sohbet") {
 await msg.edit({embeds: [embed3], components: []})
  }
})
})
    }

}
module.exports.conf = {
    event:"interactionCreate",
    name: "me",
    description:"Hakkınızda istatistik gösterir",
        name2: "kullanıcı",
        description2:"Bir kullanıcı belirtin",
        required: false,
        type: ApplicationCommandOptionType.User
};