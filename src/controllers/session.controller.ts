import { Request, Response } from 'express'
import { validatePassword } from '../service/user.service'
import { createSession } from '../service/session.service'
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