const { color, bgcolor } = require('./lib/func/color')
const setting = require('./config.json')
const { getBuffer, banner} = require('./lib/func/functions.js')

const Telebot = require('telebot')
const axios = require('axios')
const fs = require('fs')
const { token, meowkey } = setting

async function starts() {
     const PORT = process.env.PORT || 3000
     global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

     if (opts['server']) {
     let express = require('express')
     global.app = express()
     app.all('*', async (req, res) => {
       await global.conn.connect().catch(console.log)
       res.end(await qrcode.toBuffer(global.qr))
     })
     app.listen(PORT, () => console.log('App listened on port', PORT))
}
     console.log(banner.string)
     console.log(color("[SERVER]", "orange"), color("Server Started!"))
     const client = new Telebot({token: token})
     
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
⎔ /coming

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
        
client.start()
}
starts()
