const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    level: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    meta: {
        icon: String,
        description: String
    },
}, { timestamps: true });

categorySchema.index({ parentId: 1, order: 1 });
categorySchema.index({ level: 1 });

module.exports = mongoose.model('Category', categorySchema);
