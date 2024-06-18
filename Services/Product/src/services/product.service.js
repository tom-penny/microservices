import Product from '../models/product.js'

export const validateProducts = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const { productId, quantity, unitPrice } = orderItems[i]
        const product = await Product.findById(productId)
        if (unitPrice != product.price) return false
        if (quantity > product.stock) return false
    }
    return true
}

export const updateStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const { productId, quantity } = orderItems[i]
        await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity }})
    }
}