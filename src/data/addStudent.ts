import connection from '../connection'

export default async function addStudent(
    id: number,
    turma_id: number | string
):Promise<void> {
    await connection.raw(`
      UPDATE estudantes
      SET turma_id = ${turma_id}
      WHERE id = ${id};
    `)
 } 