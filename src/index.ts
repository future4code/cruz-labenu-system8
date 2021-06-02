import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connection from './connection'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.post('/turma', async(req:Request, res:Response):Promise<void>=>{
    try{
        const nome = req.body.nome as string
        let data_inicio = req.body.dataInicio
        let data_final = req.body.dataFinal

        if(!nome){
            throw new Error('Favor inserir um nome válido para a turma.')
        }
        if(!data_inicio){
            throw new Error('Favor inserir uma data de início.')
        }
        if(!data_final){
            throw new Error('Favor inserir uma data de conclusão do curso.')
        }
        if(data_inicio.includes('/')){
            const date_array = data_inicio.split('/')
            data_inicio = `${date_array[2]}-${date_array[1]}-${date_array[0]}`
        }
        if(data_final.includes('/')){
            const date_array = data_final.split('/')
            data_final = `${date_array[2]}-${date_array[1]}-${date_array[0]}`
        }

        await connection.raw(`
        INSERT INTO turmas (nome, data_inicio, data_final)
        VALUES ("${nome}", "${data_inicio}", "${data_final}");
        `)

        res.status(200).send({
            message: `Turma ${nome} criada com sucesso!`
        })
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
})

app.listen(process.env.DB_PORT, ()=>{
    console.log(`Server is running at http://localhost:${process.env.DB_PORT}...`)
})