import { sql } from '@vercel/postgres'
import ItemDto from '~/dtos/Item'

type EditItem = Omit<ItemDto, 'updated_at'>

export default defineEventHandler(async(event) => {
    const body: EditItem = await readBody(event)
    try {
        // search item
        const { rows } = await sql`SELECT name, description, price FROM Items Where id = ${body.id}`
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
                  WHERE id = ${body.id}`
        setResponseStatus(event, 201)
        return {
            message: 'Item updated'
        }
    } catch (error) {
        setResponseStatus(event, 500)
        return { 
            error,
            message: 'Error while searching item'
        }
    }
})
