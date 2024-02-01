import { sql } from '@vercel/postgres'
import User from '~/dtos/User'

export default defineEventHandler(async (event) => {
    const response = await readBody<User>(event)
    if (!response) {
        setResponseStatus(event, 400)
        return {
            message: 'Bad Request'
        }
    }
    if (!response.email || !response.password) {
        setResponseStatus(event, 400)
        return {
            message: 'You must provide email and password'
        }
    }

    // todo make password safer later
    
    const { email, password } = response

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!email.match(validRegex)) {
        setResponseStatus(event, 400)
        return {
            message: 'Invalid email'
        }
    }

    const user = await sql`SELECT * FROM Users WHERE email = ${email}`
    if (user.rowCount > 0) {
        setResponseStatus(event, 400)
        return {
            message: 'This email is already registered'
        }
    }

    try {
        await sql`INSERT INTO Users (email, password) VALUES (${email}, ${password})`
        setResponseStatus(event, 201)
        return {
            message: 'User created'
        }
    } catch (error) {
        console.log(error)
        setResponseStatus(event, 500)
        return {
            message: 'Internal Server Error'
        }
    }

})
