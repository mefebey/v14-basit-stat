const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Database = require("../Database/index");
const ayarlar = require(`../ayarlar.json`)
const mesaj = new Database("Database", "Mesaj");
module.exports = async (interaction) => {
    let client = interaction.client;
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'chat-stat') {
    
        const num = interaction.options.getUser("kullanıcı")
    let member;
    if(!num) member = interaction.guild.members.cache.get(interaction.member.id)
    else member = interaction.guild.members.cache.get(num.id)

    let member2;
    if(!num) member2 = client.users.cache.get(interaction.member.id)
    else member2 = client.users.cache.get(num.id)

    if(member2.bot) return interaction.reply({content: `${ayarlar.no} Botların istatistiği tutulmamaktadır.`, ephemeral: true})

    let messageData = mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`) || {messages: 0, channels: {}};

    let messageList;
    if(mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);
    else messageList = "**Veri Bulunamadı!**"

   if(mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
   if(mesaj.bul(`stats.${interaction.guild.id}.${interaction.guild.id}.${member.id}`)) messageList = messageList.map((md, index)=> `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");

    let rolemap = member.roles.cache
    .filter((roles) => roles.id !== interaction.guild.id)
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

await interaction.reply({embeds: [embed3]})
  

    }

}
module.exports.conf = {
    event:"interactionCreate",
    name: "chat-stat",
    description:"Hakkınızda sohbet istatistiğini gösterir",
        name2: "kullanıcı",
        description2:"Bir kullanıcı belirtin",
        required: false,
        type: ApplicationCommandOptionType.User
};