# Basit Stat v14

Kişisel Ses ve Mesaj İstatistiğini gösterme, Sunucudaki sıralamanızı gösterme ve bu Verileri sıfırlama özelliğine sahip v14 Basit Stat Botu'dur.

Altyapı Mefebey tarafından geliştirilmiştir. İzinsiz paylaşılması veya çoğaltılması yasaktır.

[Mefebey](https://www.youtube.com/c/MefeBey)

[KayraPlus](https://www.youtube.com/channel/UC5-zHRDDmea147whRcdlhew)

[Destek Sunucusu](https://discord.gg/Gb7m2sY34X)

# Kurulum

Kurulumu yapmak için powershell penceresine veya Visual Studio Code üzerinden terminale girerek aşağıdaki kodu yazmanız yeterlidir.
```javascript
npm i
```

Not: Botu kullanmak için en düşük node.js v18'i bilgisayarınıza kurmanız gerekmektedir.
Node 16 veya 17 varsa discord.js sürümünü 14.10.2 yapınız.

Botu açmak için baslat.bat dosyasını açmanız yeterlidir ya da aynı şekilde terminal veya powershell penceresine aşağıadki kodu yazınız.
```javascript
node .
```

Ayarlar.json'u tam olarak doldurun.
```javascript
.prefix : "Botunuzun komutlarını kullanırken kullanmak istediğiniz ön ek",
.guildID : "Botu kullanacağınız ana sunucunun ID'si",
.sesKanalı : "Botunuzun giriş yapacağı ses kanalının ID'si (connection ayarı kapalı ise gerek yoktur)",
.sahip : "Botun sahibinin ID'si",
.token : "Botunuzun tokeni",
.cooldown : "Botunuzun yavaş mod sistemini ayarlarsınız. (Saniye cinsinden yazın ve kapatmak için 0 yapın)",
.connection : "Botunuzun sese bağlanıp bağlanmayacağını ayarlarsınız. (Açmak için on, Kapatmak için off yapın)",
.prefixCommands : "Mesaj atarak prefix(ön ek) ile çalışan sistemi ayarlarsınız. (Açmak için on, Kapatmak için off yapın)",
.slashCommands : "Komut atarak slash(/) ile çalışan sistemi ayarlarsınız. (Açmak için on, Kapatmak için off yapın)",
.durum : "Komut atarak slash(/) ile çalışan sistemi ayarlarsınız. (Açmak için on, Kapatmak için off yapın)",
.no: "Botunuzun durumunda yazmasını istediğiniz yazıları giriniz.",
.yes: "Tik Emojisi (<a:EmojiAdı:EmojiId> şeklinde yazınız. Ör:(<a:yes:12345678901234>))"
```

NOT: Eğer botu davet ederken davet linkine Application Commands eklemezseniz, Slash Komutlar çalışmayacaktır!
Botunuzun Slash Komutları gelmiyorsa lütfen Discord'u yenileyin veya açıp kapatın!(Ctrl + R)

# Kullanım
Botun komutların kullanımı aşağıdaki gibidir.

```javascript
.me : "Sizin veya etiketlediğiniz kişinin istatistiklerine bakarsınız",
.chat : "Sizin veya etiketlediğiniz kişinin mesaj istatistiklerine bakarsınız",
.ses : "Sizin veya etiketlediğiniz kişinin ses istatistiklerine bakarsınız",
.top : "Sunucudaki sıralamaya bakarsınız",
.sıfırla : "Sunucudaki sesli veya mesaj istatistiklerini sıfırlarsınız"
```

# Destek ve katkıda bulunma
Destek için veya bota katkıda bulunmak için yukarıdaki destek sunucusu linkinden bize ulaşın!

# Lisans
[MIT](https://github.com/mefebey/v14-basit-stat/blob/main/LICENSE)