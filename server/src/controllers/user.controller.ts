import { Request, Response } from "express";
import logger from "../utils/logger"
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from 'lodash';

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).json({ success: true, data: omit(user, 'password') })
    } catch (error: any) {
        logger.error(error)
        // might be a duplicate email
        return res.status(409).json({ success: false, message: error.message })
    }
}