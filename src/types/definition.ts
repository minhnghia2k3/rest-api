import { Document } from "mongoose";

export interface UserInput {
    email: string;
    name: string;
    password: string;
}

export interface UserDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): boolean;
}

