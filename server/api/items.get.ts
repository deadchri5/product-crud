import { sql } from '@vercel/postgres'

export default defineEventHandler(async(event) => {
    const id: string|null = getQuery(event)?.id
    
    if (!id) {
        try {
            const { rows } = await sql`SELECT * FROM Items ORDER BY created_at DESC`
            setResponseStatus(event, 200)
            return rows
        } catch (error) {
            setResponseStatus(event, 500)
            return { 
                error,
                message: 'Something went wrong' 
            }
        }
    }

    try {
        const { rows } = await sql`SELECT * FROM Items WHERE id = ${id}`
        if (rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                message: `Item with id "${id}" not found`
            }
        }
        setResponseStatus(event, 200)
        return rows[0]
    } catch(error) {
        setResponseStatus(event, 500)
        return {
            error,
            message: 'Something went wrong'
        }
    }

})
