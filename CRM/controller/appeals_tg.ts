import TelegramBot from 'node-telegram-bot-api'
import TelegramAppeals from '../models/telegram_appeals'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { Op } from 'sequelize'


dotenv.config()
const tokenAppeal = process.env.DB_APPEALS_TOKEN

TelegramAppeals.sync({force:false})


if(!tokenAppeal){
   throw new Error("telegram bot token not found")
}

let bot = new TelegramBot(tokenAppeal as string, {polling:true})


bot.onText(/\/start/, (msg) => {
   const chatId:number = msg.chat.id;
   bot.sendMessage(chatId, `Assalamu alaykum ${msg.from?.first_name}, siz CRM ta'lim botiga murojaat qildingiz`);
 });

 bot.onText(/\/info/, (msg) => {
   const chatId:number = msg.chat.id;
   bot.sendMessage(chatId, 'Bu bot CRM saytiga murojaatlar qoldirish uchun yaratilgan')
 })
 
 bot.on('message', async (msg) => {
   const chatId = msg.chat.id;

     let regex: RegExp = /^[a-zA-Z0-9!@#$%^&*()_+-{}~`, ."':;?//\|]*$/
 
   try {
     if (typeof msg.text !== 'string' || !regex.test(msg.text)) {
       return bot.sendMessage(chatId, 'Faqatgina matn kiriting');
     }else if(msg.text && !msg.text.startsWith('/')){
        bot.sendMessage(chatId, 'Murojaatingiz yetkazildi');
     }
    
     await TelegramAppeals.create({
       username: msg.from?.username || 'Unknown',
       message: msg.text,
     });
 
   } catch (err) {
     console.error('Error saving message:', err);
     bot.sendMessage(chatId, 'Xatolik yuz berdi!');
   }
 });



 export const getMessage = async (req: Request, res: Response): Promise<Response | void> => {
   try {
     let startOfDay = new Date();
     startOfDay.setUTCHours(0, 0, 0, 0);
 
     let message = await TelegramAppeals.findAll({
       where: { createdAt: { [Op.gte]: startOfDay } }
     });
 
     return res.status(200).json(message);
   } catch (error) {
     console.error('Error fetching messages:', error);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
 };

 export const getNextTenDaysMessages = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const startOfDay = new Date(); // Start from today
      const endOfDay = new Date();
      endOfDay.setDate(startOfDay.getDate() + 10); // 10 days from today
  
      const messages = await TelegramAppeals.findAll({
        where: {
          createdAt: {
            [Op.between]: [startOfDay, endOfDay], // Fetch messages between today and 10 days ahead
          },
        },
      });
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export const getLastTenDaysMessages = async(req:Request, res:Response):Promise<Response | void> => {
   try {
      let startOfDay = new Date()
      startOfDay.setDate(startOfDay.getDate() - 10)

      let messages = await TelegramAppeals.findAll({
         where: {createdAt: {[Op.gte]: startOfDay}}
      })
      return res.status(200).json(messages)
   } catch (error) {
      console.log(error);
      
   }
}