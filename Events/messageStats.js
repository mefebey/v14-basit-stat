const Discord = require("discord.js");
const Database = require("../Database/index");
const mesaj = new Database("Database", "Mesaj");
const ayarlar = require('../ayarlar.json');
/**
 * @param {Discord.Message} message
 */
module.exports = async (message) => {
    if(message.author.bot || message.content.startsWith(ayarlar.prefix)) return;

    mesaj.topla(`stats.${message.guild.id}.${message.guild.id}.${message.author.id}.channels.${message.channel.id}`, 1);
    mesaj.yaz(`stats.${message.guild.id}.${message.guild.id}.${message.author.id}.activity`, Date.now());
};

module.exports.conf = {
    event: "messageCreate"
};
