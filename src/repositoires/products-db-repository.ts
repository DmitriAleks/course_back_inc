import {productCollections} from "../index";

export type ProductsType = {
    id: string
    title: string
}

export const productsInMemoryRepository = {
    async findProducts(title: string | undefined): Promise<ProductsType[]> {
        const filter:any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        return await productCollections.find(filter).toArray()
    },
    async getProductById(id: string): Promise<ProductsType | null> {
        return productCollections.findOne({})
    },
    async createProduct(newProduct:any): Promise<ProductsType> {
        const result = await productCollections.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: string, title: string): Promise<boolean> {
        const result = await productCollections.updateOne({id: id}, {$set: {title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: string): Promise<boolean> {
        const result = await productCollections.deleteOne({id: id})
        return result.deletedCount === 1
    }
}
