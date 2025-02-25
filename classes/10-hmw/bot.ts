import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
dotenv.config()

const tokenAppeal = process.env.TOKEN_TELEGRAM

let bot = new TelegramBot(tokenAppeal as string, {polling:true})

bot.onText(/\/start/, (msg)=>{
   
})