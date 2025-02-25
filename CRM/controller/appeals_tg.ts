import TelegramBot from 'node-telegram-bot-api'
import TelegramAppeals from '../models/telegram_appeals'
import { Group } from '../models/group_model'
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
 
 bot.onText(/\/groups/, async (msg) => {
  const chatId:number = msg.chat.id;
  const groups = await Group.findAll();
  const dataGroup = JSON.stringify(groups)
  bot.sendMessage(chatId, `Barcha guruhlar ro'yhati: ${dataGroup}`)
 })


 export const getAppeal = async (req: Request, res: Response): Promise<Response | void> => {
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

 export const getNextTenDaysAppeals = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const startOfDay = new Date();
      const endOfDay = new Date();
      endOfDay.setDate(startOfDay.getDate() + 10); 
  
      const messages = await TelegramAppeals.findAll({
        where: {
          createdAt: {
            [Op.between]: [startOfDay, endOfDay], 
          },
        },
      });
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export const getLastTenDaysAppeals = async(req:Request, res:Response):Promise<Response | void> => {
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