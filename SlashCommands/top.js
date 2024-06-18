const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require("discord.js");
const Database = require("../Database/index");
const mesaj = new Database("Database", "Mesaj");
const ses = new Database("Database", "Ses");
const moment = require("moment");
require("moment-duration-format");
module.exports = async (interaction) => {
    let client = interaction.client;
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'stats') {
        const voiceData = ses.bul(`stats.${interaction.guild.id}.${interaction.guild.id}`) || undefined;
        const messageData = mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}`) || undefined;
    
        let member2 = client.users.cache.get(interaction.member.id)

        let messageList = "Veri Bulunamadı!";
        if(messageData){
            messageList = Object.keys(messageData || {}).map(md => {
                return {
                    Id: md,
                    Total: Object.values(messageData[md].channels || {}).reduce((a, b) => a + b, 0)
                };
            }).sort((a, b) => b.Total - a.Total).splice(0, 10).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${user.Total} message\``).join("\n");    
        }
    
        let voiceList = "Veri Bulunamadı!";
        if(voiceData){
            voiceList = Object.keys(voiceData || {}).map(md => {
                return {
                    Id: md,
                    Total: Object.values(voiceData[md].channels || {}).reduce((a, b) => a + b, 0)
                };
            }).sort((a, b) => b.Total - a.Total).splice(0, 10).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${moment.duration(user.Total).format("H [hours,] m [minutes] s [seconds]")}\``).join("\n");
        }
    
        let embed = new EmbedBuilder()
        .setTitle(`**Stat List**`)
        .setColor("000000")
        .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 2048}))
        .addFields({name: "🔉 Sesli Stat List", value: `${voiceList}`})
        .addFields({name: "💬 Mesaj Stat List", value: messageList})
        .addFields({name: `Not:`, value: 
    `\`Chat İstatikleri anında güncellenir! 
Ses İstatistikleri sesten çıktıktan sonra güncellenir!\``})
    .setFooter({text:client.user.username ,iconURL: member2.avatarURL({})})
    .setTimestamp();
    
    await interaction.reply({embeds: [embed]});
        }
}
module.exports.conf = {
    event:"interactionCreate",
    name: "stats",
    description:"Sunucu istatistik sıralamasını gösterir",
};