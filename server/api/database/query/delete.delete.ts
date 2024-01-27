import { sql } from '@vercel/postgres'
import ItemDto from '~/dtos/Item'

type Item = Pick<ItemDto, 'id'>

export default defineEventHandler(async(event) => {
    const body: Item = await readBody(event)
    if (!body.id) {
        setResponseStatus(event, 400)
        return {
            error: 'No id provided'
        }
    }
    try {
        await sql`DELETE FROM Items WHERE id = ${body.id}`
        setResponseStatus(event, 200)
        return {
            message: `Item ${body.id} was successfully deleted.`
        }
    } catch(error) {
        setResponseStatus(event, 500)
        return {
            error,
            message: 'Internal server error'
        }
    }
})
