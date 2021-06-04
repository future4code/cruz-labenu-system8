import connection from '../connection'

export default async function addTeacher(
    id: number,
    turma_id: number | string
):Promise<void> {
    await connection.raw(`
      UPDATE docentes
      SET turma_id = ${turma_id}
      WHERE id = ${id};
    `)
 }