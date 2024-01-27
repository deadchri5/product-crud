import { sql } from '@vercel/postgres'

export default defineEventHandler(async(event) => {
    try {
        await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`
    } catch(error) {
        return error
    }
    return {
        message: 'se creo la tabla pets'
    }
})
