import { Request, Response } from 'express'
import { validatePassword } from '../service/user.service'
import { createSession, findSessions, updateSession } from '../service/session.service'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'

export const createUserSessionHandler = async (req: Request, res: Response) => {
    try {
        // Validate user password
        const user = await validatePassword(req.body)

        if (!user) return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        })
        // Create a session
        const session = await createSession(user._id, req.get('user-agent') || '')

        // Create an access token
        const accessToken = signJwt({
            ...user,
            session: session._id
        }, {
            expiresIn: config.get<string>('accessTokenTTL')
        }
        )

        // Create a refresh token
        const refreshToken = signJwt({
            ...user,
            session: session._id
        }, {
            expiresIn: config.get<string>('refreshTokenTTL')
        })

        // Return access & refresh token
        res.cookie('accessToken', accessToken, {
            domain: 'localhost', // change in production
            httpOnly: true, // only http can access
            maxAge: 900000, // 15 minutes
            path: '/',
            secure: false // change in production,
        })

        res.cookie('refreshToken', refreshToken, {
            domain: 'localhost', // change in production
            httpOnly: true, // only http can access
            maxAge: 3.1536E+10, // 1 year
            path: '/',
            secure: false // change in production
        })

        return res.status(200).json({
            success: true,
            data: { accessToken, refreshToken }
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getUserSessionHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id

    // query userId and valid session
    const session = await findSessions({ user: userId, valid: true })

    return res.status(200).json({
        success: true,
        session
    })
}

export const deleteUserSessionHandler = async (req: Request, res: Response) => {
    try {
        const sessionId = res.locals.user.session

        // if valid = false => findSessions will not response => token not save to header
        await updateSession({ _id: sessionId }, { valid: false })

        return res.status(200).json({
            success: true,
            data: {
                accessToken: null,
                refreshToken: null
            },
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}