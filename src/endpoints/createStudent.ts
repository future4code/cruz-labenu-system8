import { Request, Response } from 'express'
import connection from '../connection'

export default async function createStudent ( 
    req: Request, res: Response 

    ):Promise<void> {
        const result = await connection
        .insert({
            nome: req.body.nome,  
            email: req.body.email, 
            data_nascimento: req.body.data_nascimento, 
            turma_id: req.body.turma_id
        })
        .into('estudantes')
        res.status(200)
            .send('Estudante criado com Sucesso!')

    }

