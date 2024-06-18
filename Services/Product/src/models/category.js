import mongoose from 'mongoose'
import Product from './product.js'

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { versionKey: false })

categorySchema.virtual('id').get(function() {
    return this._id.toHexString()
})

categorySchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id }
})

categorySchema.pre('deleteOne', { document: true }, async (next) => {
    try {
        const query = { categories: this._id }
        const update = { $pull: query }
        await Product.updateMany(query, update)
        next()
    }
    catch (err) { next(err) }
})

categorySchema.pre('findOneAndUpdate', function() {
    this.options.runValidators = true
})

export default mongoose.model('Category', categorySchema)