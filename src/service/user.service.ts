import { } from 'mongoose';
import UserModel from '../models/user.model';
import { UserInput } from '../types/definition';

export async function createUser(input: UserInput) {
    try {
        return UserModel.create(input)
    } catch (error: any) {
        // throw error to the next middleware.
        throw new Error(error)
    }
}