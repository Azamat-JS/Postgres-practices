const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')

app.use(cors({
    credentials: true,
    origin: "*"
}))
app.use(express.json())
const productRouter = require('./routes/product.routes')


app.use(productRouter)
app.listen(4009, () => {
    console.log('http://localhost:4009');
})