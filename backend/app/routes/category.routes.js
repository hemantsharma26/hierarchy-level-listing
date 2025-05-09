const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', categoryController.getByParent)
    .get('/tree', categoryController.getTree)

    .post('/', authMiddleware, categoryController.create)
    .put('/:id', authMiddleware, categoryController.update)
    .delete('/:id', authMiddleware, categoryController.delete)
    .put('/:id/move', authMiddleware, categoryController.move)

module.exports = router;
