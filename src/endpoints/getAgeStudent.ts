import { Request, Response } from 'express'
import connection from '../connection';

export default async function getAgeStudent( 
    req: Request,
    res: Response
): Promise<void> {
    let errorCode: number = 400;
    try {
        if (isNaN(Number(req.params.id))) {
            errorCode = 422;
            throw new Error("Id inválido")
        }

        const day = await connection.raw(`
            SELECT nome, DATEDIFF(
                CURDATE(),
                data_nascimento 
            ) AS difference FROM estudantes WHERE id = ${Number(req.params.id)};     
                         
        `)
        console.log(day)
        const years = day[0][0].difference/365
        const age = years.toFixed(0)

        res.status(200)
            .send({
                name: day[0][0].nome,
                age
            })
    }

    catch(error){
        res.status(400)
            .send(error.message)
    }




}



