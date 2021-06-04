import connection from '../connection'

export default async function postMission(
    nome: string,
    data_inicio: string,
    data_final: string,
    modulo: number | undefined
):Promise<any> {
    const result = await connection
      .insert({
        id: Math.round(Date.now()/10000),
        name: nome,
        data_inicio: data_inicio,
        data_final: data_final,
        module: module
      })
      .into("turmas");
    
    return result[0]
 }