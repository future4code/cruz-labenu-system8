import connection from '../connection'

export default async function removeStudent(
    id: number
):Promise<void> {
    await connection.raw(`
      DELETE FROM estudante_passatempo
      WHERE estudante_id = ${id};
    `)
    await connection.raw(`
      DELETE FROM estudantes
      WHERE id = ${id};
  `)

 } 