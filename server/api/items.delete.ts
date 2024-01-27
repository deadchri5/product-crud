import { sql } from '@vercel/postgres'
import ItemDto from '~/dtos/Item'

interface Id {
    id: string
}

export default defineEventHandler(async(event) => {
    const query: Id = getQuery(event)
    if (!query.id) {
        setResponseStatus(event, 400)
        return {
            error: 'No id provided'
        }
    }
    try {
        await sql`DELETE FROM Items WHERE id = ${query.id}`
        setResponseStatus(event, 200)
        return {
            message: `Item ${query.id} was successfully deleted.`
        }
    } catch(error) {
        setResponseStatus(event, 500)
        return {
            error,
            message: 'Internal server error'
        }
    }
})
