import jwt from 'jsonwebtoken';
import config from 'config'

const publicKey = config.get<string>('publicKey')
const privateKey = config.get<string>('privateKey')
export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
    try {
        return jwt.sign(object, privateKey, {
            // Make sure options is not undefined.
            ...(options && options),
            // 'RS256' pairs with the private & public key.
            algorithm: 'RS256',
        })
    } catch (error: any) {
        throw new Error(error)
    }
}

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        // if error return error object
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}