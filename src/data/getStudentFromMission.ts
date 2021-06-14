import connection from '../connection'

export default async function getStudentFromMission(
    id: number
):Promise<any> {
    const result = await connection.raw(`
    SELECT nome, email FROM estudantes
    WHERE turma_id = ${id};
    `)
    return result[0]
 } 