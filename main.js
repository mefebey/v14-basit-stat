const Discord = require("discord.js")
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ 
intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMessageReactions,
],
partials: [
  Partials.Channel, // for text channel
  Partials.GuildMember, // for guild member
  Partials.User, // for discord user
]
});
const ayarlar=require("./ayarlar.json");
require('./Util/Loader.js')(client)
const express = require('express');
const app = express()
app.get('/', (req, res) => res.send("Bot Aktif"))

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = -ayarlar.varsayilanperm  ;
  if(!message.member.permissions.has("ManageMessages")) permlvl = 1;
  if(!message.member.permissions.has("KickMembers")) permlvl = 2;
  if(!message.member.permissions.has("BanMembers")) permlvl = 3;
  if(!message.member.permissions.has("ManageGuild")) permlvl = 4;
  if(!message.member.permissions.has("Administrator")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

client.login(ayarlar.token).catch(err => (console.error(`Bot giriş yapamadı, sebep: ${err}`)))