import { Request, Response } from "express";
import addStudent from '../data/addStudent'
import getStudent from "../data/getStudent";

export const removeStudentFromMission = async(
    req: Request,
    res: Response
    ): Promise<any> =>{
   let errorCode: number = 400;
   try {

      if(isNaN(Number(req.params.id))) {
         errorCode = 422;
         throw new Error("Id inválido")
      }

      const estudantes = await getStudent(
      Number(req.params.id)
      )
      if (estudantes.length===0) {
         errorCode = 422;
         throw new Error("Estudante inexistente.")
      }

      await addStudent(
         Number(req.params.id), "null"
      )
      

      res.status(200).send("Estudante removido da turma com Sucesso!");
   } catch (err) {
     res.status(errorCode).send({
       message: err.message
     })
   }
} 