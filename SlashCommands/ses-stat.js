const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const ayarlar = require(`../ayarlar.json`)
const Database = require("../Database/index");
const ses = new Database("Database", "Ses");
const moment = require("moment");
require("moment-duration-format");
module.exports = async (interaction) => {
    let client = interaction.client;
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'ses-stat') {
    
        const num = interaction.options.getUser("kullanıcı")

    let member;
    if(!num) member = interaction.guild.members.cache.get(interaction.member.id)
    else member = interaction.guild.members.cache.get(num.id)

    let member2;
    if(!num) member2 = client.users.cache.get(interaction.member.id)
    else member2 = client.users.cache.get(num.id)

    if(member2.bot) return interaction.reply({content: `${ayarlar.no} Botların istatistiği tutulmamaktadır.`, ephemeral: true})

    let voiceData = ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`) || {voice: 0, channels: {}};

    let voiceList;
     if(ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) voiceList = Object.keys(voiceData.channels).map(vd => {
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);
    else voiceList = "**Veri Bulunamadı!**"

   if(ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
   if(ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) voiceList = voiceList.map((vd, index)=> `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [hours,] m [minutes] s [seconds]")}\``).join("\n");

    let rolemap = member.roles.cache
    .filter((roles) => roles.id !== interaction.guild.id)
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

await interaction.reply({embeds: [embed2]})
    }

}
module.exports.conf = {
    event:"interactionCreate",
    name: "ses-stat",
    description:"Hakkınızda ses istatistiğini gösterir",
        name2: "kullanıcı",
        description2:"Bir kullanıcı belirtin",
        required: false,
        type: ApplicationCommandOptionType.User
};