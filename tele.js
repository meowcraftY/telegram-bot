const { color, bgcolor } = require('./lib/func/color')
const setting = require('./config.json')
const { menu } = require('./lib/src/help')
const { getBuffer, banner} = require('./lib/func/buffer')

const Telebot = require('telebot')
const axios = require('axios')
const { token, meowkey } = setting

async function stars() {
     console.log(banner.string)
     console.log(color("[SERVER]", "orange"), color("Server Started!"))
     const client = new Telebot({token: token})
     
     bot.on(["/start","/menu"], async (msg, args) => {
        var kybd = client.keyboard([
            ["/menu","/info"],
        ], {resize: true})
        await client.sendPhoto(msg.chat.id, './lib/src/icon.jpeg', {caption: `🤖 MEOW BOT 🤖

◪ Hai ${msg.from.username}!

⎔ /info
⎔ /coming

◆ SOSIAL MEDA
♡ IG: @meowcraft_
♡ YT: meowcraft
`
})
       return client.sendMessage(msg.chat.id, `Follow sosmed admin Ya!`, {kybd})
     })
}
stars()
