import { sql } from '@vercel/postgres'

export default defineEventHandler(async(event) => {
    try {
        await sql`CREATE TABLE Items ( 
                    id varchar(255) PRIMARY KEY,
                    name varchar(50),
                    description varchar(255),
                    price numeric,
                    created_at timestamp,
                    updated_at timestamp
                );`
        setResponseStatus(event, 200)
        return {
            message: 'table Items created'
        }
    } catch(error) {
        setResponseStatus(event, 500, 'Error creating table')
        return {
            error,
            message: 'Error creating table'
        }
    }
})
