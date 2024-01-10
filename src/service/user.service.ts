import { FilterQuery } from 'mongoose';
import UserModel from '../models/user.model';
import { UserDocument, UserInput } from '../types/definition';
import _ from 'lodash';
export const createUser = async (input: UserInput) => {
    try {
        const user = await UserModel.create(input)
        return _.omit(user.toJSON(), 'password')
    } catch (error: any) {
        throw new Error(error)
    }
}

export const validatePassword = async (
    { email,
        password
    }: {
        email: string,
        password: string
    }) => {
    const user = await UserModel.findOne({ email })

    if (!user) return false

    const isValid = await user.comparePassword(password)

    if (!isValid) return false

    return _.omit(user.toJSON(), 'password')
}

export const findUser = async (userId: string) => {
    return UserModel.findById(userId).lean();
}