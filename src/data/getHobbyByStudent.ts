import connection from '../connection'

export default async function getHobbyByStudent(
    id: number
):Promise<any> {
    const result = await connection.raw(`
    SELECT estudantes.nome, turmas.nome AS turma FROM estudante_passatempo
    JOIN estudantes
    ON estudantes.id = estudante_id
    JOIN turmas
    ON turma_id = turmas.id
    WHERE passatempo_id= ${id};
    `)
    return result[0]
 } 
