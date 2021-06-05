import connection from '../connection'

export default async function getStudent(
    id: number
):Promise<any> {
    const result = await connection.raw(`
    SELECT * FROM estudantes
    WHERE id = ${id};
    `)
    return result[0]
 } 