const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require("discord.js");
const Database = require("../Database/index");
const ayarlar = require(`../ayarlar.json`)
const mesaj = new Database("Database", "Mesaj");
const ses = new Database("Database", "Ses");
module.exports = async (interaction) => {
    let client = interaction.client;
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'reset') {
    
        if(!interaction.member.permissions.has("Administrator") && !interaction.member.permissions.has("ManageGuild")) return interaction.reply({content: `${ayarlar.no} Bu komut için \`Sunucuyu_Yönet\` iznine ihtiyacınız var.`, ephemeral: true});

let member2 = client.users.cache.get(interaction.member.id)

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
        .setThumbnail(member2.avatarURL({dynamic: true, size: 2048 }))
        .setFooter({text:client.user.username ,iconURL: member2.avatarURL({})})
        .setTimestamp();
    
    await interaction.reply({embeds: [embed.setDescription(`Sıfırlamak istediğiniz database türünü lütfen aşağıdan seçiniz! 💫
            
        **Not:** \`Database sıfırlandıktan sonra elle yedek alınmadığı takdirde geri döndürülemez!\``)], components:[row]}).then(msg => {
    
    const filter = i => i.user.id === interaction.member.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
    collector.on('collect', async i => {
    if(i.customId === "all") {
        ses.yaz(`stats.${interaction.guild.id}`, {});
        mesaj.yaz(`stats.${interaction.guild.id}`, {});
        await msg.edit({embeds: [embed.setDescription(`Mesaj/Ses İstatistikleri başarıyla sıfırlandı! ${ayarlar.yes}`)], components:[]}).catch()
    }
    if(i.customId === "chat") {
        mesaj.yaz(`stats.${interaction.guild.id}`, {});
        await msg.edit({embeds: [embed.setDescription(`Mesaj İstatistikleri başarıyla sıfırlandı! ${ayarlar.yes}`)], components:[]}).catch()
    }
    if(i.customId === "voice") {
        ses.yaz(`stats.${interaction.guild.id}`, {});
        await msg.edit({embeds: [embed.setDescription(`Ses İstatistikleri başarıyla sıfırlandı! ${ayarlar.yes}`)], components:[]}).catch()
    }
    })
        })
}
}
module.exports.conf = {
    event:"interactionCreate",
    name: "reset",
    description:"Verileri sıfırlar",
};