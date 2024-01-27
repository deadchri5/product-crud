import { sql } from '@vercel/postgres'
import ItemDto from '~/dtos/Item'

type EditItem = Omit<ItemDto, 'updated_at'>

export default defineEventHandler(async(event) => {
    const body: EditItem = await readBody(event)
    try {
        // search item
        const { rows } = await sql`SELECT id FROM Items Where id = ${body.id}`
        if (rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                message: 'Item not found'
            }
        }
        // item exist
        await sql`UPDATE Items SET name = ${body.name}, description = ${body.description}, price = ${body.price}, updated_at = NOW() 
                  WHERE id = ${body.id}`
    } catch (error) {
        setResponseStatus(event, 500)
        return { 
            error,
            message: 'Error while searching item'
        }
    }
    return { body }
})
