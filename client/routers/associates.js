/* Associates */
Router.route('associates', function() {
    Router.go('associatesIndex');
});
Router.route('associates/index/:limit?/', {
    name: 'associatesIndex',
    controller: AssociatesController,
    action: 'index',
});
Router.route('associates/insert/', {
    name: 'associatesInsert',
    controller: AssociatesController,
    action: 'insert',
});
Router.route('associates/update/:_id?', {
    name: 'associatesUpdate',
    controller: AssociatesController,
    action: 'update',
});
Router.route('associates/view/:_id?', {
    name: 'associatesView',
    controller: AssociatesController,
    action: 'view',
});
/* EOF Associates */