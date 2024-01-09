import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel from "../models/session.model";
import { SessionDocument } from "../types/definition";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import _ from 'lodash';
import { findUser } from "./user.service";
import config from 'config';

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent })

    return session.toJSON();
}

export const findSessions = (query: FilterQuery<SessionDocument>) => {
    // by default return an instance of Mongoose Document Class
    // use lean() to skip a full Mongoose Document and just give POJO=Plain Old Javascript Object\
    // .lean() === .toJSON()
    return SessionModel.find(query).lean();
}

export const updateSession = (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
    return SessionModel.updateOne(query, update)
}

export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
    /* Decode refresh token */
    const { decoded } = verifyJwt(refreshToken)
    /* Case doesn't have decoded or session._id */
    if (!decoded || !_.get(decoded, '_id')) return false;

    /* Get session */
    const session = await SessionModel.findById(_.get(decoded, 'session'))

    /* Check session is valid */
    if (!session || !session?.valid) return false;

    /* Get user */
    const user = await findUser(session.user.toString())

    if (!user) return false;

    /* If do have user -> create new accessToken */
    const accessToken = signJwt({
        ...user,
        session: session._id
    }, {
        expiresIn: config.get('accessTokenTTL')
    })
    return accessToken;
}