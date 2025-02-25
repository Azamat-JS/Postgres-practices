import TelegramBot from 'node-telegram-bot-api'
import  TelegramMessage  from '../models/telegram_model'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { Op } from 'sequelize'

dotenv.config()