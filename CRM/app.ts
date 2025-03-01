import "express-async-errors"
import express, { RequestHandler } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import studentRouter from "./routes/student_rt"
import groupRouter from "./routes/group_rt"
import paymentRouter from './routes/payment_rt'
import messageRouter from "./routes/messages_rt"
import appealRouter from "./routes/tgAppeals_rt"

dotenv.config()
const app = express()
app.use(cors({credentials:true, origin:"*"}))
app.use(express.json())
dotenv.config()


app.use('/api/students', studentRouter);
app.use('/api/groups', groupRouter);
app.use('/api/payments', paymentRouter);
app.use(messageRouter)
app.use(appealRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
 console.log('http://localhost:' + PORT);
 
})