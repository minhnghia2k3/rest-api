import { Request, Response, NextFunction } from 'express'
import _ from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    /* Get access, refresh token from headers (saved by create session) */
    const accessToken = _.get(req, 'cookies.accessToken') || _.get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
    const refreshToken = _.get(req, 'cookies.refreshToken') || _.get(req, 'headers.x-refresh')?.toString()

    if (!accessToken) return next();

    const { expired, decoded } = verifyJwt(accessToken)

    /* Token is valid -> send data to next middleware */
    if (decoded) {
        res.locals.user = decoded
        return next();
    }

    /* Token is invalid but user has refreshToken valid */
    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken })

        if (newAccessToken) {
            console.log('in this case')
            // When re-issue access token, we also send it in the header
            res.setHeader('x-access-token', newAccessToken);

            res.cookie('accessToken', newAccessToken, {
                domain: 'localhost',
                httpOnly: true,
                maxAge: 900000,
                path: '/',
                secure: false
            })

            const result = verifyJwt(newAccessToken)
            res.locals.user = result.decoded
            return next();
        }

    }
    return next();
}
export default deserializeUser;