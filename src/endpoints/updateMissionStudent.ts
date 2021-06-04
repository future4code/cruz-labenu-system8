import { Request, Response } from "express";
import addStudent from '../data/addStudent'
import getMission from "../data/getMission";
import getStudent from "../data/getStudent";

export const updateMissionStudent = async(
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

      const estudante = await getStudent(
      Number(req.body.id)
      )
      if (estudante.length===0) {
         errorCode = 422;
         throw new Error("Estudante inexistente.")
      }

      const turma = await getMission(
         Number(req.body.turma_id)
         )
         if (turma.length===0) {
            errorCode = 422;
            throw new Error("Turma inexistente.")
      }

      await addStudent(
         Number(req.body.id),
         Number(req.body.turma_id)
      )

      res.status(200).send("Turma alterada com sucesso");
   } catch (err) {
     res.status(errorCode).send({
       message: err.message
     })
   }
} 