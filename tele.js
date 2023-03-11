const { color, bgcolor } = require('./lib/func/color')
const setting = require('./config.json')
const { getBuffer, banner} = require('./lib/func/functions.js')

const Telebot = require('telebot')
const { Configuration, OpenAIApi } = require('openai')
const axios = require('axios')
const fs = require('fs')
const yargs = require('yargs/yargs')

const { token, openai_key } = setting
const configuration = new Configuration({apiKey: "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"})
const openai = new OpenAIApi(configuration)


     console.log(banner.string)
     console.log(color("[SERVER]", "orange"), color("Server Started!"))
     const client = new Telebot({token: token})
     const isCmd = (cmd, nameuser) => {
          console.log("[",color("EXEC", "lime"), "]", `Command ${color(cmd, "lime")} From ${color(nameuser, "lime")}`)
     }
     let replyMarkup = client.keyboard([
          ['/info', '/menu','/owner'],
     ], {resize: true});

     client.on(['/start','/help'], async (msg) => {
         msg.reply.text("Hi, I'am Meow Assistant\n\nCan i help you?");
     })

     client.on('text', async (msg) => {
         if (msg.text.startsWith('/start')) return
         chatgpt = await openai.createChatCompletion({model:'gpt-3.5-turbo',messages: [{role:'user',content: msg.text}]})
         client.sendMessage(msg.chat.id,chatgpt.data.choices[0].message.content, {replyToMessage: msg.message_id})
     })

client.start()
