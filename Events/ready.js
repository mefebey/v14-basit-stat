const ayarlar = require("../ayarlar.json") 
module.exports = (client) => {
    console.log(`Bütün komutlar başarıyla yüklendi!`);
    client.user.setStatus("online");
    var oyun = ayarlar.durum
        setInterval(function() {
        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
        client.user.setActivity(oyun[random]);
        }, 2 * 2500);
  };
  module.exports.conf = {
   event:"ready"
    };
  