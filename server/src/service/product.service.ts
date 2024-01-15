import { ProductDocument, ProductInput } from "../types/definition"
import ProductModel from "../models/product.model"
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"

export const createProduct = (input: ProductInput) => {
    return ProductModel.create(input)
}
export const findProduct = (query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) => {
    return ProductModel.findOne(query, {}, options)
}

export const findAndUpdateProduct = (
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options?: QueryOptions) => {
    return ProductModel.findOneAndUpdate(query, update, options)
}
export const deleteProduct = (query: FilterQuery<ProductDocument>, options?: QueryOptions) => {
    return ProductModel.deleteOne(query, options)
}