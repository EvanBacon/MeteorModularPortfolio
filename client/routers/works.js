/* Works */
Router.route('works', function() {
    Router.go('worksIndex');
});
Router.route('works/index/:limit?/', {
    name: 'worksIndex',
    controller: WorksController,
    action: 'index',
});
Router.route('works/insert/', {
    name: 'worksInsert',
    controller: WorksController,
    action: 'insert',
});
Router.route('works/update/:_id?', {
    name: 'worksUpdate',
    controller: WorksController,
    action: 'update',
});
Router.route('works/view/:_id?', {
    name: 'worksView',
    controller: WorksController,
    action: 'view',
});
/* EOF Works */