const { color, bgcolor } = require('./lib/func/color')
const setting = require('./config.json')
const { getBuffer, banner} = require('./lib/func/functions.js')

const Telebot = require('telebot')
const axios = require('axios')
const fs = require('fs')
const yargs = require('yargs/yargs')
const { token, meowkey } = setting

async function starts() {
     console.log(banner.string)
     console.log(color("[SERVER]", "orange"), color("Server Started!"))
     const client = new Telebot({token: token})
     client.on('newChatMembers', async (d) => {
        try {
              console.log(d)
              teks = `Hai Member Baru Selamat Datang Di ${d.chat.title}\nSemoga betah yak><`
              client.sendMessage(d.chat.id, teks)
        } catch (e) {
              console.log("Error :", color(e, 'red'))
        }
     })

     mess = {
              success: "✔️ Suksess ✔️"
              error: "[❗] Terjadi Kesalahan"
              only: {
                      owner: "[❗] Perintah ini hanya bisa digunakan Owner-Bot!"
              }
     }

     ownerUsername = "MeowCraftG"
     const owner = async(name) => {
           if (name == ownerUsername) {
             return true
           } else {
             return false
           }
      }
      let replyMarkup = client.keyboard([
           ['/info', '/menu'],
      ], {resize: true});
      client.on(["/menu","/start"], async (msg, args) => {
        await client.sendPhoto(msg.chat.id, './lib/src/icon.jpeg', {caption: `🤖 MEOW BOT 🤖

◪ Hai ${msg.from.username}!

⎔ /info
⎔ /neon [teks]
⎔ /sky [teks]

◆ SOSIAL MEDA
♡ IG: @meowcraft_
♡ YT: meowcraft
`
})
        return client.sendMessage(msg.chat.id, `Follow sosmed admin Ya!`, {replyMarkup})
     })
     client.on('/info', async (msg, args) => {
        client.sendPhoto(msg.chat.id, "./lib/src/icon.jpeg", {caption: "◪ INFO\n\n• BotName: Meow-Bot\n• Owner: @MeowCraftG\n• Prefix: /\nStatus: Soon\n\n⬤ SOSMED\n\n⎔ YT: MeowCraft\n⎔ IG: @meowcraft_"})
     })
     client.on(/^\/return ([\s\S]+)/, async (msg, args) => {
        const isOwner = await owner(msg.from.username)
        if (!isOwner) return msg.reply.text("Khusus Owner!")
        teks1 = msg.text
        teks2 = teks1.replace("/return", "")
        client.sendMessage(msg.chat.id, JSON.stringify(eval(teks2), null,'\t'))
     })
     client.on(/^\/eval ([\s\S]+)/, async (msg, args) => {
        const isOwner = await owner(msg.from.username)
        if (!isOwner) return msg.reply.text("Khusus Owner!")
        teks = msg.text.replace('/eval', '')
        if (!teks) return msg.reply.text("Masukan code javascript!")
        try {
            let evaled = await eval(msg.text.replace('/eval', ""))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        } catch (e) {
            msg.reply.text(String(e))
        }
    })
    client.on(/^\/neon ([\s\S]+)/, async (msg, args) => {
        const teks = msg.text.replace('/neon', '')
        data = await axios.get('http://meowo.herokuapp.com/api/v1/textmaker/glowing?teks='+teks+'&apikey='+meowkey)
        client.sendPhoto(msg.chat.id, data.data.result, {caption: mess.success})
    })
    client.on((/^\/sky ([\s\S]+)/, async (msg, args) => {
        const teks = msg.text.replace('/sky', '')
        data = await axios.get('http://meowo.herokuapp.com/api/v1/textmaker/shadow?teks='+teks+'&apikey=+'meowkey)
        client.sendPhoto(msg.chat.id, data.data.result, {caption: Ness.success})
    })
        
client.start()
}
starts()
