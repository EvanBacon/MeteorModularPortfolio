/* Philosophies */
Router.route('philosophies', function() {
    Router.go('philosophiesIndex');
});
Router.route('philosophies/index/:limit?/', {
    name: 'philosophiesIndex',
    controller: PhilosophiesController,
    action: 'index',
});
Router.route('philosophies/insert/', {
    name: 'philosophiesInsert',
    controller: PhilosophiesController,
    action: 'insert',
});
Router.route('philosophies/update/:_id?', {
    name: 'philosophiesUpdate',
    controller: PhilosophiesController,
    action: 'update',
});
Router.route('philosophies/view/:_id?', {
    name: 'philosophiesView',
    controller: PhilosophiesController,
    action: 'view',
});
/* EOF Philosophies */