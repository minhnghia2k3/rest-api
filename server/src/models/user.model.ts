import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { UserDocument, UserInput } from '../types/definition';

// User schema definition
const userSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, require: true }
}, { timestamps: true });

// Middleware Pre
userSchema.pre('save', function (next) {
    if (!this.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(config.get<number>('saltWorkFactor'));

    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    return next();
})

// Instance method
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password)
}

// User model
const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel;