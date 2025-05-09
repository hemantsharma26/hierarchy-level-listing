const Category = require('../models/category.model');

exports.getByParent = async (parentId) => {
    return await Category.find({ parentId: parentId }).sort({ order: 1 });
};

exports.getTree = async () => {
    return await Category.find().sort({ level: 1, order: 1 });
};

exports.create = async (data) => {
    const parent = data.parentId ? await Category.findById(data.parentId) : null;
    const level = parent ? parent.level + 1 : 1;

    const category = new Category({ ...data, level });
    return await category.save();
};

exports.update = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id, force) => {
    const children = await Category.find({ parentId: id });
    if (children.length > 0 && !force) {
        throw new Error('Cannot delete category with children');
    }
    if (force) {
        await Promise.all(children.map(child => this.delete(child._id, true)));
    }
    return await Category.findByIdAndDelete(id);
};

exports.move = async (id, { newParentId, newOrder }) => {
    const node = await Category.findById(id);
    const newParent = newParentId ? await Category.findById(newParentId) : null;
    const newLevel = newParent ? newParent.level + 1 : 1;

    if (String(id) === String(newParentId)) {
        throw new Error('Cannot move to itself');
    }

    node.parentId = newParentId || null;
    node.level = newLevel;
    node.order = newOrder || 0;

    return await node.save();
};
