import { Request, Response } from "express";
import postMission from '../data/postMission'

export const createMission = async(
    req: Request,
    res: Response
    ): Promise<any> =>{
   let errorCode: number = 400;
   try {
      if(!req.body.nome || !req.body.data_inicio || !req.body.data_fim){
         errorCode = 422;
         throw new Error("Preencha todos os campos e tente novamente.")
      }

      if (req.body.modulo>7 || req.body.modulo<1) {
         errorCode = 422;
         throw new Error("O valor do módulo deve ser entre 1 e 7.")
      }

      let newName = req.body.nome
      if (req.body.periodo) {
         if (req.body.periodo!=="night" && req.body.periodo!=="day") {
            errorCode = 422;
            throw new Error("Período inválido")
         }
      }
      if (req.body.periodo==="night") {
         newName = `${req.body.name}-na-night`
      }

         await postMission(
         newName,
         req.body.data_inicio,
         req.body.data_final,
         req.body.modulo
      )
      res.status(200).send("Turma criada com sucesso");
   } catch (err) {
     res.status(errorCode).send({
       message: err.message
     })
   }
}