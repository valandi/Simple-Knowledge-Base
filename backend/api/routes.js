const ArticleController = require('./Controllers/ArticleController');
const TagController = require ('./Controllers/TagController');
const CategoryController = require('./Controllers/CategoryController');

module.exports = function(app, express) {
    let router = express.Router();

    app.post('/api/saveArticle', ArticleController.saveArticle);
    app.get('/api/getArticles', ArticleController.getArticles);
    app.get('/api/getArticle/:id', ArticleController.getArticle);
    app.put('/api/editArticle', ArticleController.editArticle);
    app.delete('/api/deleteArticle/:id', ArticleController.deleteArticle);
    app.post('/api/searchArticles', ArticleController.searchArticles);

    app.post('/api/saveTag', TagController.saveTag);
    app.get('/api/getTags', TagController.getTags);
    app.get('/api/getTag/:id', TagController.getTag);
    app.put('/api/editTag', TagController.editTag);
    app.delete('/api/deleteTag/:id', TagController.deleteTag);

    app.post('/api/saveCategory', CategoryController.saveCategory);
    app.get('/api/getCategories', CategoryController.getCategories);
    app.get('/api/getCategory/:id', CategoryController.getCategory);
    app.put('/api/editCategory', CategoryController.editCategory);
    app.delete('/api/deleteCategory/:id', CategoryController.deleteCategory);
}