
export type ProductsType = {
    id: string
    title: string
}

let products: ProductsType[] = [{id: '1', title: 'tomato'}, {id: '2', title: 'orange'}, {id: '3', title: 'apple'}, {
    id: '4',
    title: 'banana'
}]


export const productsInMemoryRepository = {
   async findProducts(title: string | undefined):Promise<ProductsType[]> {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
   async getProductById(id: string):Promise<ProductsType|undefined> {
        return products.find(p => p.id === id)
    },
   async createProduct(title: string): Promise<ProductsType> {
        const newProduct = {
            id: (+(new Date())).toString(),
            title
        }
        products.push(newProduct)

        return newProduct
    },
    async updateProduct(id: string, title: string):Promise<boolean> {
        let product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
   async deleteProduct(id: string):Promise<boolean> {
        if (products.find(p => p.id === id)) {
            products = products.filter(p => p.id !== id)
            return true
        } else {
            return false
        }
    }
}
