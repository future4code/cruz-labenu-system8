import { Request, Response } from 'express'
import connection from '../connection'

export default async function createTeacher ( 
    req: Request, res: Response 

    ):Promise<void> {
        const result = await connection
        .insert({
            nome: req.body.nome,  
            email: req.body.email, 
            data_nascimento: req.body.data_nascimento, 
            turma_id: req.body.turma_id
        })
        .into('docentes')
        res.status(200)
            .send('Professor(a) criado(a) com Sucesso!')

    }