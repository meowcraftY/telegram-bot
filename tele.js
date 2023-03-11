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

     client.on(['/start','/help','/menu'], async (msg) => {
         return msg.reply.text("Hi, I'am Meow Assistant 👋\n\nThis is a list of available commands:\n• Type anything to talk to the chat bot or ask something like theoretical physics, history, etc. (like chatgpt)\n• /genimg - Generate image from text, example: /genimg beautiful sunset\n\nNote: these bots have limited knowledge about the world and events after 2021 and may sometimes generate incorrect information.", { asReply: true })
     })

     client.on('text', async (msg) => {
         if (msg.text.startsWith('/start') || msg.text.startsWith('/help') || msg.text.startsWith('/menu') || msg.text.startsWith('/genimg')) return
         chatgpt = await openai.createChatCompletion({model:'gpt-3.5-turbo',messages: [{role:'user',content: msg.text}]})
         return client.sendMessage(msg.chat.id,chatgpt.data.choices[0].message.content, {replyToMessage: msg.message_id})
     })

     client.on(['/genimg'], async (msg) => {
         img_prompt = msg.text.replace('/genimg', '')
         if (img_prompt == "" || img_prompt == undefined) return msg.reply.text('No query found on your request, please check /menu again', { asReply: true })
         msg.reply.text('Processing your request, please wait.', { asReply: true })
         generate_img = await openai.createImage({prompt: img_prompt, n: 1, size: '1024x1024'})
         return msg.reply.photo(generate_img.data.data[0].url, { asReply: true })
     })

client.start()
