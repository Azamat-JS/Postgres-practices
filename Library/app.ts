import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/schema'

const app = express()

app.use(express.json())
app.use(cors({credentials:true, origin: '*'}))

app.use('/library', graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV === 'project'
}));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}/library`);
    
})