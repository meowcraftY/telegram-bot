const { color, bgcolor } = require('./lib/func/color')
const setting = require('./config.json')
const { getBuffer, banner} = require('./lib/func/functions.js')

const Telebot = require('telebot')
const axios = require('axios')
const { token, meowkey } = setting

async function stars() {
     console.log(banner.string)
     console.log(color("[SERVER]", "orange"), color("Server Started!"))
     const client = new Telebot({token: token})
     const isCmd = 
     client.on(["/menu","/start"], async (msg, args) => {
        let replyMarkup = client.keyboard([
        ['/info', '/menu'],
    ], {resize: true});
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
     client.on(/^\/ytmp4 ([\s\S]+)/, async (msg, args) => {
        url = args.match[0]
        result = await axios.get("https://meowo.herokuapp.com/api/v1/ytmp3?url="+url+"&apikey="+meowkey)
        
        
client.start()
}
stars()
