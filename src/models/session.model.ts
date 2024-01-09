import mongoose from "mongoose";
import { SessionDocument } from "../types/definition";

const sessionSchema = new mongoose.Schema<SessionDocument>({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
}, { timestamps: true })

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema)

export default SessionModel