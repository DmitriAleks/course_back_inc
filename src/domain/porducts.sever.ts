import {productsInMemoryRepository} from "../repositoires/products-db-repository";

export type ProductsType = {
    id: string
    title: string
}

export const productsService = {
    async findProducts(title: string | undefined): Promise<ProductsType[]> {
           return productsInMemoryRepository.findProducts(title)
    },
    async getProductById(id: string): Promise<ProductsType | null> {
        return productsInMemoryRepository.getProductById(id)
    },
    async createProduct(title: string): Promise<ProductsType> {
        const newProduct = {
            id: (+(new Date())).toString(),
            title
        }
        return await productsInMemoryRepository.createProduct(newProduct)
    },
    async updateProduct(id: string, title: string): Promise<boolean> {
        return await productsInMemoryRepository.updateProduct(id, title)
    },
    async deleteProduct(id: string): Promise<boolean> {
        return await productsInMemoryRepository.deleteProduct(id)

    }
}