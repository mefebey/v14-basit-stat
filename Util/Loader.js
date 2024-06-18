const fs = require('fs');
const ayarlar = require(`../ayarlar.json`)
module.exports = client => {
  fs.readdirSync("./Events", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`../Events/${file}`);
    client.on(prop.conf.event, prop);
    console.log(`[EVENT] ${file} Başarıyla Yüklendi!`);
  });
  

fs.readdir('././Komutlar/', (err, files) => {
  if(ayarlar.prefixCommands.toLowerCase() !== "on") return; 
  if (err) console.error(err);
  files.forEach(f => {
    fs.readdir("././Komutlar/" + f, (err2, files2) => {
      if (err2) console.log(err2)
      files2.filter(file => file.endsWith(".js")).forEach(file => {
    let props = require(`../Komutlar/${f}/` + file);
    console.log(`[COMMAND] ${file} Başarıyla Yüklendi!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
   });
  });
 });
});
};