import  connection  from '../connection'

export default async function getMission(
    id: number
):Promise<any> {
    const result = await connection.raw(`
    SELECT * FROM turmas
    WHERE id = ${id};
    `)
    return result[0]
 } 