import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    images: [{ type: String, required: true }],
    created: { type: Date, default: new Date() }
}, { versionKey: false })

productSchema.virtual('id').get(function() {
    return this._id.toHexString()
})

// Remove '_id' property from fetched products.

productSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id }
})

// Populate categories on fetched products.

productSchema.pre('find', function() {
    this.populate('categories')
})

productSchema.pre('findOne', function() {
    this.populate('categories')
})

productSchema.pre('findOneAndUpdate', function() {
    this.options.runValidators = true
})

export default mongoose.model('Product', productSchema)