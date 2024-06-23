const { VoiceConnectionStatus , joinVoiceChannel } = require('@discordjs/voice');
const ayarlar = require("../ayarlar.json") 
module.exports = (client) => {
    if(ayarlar.connection.toLowerCase() !== "on") return;
    const channel = client.channels.cache.get(ayarlar.sesKanalı)
    const connection = joinVoiceChannel({
      channelId: ayarlar.sesKanalı,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true
    })
    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('Bot başarıyla sese giriş yaptı!');
    });
  };
  module.exports.conf = {
   event:"ready"
    };