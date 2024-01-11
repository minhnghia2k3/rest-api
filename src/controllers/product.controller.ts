import { Request, Response } from 'express'
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from '../service/product.service'
import { CreateProductInput, GetProductInput, DeleteProductInput, UpdateProductInput } from '../schema/product.schema'

export const createProductHandler = async (
    req: Request<{}, {}, CreateProductInput['body']>,
    res: Response) => {
    try {
        // Get user id from middleware
        const userId = res.locals.user._id

        const body = req.body

        const product = await createProduct({
            ...body, user: userId
        })

        return res.status(200).json({
            success: true,
            data: product
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProductHandler = async (
    req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
    res: Response) => {
    try {
        const userId = res.locals.user._id

        const productId = req.params.productId
        const body = req.body

        const product = await findProduct({
            productId,
            user: userId
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            })
        }
        if (product.user.toString() !== userId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to update this product.'
            })
        }

        const updatedProduct = await findAndUpdateProduct({ productId }, body, { new: true })
        return res.status(200).json({
            success: true,
            data: updatedProduct
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getProductHandler = async (req: Request<GetProductInput['params']>, res: Response) => {
    try {
        const userId = res.locals.user._id
        const productId = req.params.productId
        console.log(userId, productId)
        const product = await findProduct({
            productId,
            user: userId
        })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            })
        }
        return res.status(200).json({
            success: true,
            data: product
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const deleteProductHandler = async (req: Request<DeleteProductInput['params']>, res: Response) => {
    try {
        const userId = res.locals.user._id
        const productId = req.params.productId

        const product = await findProduct({
            productId,
            user: userId
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            })
        }
        if (product.user.toString() !== userId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this product.'
            })
        }

        await deleteProduct({ productId })

        return res.status(200).json({
            success: true,
            message: 'Delete product successfully.'
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}