import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connection from './connection'
import createStudent from './endpoints/createStudent'
import createTeacher from './endpoints/createTeacher'
import {createMission} from './endpoints/createMission'
import getAgeStudent from './endpoints/getAgeStudent'
import { getStudentByMission } from './endpoints/getStudentByMission'
import { getTeacherByMission } from './endpoints/getTeacherByMission'
import { deleteStudent } from './endpoints/deleteStudent'
import { getStudentsHobby } from './endpoints/getStudentsHobby'
import { removeStudentFromMission } from './endpoints/removeStudantFromMission'
import { removeTeacherFromMission } from './endpoints/removeTeacherFromMission'
import { updateStudents } from './endpoints/updateStudents'
import { updateTeacher } from './endpoints/updateTeacher'
import { updateMissionStudent } from './endpoints/updateMissionStudent'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.post('/turma', async(
    req:Request, 
    res:Response
    ):Promise<void>=>{
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

app.post('/estudantes', createStudent)
app.post('/docentes', createTeacher)
app.post('/turmas', createMission)
app.get('/estudantes/:id', getAgeStudent)
app.get('/estudantes/turma/:id', getStudentByMission)
app.get('/docentes/turmas/:id', getTeacherByMission)
app.delete('/estudantes/:id', deleteStudent)
app.get('/estudantes/passatempo/:id', getStudentsHobby)
app.put('/estudantes/:id', removeStudentFromMission)
app.put('/docentes/:id', removeTeacherFromMission)
app.put('/estudantes', updateStudents)
app.put('/docentes', updateTeacher)
app.put('/estudantes/turmas', updateMissionStudent)


app.listen(process.env.DB_PORT, ()=>{
    console.log(`Server is running at http://localhost:${process.env.DB_PORT}...`)
})