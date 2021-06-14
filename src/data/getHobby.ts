import connection from '../connection'

export default async function getHobby(
    id: number
):Promise<any> {
    const result = await connection.raw(`
    SELECT * FROM passatempos
    WHERE id = ${id};
    `)
    return result[0]
 } 