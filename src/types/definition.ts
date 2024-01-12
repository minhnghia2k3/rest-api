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

export interface ProductInput {
    user: UserDocument['_id'];
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface ProductDocument extends ProductInput, Document {
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}