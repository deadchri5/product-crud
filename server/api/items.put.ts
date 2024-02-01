import { sql } from '@vercel/postgres'
import ItemDto from '~/dtos/Item'

type EditItem = Omit<ItemDto, 'updated_at'>

interface Id {
    id: string
} 

export default defineEventHandler(async(event) => {
    const query: Id = getQuery(event)
    const body: EditItem = await readBody(event)
    if (!query.id) {
        setResponseStatus(event, 400)
        return {
            message: 'You must provide an id'
        }
    }
    try {
        // search item
        const { rows } = await sql`SELECT name, description, price FROM Items WHERE id = ${query.id}`
        if (rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                message: 'Item not found'
            }
        }
        const name = body.name ? body.name : rows[0].name
        const description = body.description ? body.description : rows[0].description
        const price = body.price ? body.price : rows[0].price
        // item exist
        await sql`UPDATE Items SET name = ${name}, description = ${description}, price = ${price}, updated_at = NOW() 
                  WHERE id = ${query.id}`
        setResponseStatus(event, 201)
        return {
            message: `Item ${query.id} updated`
        }
    } catch (error) {
        setResponseStatus(event, 500)
        return { 
            error,
            message: 'Error while searching item'
        }
    }
})
