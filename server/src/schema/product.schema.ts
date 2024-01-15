import z from 'zod';

const payload = {
    body: z.object({
        title: z.string({
            required_error: 'Title is required'
        }),
        description: z.string({
            required_error: 'Description is required'
        }).min(120, 'Description should be 120 characters long'),
        price: z.number({
            required_error: 'Price is required.'
        }).min(1, 'Price should be greater than 1'),
        image: z.string({
            required_error: 'Image is required.'
        })
    })
}

const params = {
    params: z.object({
        productId: z.string({
            required_error: 'productId is required'
        })
    })
}

export const createProductSchema = z.object({
    ...payload
})

export const updateProductSchema = z.object({
    ...payload,
    ...params
})

export const getProductSchema = z.object({
    ...params
})

export const deleteProductSchema = z.object({
    ...params
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type GetProductInput = z.infer<typeof getProductSchema>
export type DeleteProductInput = z.infer<typeof deleteProductSchema>