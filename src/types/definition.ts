import { Document, ObjectId } from "mongoose";

export interface UserInput {
    email: string;
    name: string;
    password: string;
}

export interface UserDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface SessionDocument extends Document {
    user: UserDocument['_id'],
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

