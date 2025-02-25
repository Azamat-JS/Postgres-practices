import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import axios from 'axios'
import express from 'express'
dotenv.config()

const app = express()

const tokenCurrency = process.env.TOKEN_TELEGRAM

let bot = new TelegramBot(tokenCurrency as string, {polling:true})

const fetchExchangeRate = async () => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
        console.log('Exchange Rate Response:', response.data);

        
        return response.data.rates.UZS;
    } catch (error) {
        console.error('Error fetching exchange rate: ', error);
        return null
    }
}

bot.onText(/\/start/, (msg)=>{
   const chatId:number = msg.chat.id;
   bot.sendMessage(chatId, 'Welcome! Send me an amount like "$100" to convert it to UZS.')
})
bot.onText(/\/info/, (msg)=>{
   const chatId:number = msg.chat.id;
   bot.sendMessage(chatId, 'In this bot you can get info about currency exchanging')
})

bot.onText(/\$?(\d+(\.\d+)?)/, async (msg, match) => {
    const chatId: number = msg.chat.id;
    const amount = parseFloat(match?.[1] ?? '0');
    const rate = await fetchExchangeRate();
  
    if (rate) {
      const converted = amount * rate;
      bot.sendMessage(chatId, `$${amount} = ${converted.toLocaleString('en-US')} soum`);
    } else {
      bot.sendMessage(chatId, 'Sorry, I could not fetch the exchange rate. Please try again later.');
    }
  });
  

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('server is running on port: ' + port);
})