let products = [{id: '1', title: 'tomato'}, {id: '2', title: 'orange'}, {id: '3', title: 'apple'}, {
    id: '4',
    title: 'banana'
}]


export const productsRepository = {
    findProducts(title: string | undefined) {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
    getProductById(id: string) {
        return products.find(p => p.id === id)
    },
    createProduct(title: string) {
        const newProduct = {
            id: (+(new Date())).toString(),
            title
        }
        products.push(newProduct)

        return newProduct
    },
    updateProduct(id: string, title: string) {
        let product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true
        } else {
            return false
        }
    },
    deleteProduct(id: string){
        if (products.find(p => p.id === id)) {
            products = products.filter(p => p.id !== id)
            return true
        } else {
            return false
        }
    }
}
