const fs = require('fs')

class DB {

    constructor(lokasyon = "Database", isim = "All"){
        if(lokasyon == "Database" && !fs.existsSync(`${__dirname}/Database`))
        {
            fs.mkdirSync(`${__dirname}/Database`, {recursive: true});
        }
        else if(!fs.existsSync(`${lokasyon}`))
            {fs.mkdirSync(`${__dirname}/${lokasyon}`, {recursive: true});}
        let dosyaLokasyon = `${__dirname}/${lokasyon}/${isim}.json`;
        if(!fs.existsSync(dosyaLokasyon))
            fs.closeSync(fs.openSync(dosyaLokasyon, 'w'));
        this.DosyaLokasyon = dosyaLokasyon;
        this.Lokasyon = lokasyon;
    }  

    /*
    yaz => set
    db.set('prefix', '!')
    <DB>.yaz('prefix', '!')
    */

    yaz(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz")
        if (!değer) throw new TypeError("Değer Girmediniz")
        let dosya = this.kontrol();
        if(!dosya) dosya = {};
        dosya = _yaz(veri, değer, dosya);
        fs.truncateSync(this.DosyaLokasyon);
        fs.writeFileSync(this.DosyaLokasyon, JSON.stringify(dosya), {encoding: "utf-8"});
        return dosya;
    }

    /*
    bul => fetch/get
    db.fetch('prefix')
    <DB>.bul('prefix')
    */

    bul(veri){
        if (!veri) throw new TypeError("Veri Girmediniz")
        let dosya = this.kontrol(), sonuc = undefined
        if(!dosya) dosya = {};
        sonuc = _bul(veri, dosya);
        return sonuc ? sonuc : undefined;
    }

    /*
    kontrol => has
    db.has('prefix')
    <DB>.kontrol('prefix')
    */

    kontrol(){       
        const dosya = fs.readFileSync(this.DosyaLokasyon, {encoding: 'utf8'})
        if(!dosya || (dosya && dosya == null)) return {};
        let obj = JSON.parse(dosya);
        return obj;
    }

    /*
    sil => delete
    db.delete('prefix')
    <DB>.sil('prefix')
    */

    sil(veri){
        if (!veri) throw new TypeError("Veri Girmediniz")
        const dosya = JSON.parse(fs.readFileSync(this.DosyaLokasyon, 'utf8'))
        if (!dosya[veri]) return;
        delete dosya[veri]
        return fs.writeFileSync(this.DosyaLokasyon, JSON.stringify(dosya, null, 2))
    }

    /*
    yedekle => backup
    db.backup('veri.json')
    <DB>.yedekle('veri')
    */

    yedekle(dosyaAdı){
        if (!dosyaAdı) throw new TypeError("Dosya Adı Girmediniz")
        const dosya = JSON.parse(fs.readFileSync(this.DosyaLokasyon, 'utf8'))
        return fs.writeFileSync(`${dosyaAdı}.json`, JSON.stringify(dosya, null, 2))
    }

    /*
    topla => add
    db.add('puan', 5)
    <DB>.topla('puan', 5)
    */

    topla(veri, değer){
        let dosya = this.bul(veri)
        if(typeof dosya == "number") dosya += Number(değer);
        else dosya = Number(değer);
        return this.yaz(veri, dosya);
    }

    /*
    çıkar => substr
    db.substr('puan', 5)
    <DB>.çıkar('puan, 5)
    */

    çıkar(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz")
        if (typeof değer !== 'number') throw new TypeError("Değer olarak lütfen bir sayı giriniz.")
        if (!this.kontrol(veri)) throw new TypeError("Veri olarak girdiğiniz değer veritabanında bulunmamaktadır.")
        if (typeof veri !== 'number') throw new TypeError('Sayı Ekleyeceğiniz Değer bir sayı olmalı.')
        const dosya = JSON.parse(fs.readFileSync(this.DosyaLokasyon, 'utf8'))
        dosya[veri] -= değer
        return fs.writeFileSync(this.DosyaLokasyon, JSON.stringify(dosya, null, 2))
    }

    /*
    sıfırla => -
    db.sıfırla()
    */

    sıfırla(){
        const dosya = JSON.parse(fs.readFileSync(this.DosyaLokasyon, 'utf8'))
        return fs.writeFileSync(this.DosyaLokasyon, JSON.stringify({}, null, 2))
    }

    

}

function _yaz(veri, değer, obj = undefined){
    if(obj == undefined) return undefined;
    let lokasyonlar = veri.split("."), cikis = {};
    cikis = obj;
    let ref = cikis;
    for (let index = 0; index < lokasyonlar.length - 1; index++) {
        if(!ref[lokasyonlar[index]])
            ref = ref[lokasyonlar[index]] = {};
        else
            ref = ref[lokasyonlar[index]];
    }
    ref[lokasyonlar[lokasyonlar.length - 1]] = değer;
    return cikis;
}

function _bul(veri, obj = {}){
    let lokasyonlar = veri.split("."), ref = obj;
    for (let index = 0; index < lokasyonlar.length - 1; index++) {
        ref = ref[lokasyonlar[index]] ? ref[lokasyonlar[index]] : undefined;
        if(!ref) return undefined;
    }
    let cikis = ref[lokasyonlar[lokasyonlar.length - 1]];
    return cikis;
}

module.exports = DB
