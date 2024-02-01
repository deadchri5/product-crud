import { sql } from '@vercel/postgres'
import jwt from 'jsonwebtoken'
import User from '~/dtos/User'

type UserE = Omit<User, 'id'>

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()    

    const jwtSecret = runtimeConfig.jwtSecret

    const response = await readBody<UserE>(event)
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

    // check if password are equal
    const { email, password } = response

    let trimmedEmail = email.trim()

    try {
        const { rows } = await sql`SELECT password FROM Users WHERE email = ${trimmedEmail}`
        if (rows[0].password !== password) {
            setResponseStatus(event, 401)
            return {
                message: 'Passwords do not match'
            }
        }
    } catch (error) {
        setResponseStatus(event, 500)
        return {
            message: 'Internal Server Error'
        }
    }

    // JWT
    const token = jwt.sign(response, jwtSecret, {
        expiresIn: '1h'
    })

    setResponseStatus(event, 200)
    return {
        token,
        email
    }
})
