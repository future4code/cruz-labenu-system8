import { Request, Response } from "express";
import addTeacher from '../data/addTeacher'
import getMission from "../data/getMission";
import getTeacher from "../data/getTeacher";

export const updateTeacher = async(
    req: Request,
    res: Response
    ): Promise<any> =>{
   let errorCode: number = 400;
   try {
      if(!req.body.id || !req.body.turma_id){
         errorCode = 422;
         throw new Error("Preencha todos os campos e tente novamente.")
      }

      if(isNaN(Number(req.body.turma_id)) || isNaN(Number(req.body.id))) {
         errorCode = 422;
         throw new Error("Id inválido")
      }

      const docente = await getTeacher(
      Number(req.body.id)
      )
      if (docente.length===0) {
         errorCode = 422;
         throw new Error("Professor inexistente.")
      }

      const turma = await getMission(
         Number(req.body.turma_id)
         )
         if (turma.length===0) {
            errorCode = 422;
            throw new Error("Turma inexistente.")
      }

      await addTeacher(
         Number(req.body.id),
         Number(req.body.turma_id)
      )

      res.status(200).send("Professor cadastrado na turma com Sucesso!");
   } catch (err) {
     res.status(errorCode).send({
       message: err.message
     })
   }
} 