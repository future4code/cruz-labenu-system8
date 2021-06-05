import { Request, Response } from "express";
import getMission from "../data/getMission";
import getStudentFromMission from "../data/getStudentFromMission";

export const getStudentByMission = async(
    req: Request,
    res: Response
    ): Promise<any> =>{
   let errorCode: number = 400;
   try {
      if(isNaN(Number(req.params.id))) {
         errorCode = 422;
         throw new Error("Id inválido")
      }
      
      const result = await getStudentFromMission(
      Number(req.params.id)
      )

      const mission = await getMission(
         Number(req.params.id)
         )
      if (mission.length===0) {
         errorCode = 422;
         throw new Error("Turma inexistente.")
      }

      if (result.length===0) {
         errorCode = 422;
         throw new Error("Nenhum aluno nesta turma.")
      }


      res.status(200).send(result);
   } catch (err) {
     res.status(errorCode).send({
       message: err.message
     })
   }
} 