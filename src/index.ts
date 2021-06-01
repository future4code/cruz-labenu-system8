import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connection from './connection'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())



app.listen(process.env.DB_PORT, ()=>{
    console.log(`Server is running at http://localhost:${process.env.DB_PORT}...`)
})