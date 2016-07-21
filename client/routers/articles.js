/* Articles */
Router.route('articles', function() {
    Router.go('articlesIndex');
});
Router.route('articles/index/:limit?/', {
    name: 'articlesIndex',
    controller: ArticlesController,
    action: 'index',
});
Router.route('articles/insert/', {
    name: 'articlesInsert',
    controller: ArticlesController,
    action: 'insert',
});
Router.route('articles/update/:_id?', {
    name: 'articlesUpdate',
    controller: ArticlesController,
    action: 'update',
});
Router.route('articles/view/:_id?', {
    name: 'articlesView',
    controller: ArticlesController,
    action: 'view',
});
/* EOF Articles */