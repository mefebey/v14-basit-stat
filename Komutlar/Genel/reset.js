const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const Database = require("../../Database/index");
const ayarlar = require(`../../ayarlar.json`)
const mesaj = new Database("Database", "Mesaj");
const ses = new Database("Database", "Ses");

exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("Administrator") && !message.member.permissions.has("ManageGuild")) return message.reply(`${ayarlar.no} Bu komut için \`Sunucuyu_Yönet\` iznine ihtiyacınız var.`);

    const row = new ActionRowBuilder()
    .addComponents(
       
           new ButtonBuilder()
           .setCustomId('all')
           .setLabel('Hepsi')
           .setStyle('Danger')
           .setEmoji("🗑️"),

            new ButtonBuilder()
            .setCustomId('chat')
            .setLabel('Chat Stat')
            .setStyle('Danger')
            .setEmoji("🗑️"),
    
            new ButtonBuilder()
            .setCustomId('voice')
            .setLabel('Ses Stat')
            .setStyle('Danger')
            .setEmoji("🗑️"),
    )

    const embed = new EmbedBuilder()
    .setTitle(`**Database Sıfırlama** 🗑️`)
    .setColor("000000")
    .setThumbnail(message.author.avatarURL({dynamic: true, size: 2048 }))
    .setFooter({text:client.user.username ,iconURL: message.author.avatarURL({})})
    .setTimestamp();

await message.channel.send({embeds: [embed.setDescription(`Sıfırlamak istediğiniz database türünü lütfen aşağıdan seçiniz! 💫
        
    **Not:** \`Database sıfırlandıktan sonra elle yedek alınmadığı takdirde geri döndürülemez!\``)], components:[row]}).then(msg => {

const filter = i => i.user.id === message.author.id;
const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
collector.on('collect', async i => {
if(i.customId === "all") {
    ses.yaz(`stats.${message.guild.id}`, {});
    mesaj.yaz(`stats.${message.guild.id}`, {});
    await msg.edit({embeds: [embed.setDescription(`Mesaj/Ses İstatistikleri başarıyla sıfırlandı! ${ayarlar.yes}`)], components:[]}).catch()
}
if(i.customId === "chat") {
    mesaj.yaz(`stats.${message.guild.id}`, {});
    await msg.edit({embeds: [embed.setDescription(`Mesaj İstatistikleri başarıyla sıfırlandı! ${ayarlar.yes}`)], components:[]}).catch()
}
if(i.customId === "voice") {
    ses.yaz(`stats.${message.guild.id}`, {});
    await msg.edit({embeds: [embed.setDescription(`Ses İstatistikleri başarıyla sıfırlandı! ${ayarlar.yes}`)], components:[]}).catch()
}
})
    })
};

exports.conf = {
    aliases: ["reset", "resetstat", "resetstats"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'sıfırla', 
    description: 'Sunucudaki aktifliğiniz hakkında bilgi verir.',
    usage: 'reset',
    kategori: 'kullanıcı'
};

