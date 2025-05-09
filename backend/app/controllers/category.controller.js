const categoryService = require('../services/category.service');

exports.getByParent = async (req, res) => {
    const parentId = req.query.parentId || null;
    const categories = await categoryService.getByParent(parentId);
    res.json(categories);
};

exports.getTree = async (req, res) => {
    const tree = await categoryService.getTree();
    res.json(tree);
};

exports.create = async (req, res) => {
    const newCat = await categoryService.create(req.body);
    res.status(201).json(newCat);
};

exports.update = async (req, res) => {
    const updated = await categoryService.update(req.params.id, req.body);
    res.json(updated);
};

exports.delete = async (req, res) => {
    await categoryService.delete(req.params.id, req.query.force === 'true');
    res.json({ message: 'Deleted' });
};

exports.move = async (req, res) => {
    const moved = await categoryService.move(req.params.id, req.body);
    res.json(moved);
};
