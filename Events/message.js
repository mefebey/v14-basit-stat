const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
module.exports = async (message) => {
  let client = message.client;
  if (message.author.bot) return;
 let prefix = ayarlar.prefix
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
try {    
  if (talkedRecently.has(message.author.id)) {
    return await message.channel.send(`${ayarlar.no} Bu komutu kullanabilmek için \`${ayarlar.cooldown}\` saniye beklemelisin.`).catch();
} else {
  await cmd.run(client, message, params, perms);
  talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, ayarlar.cooldown*1000);
}
} catch(error) {
  return await message.channel.send(`${ayarlar.no} Hata tespit edildi! Lütfen destek sunucusuna hata kodu ile ulaşınız! \n **Hata kodu**: \`${error}\``).catch().then(console.log(error))
}
}
};
module.exports.conf = {
  event:"messageCreate"
   };