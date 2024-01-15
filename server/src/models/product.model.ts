import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid'
import { ProductDocument } from '../types/definition';
// nanoid: generate unique string ID.

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

const productSchema = new mongoose.Schema<ProductDocument>({
    // Generate unique ID sign to productId.
    productId: {
        type: String,
        unique: true,
        default: () => `product_${nanoid()}`
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }
}, { timestamps: true })

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema)
export default ProductModel