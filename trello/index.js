const express = require('express')
require('dotenv').config()
require("express-async-errors")
const app = express()
const cors = require('cors')
const taskRouter = require('./routes/task.routes')
const userRouter = require('./routes/user.routes')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())

// Routes
app.use(taskRouter)
app.use(userRouter)
// Error handler
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

// server running
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('server is running on http://localhost:'+port);
    
})