import "express-async-errors"
import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import studentRouter from "./routes/student_rt"
import groupRouter from "./routes/group_rt"
import paymentRouter from './routes/payment_rt'
import mainRouter from "./routes/main_rt"
import TelegramBot from 'node-telegram-bot-api'

dotenv.config()
const app = express()
app.use(cors({credentials:true, origin:"*"}))
app.use(express.json())
dotenv.config()



let token = process.env.DB_TOKEN

let bot = new TelegramBot(token as string, {polling:true})

bot.onText(/\/start/, (msg) => {
 const chatId = msg.chat.id
 bot.sendMessage(chatId, `Assalamu alaykum ${msg.chat.first_name} CRM xabarlar botiga xush kelibsiz!`)
})

bot.on('message', (msg) => {
    const chatId = msg.chat.id
    if(!msg.text?.startsWith('/')){
        bot.sendMessage(chatId, 'Murojaatingiz qabul qilindi!')
    }
})

app.use('/api/students', studentRouter);
app.use('/api/groups', groupRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/main', mainRouter);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
 console.log('http://localhost:' + PORT);
 
})