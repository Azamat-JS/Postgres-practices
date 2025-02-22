import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

let token = process.env.DB_TOKEN

let bot = new TelegramBot(token as string, {polling:true})

bot.onText(/\/start/, (msg) => {
   console.log(msg);
   
})