import { Request, Response } from "express";
import getStudent from "../data/getStudent";
import removeStudent from '../data/removeStudent'

export const deleteStudent = async(req: Request,res: Response): Promise<any> =>{
   let errorCode: number = 400;
   try {
      if(isNaN(Number(req.params.id))) {
         errorCode = 422;
         throw new Error("Id inválido")
      }

      const student = await getStudent(
         Number(req.params.id)
         )
         if (student.length===0) {
            errorCode = 422;
            throw new Error("Estudante inexistente.")
         }

      await removeStudent(
         Number(req.params.id)
      )

      res.status(200).send("Estudante apagado com Sucesso!");
   } catch (err) {
     res.status(errorCode).send({
       message: err.message
     })
   }
} 