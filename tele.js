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
              success: "✔️ Berhasil ✔️",
              error: "[❗] Terjadi kesalahan",
              only: {
                      admin: "[❗] Perintah ini hanya bisa digunakan admin!",
                      owner: "[❗] Perintah ini hanya bisa digunakan Owner Bot!"
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
      const isCmd = (cmd, nameuser) => {
           console.log("[",color("EXEC", "lime"), "]", `Command ${color(cmd, "lime")} From ${color(nameuser, "lime")}`)
      }
      let replyMarkup = client.keyboard([
           ['/info', '/menu'],
      ], {resize: true});
      client.on(["/menu","/start"], async (msg, args) => {
        isCmd("/menu", msg.from.username)
        await client.sendPhoto(msg.chat.id, './lib/src/icon.jpeg', {caption: `🤖 MEOW BOT 🤖

◪ Hai ${msg.from.username}!

[] = Itu harus di isi
() = Itu adalah info fitur

◆ FUN MENU

⎔ /neon [teks]
⎔ /sky [teks]

◆ EDUKASI

⎔ /corona

◆ ADMIN MENU
⎔ /delete (replyChatBot)

◆ INFORMASI

⎔ /info
⎔ /owner

◆ SOSIAL MEDA
♡ IG: @meowcraft_
♡ YT: meowcraft
`
})
        return client.sendMessage(msg.chat.id, `Follow sosmed admin Ya!`, {replyMarkup})
     })
     client.on('/info', async (msg, args) => {
        isCmd("/info", msg.from.username)
        client.sendPhoto(msg.chat.id, "./lib/src/icon.jpeg", {caption: "◪ INFO\n\n• BotName: Meow-Bot\n• Owner: @MeowCraftG\n• Prefix: /\n• Status: Soon\n\n⬤ SOSMED\n\n⎔ YT: MeowCraft\n⎔ IG: @meowcraft_", replyToMessage: msg.message_id})
     })
     client.on(/^\/return ([\s\S]+)/, async (msg, args) => {
        isCmd("/return", msg.from.username)
        const isOwner = await owner(msg.from.username)
        if (!isOwner) return msg.reply.text("Khusus Owner!")
        teks1 = msg.text
        teks2 = teks1.replace("/return", "")
        client.sendMessage(msg.chat.id, JSON.stringify(eval(teks2), null,'\t'))
     })
     client.on(/^\/eval ([\s\S]+)/, async (msg, args) => {
        isCmd("/eval", msg.from.username)
        const isOwner = await owner(msg.from.username)
        if (!isOwner) return msg.reply.text("Khusus Owner!")
        teks = msg.text.replace('/eval', '')
        if (!teks) return msg.reply.text("Masukan code javascript!")
        try {
            let evaled = await eval(msg.text.replace('/eval', ""))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        } catch (e) {
            client.sendMessage(msg.chat.id, String(e), {replyToMessage: msg.message_id})
        }
    })
    client.on(/^\/neon ([\s\S]+)/, async (msg, args) => {
        isCmd("/neon", msg.from.username)
        const teks = msg.text.replace('/neon', '')
        result = await axios.get('http://meowo.herokuapp.com/api/v1/textmaker/glowing?teks='+teks+'&apikey='+meowkey)
        client.sendPhoto(msg.chat.id, result.data.result, {caption: mess.success, replyToMessage: msg.message_id})
    })
    client.on(/^\/sky ([\s\S]+)/, async (msg, args) => {
        isCmd("/sky", msg.from.username)
        const teks = msg.text.replace('/sky', '')
        data = await axios.get('http://meowo.herokuapp.com/api/v1/textmaker/shadow?teks='+teks+'&apikey='+meowkey)
        client.sendPhoto(msg.chat.id, data.data.result, {caption: mess.success, replyToMessage: msg.message_id})
    })
    client.on("/delete", async (msg, args) => {
        isCmd("/delete", msg.from.username)
        if (msg.chat.type == "private") return client.sendMessage(msg.chat.id, "[❗] Perintah ini hanya bisa digunakan diluar private chat!", {replyToMessage: msg.message_id})
        if (msg.reply_to_message == undefined) return client.sendMessage(msg.chat.id, "Reply chat bot om", {replyToMessage: msg.message_id})
        if (msg.reply_to_message.from.username == "Meow_Telegram_Bot") {
           client.deleteMessage(msg.chat.id, msg.reply_to_message.message_id)
        } else {
           client.sendMessage(msg.chat.id, "Hanya bisa menghapus pesan dariku", {replyToMessage: msg.message_id})
        }
    })
    client.on('/owner', async (msg, args) => {
        isCmd("/owner", msg.from.username)
        kontak = await client.sendContact(msg.chat.id, "6285772526036", "Owner", "Meow-Bot")
        client.sendMessage(msg.chat.id, "Silahkan Chat Owner @MeowCraftG Jika Menemukan Bug Pada Bot!", {replyToMessage: kontak.message_id})
    })
    client.on('/corona', async (msg, args) => {
        isCmd('/corona', msg.from.username)
        corona = await axios.get("https://api.kawalcorona.com/indonesia")
        client.sendMessage(msg.chat.id, `🏥 COVID-19 INDONESIA 🏥\n\n• Positif: ${corona.data[0].positif}\n• Sembuh: ${corona.data[0].sembuh}\n• Meninggal: ${corona.data[0].meninggal}`, {replyToMessage: msg.message_id})
    })
        
client.start()
}
starts()
