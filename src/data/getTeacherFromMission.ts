import connection  from '../connection'

export default async function getTeacherFromMission(
    id: number
):Promise<any> {
    const result = await connection.raw(`
    SELECT d.nome as nome, d.email, e.nome as especialidades FROM docentes d
    INNER JOIN docentes_especialidades ts ON d.id = de.docentes_id
    LEFT JOIN especialidades s ON e.id = de.especialidades_id
    WHERE turma_id = ${id};
    `)
    return result[0]
 } 