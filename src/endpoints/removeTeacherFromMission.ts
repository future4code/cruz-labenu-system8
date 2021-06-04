import { Request, Response } from "express";
import addTeacher from '../data/addTeacher'
import getTeacher from "../data/getTeacher";

export const removeTeacherFromMission = async(
    req: Request,
    res: Response
    ): Promise<any> =>{
   let errorCode: number = 400;
   try {

      if(isNaN(Number(req.params.id))) {
         errorCode = 422;
         throw new Error("Id inválido")
      }

      const teacher = await getTeacher(
      Number(req.params.id)
      )
      if (teacher.length===0) {
         errorCode = 422;
         throw new Error("Professor inexistente.")
      }


      await addTeacher(
         Number(req.params.id),
         "null"
      )

      res.status(200).send("Professor removido na turma com sucesso");
   } catch (err) {
     res.status(errorCode).send({
       message: err.message
     })
   }
} 