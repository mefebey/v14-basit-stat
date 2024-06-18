const ayarlar = require("../ayarlar.json") 
const fs = require("fs")

module.exports = async (client) => {
let komutlar 
if (client.guilds.cache.get(ayarlar.guildID)) {
  komutlar = client.guilds.cache.get(ayarlar.guildID).commands
} else {
  komutlar = client.application?.commands
}

fs.readdirSync("./SlashCommands", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
  if(ayarlar.slashCommands.toLowerCase() !== "on") return; 
  let prop = require(`../SlashCommands/${file}`);
  if(prop.conf.name2) komutlar?.create({
    name: prop.conf.name,
    description: prop.conf.description, 
    options:[
{
 name: prop.conf.name2,
 description:prop.conf.description2,
 required: prop.conf.required,
 type: prop.conf.type
}
    ]
    }); 
    else 
    komutlar?.create({
      name: prop.conf.name,
      description: prop.conf.description 
      })
    client.on(prop.conf.event, prop);
  console.log(`[SLASH] ${file} Başarıyla Yüklendi!`);
});
};
module.exports.conf = {
  event:"ready"
   };
 