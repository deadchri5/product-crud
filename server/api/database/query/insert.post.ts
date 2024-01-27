import * as crypto from 'crypto'
import { sql } from '@vercel/postgres'
import ItemDto from '~/dtos/Item'

export default defineEventHandler(async(event) => {
    const item: ItemDto = await readBody(event)
    if (!item.name || !item.description || !item.price) {
        setResponseStatus(event, 400)
        return {
            message: 'name, description and price are required'
        }
    }
    try {
        await sql`INSERT INTO Items (id, name, description, price, created_at, updated_at)
                  VALUES (${crypto.randomUUID()}, ${item.name}, ${item.description}, 
                  ${item.price}, to_timestamp(${Date.now() / 1000}), to_timestamp(${Date.now() / 1000}))`
        setResponseStatus(event, 201)
        return {
            message: 'Se inserto el nuevo item.'
        }
    } catch(error) {
        setResponseStatus(event, 500)
        return {
            message: 'Error al insertar el nuevo item.'
        }
    }
})
