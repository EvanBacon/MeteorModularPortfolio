var AdminPages = [
                    'dashboard',
                    'mediaManager',
                    'albumManager',
                    'tagManager',
                    'albumEdit',
                    'settings',
                    'profile'
                 ];


var routerFilters = {
    isLoggedIn: function (pause) {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else {
        AccountsTemplates.ensureSignedIn.call(this, pause);
      }
    },
    hasAdmin: function (pause) {
        Meteor.call('hasAdmin', function (err, result) {
            if (!err && !result) // if no admin user detected, go to registration page
                Router.go('registration');
        });
        this.next();
    },
    resetScroll: function () {
        $('#main').scrollTop(0);
    }

};

/**
 * configuring router
 * set layoutTemplate to layout template (you can look layout template at client/views/index.html)
 * set every partial template / called yieldTemplates to choosen template (you can look templates at client/templates)
 * set loading template from templates folder too
 */
Router.configure({
    layoutTemplate: 'layout', //set default layout to basic
    yieldTemplates: {
        'templateBasicHeader': {to: 'templateBasicHeader'},
        'templateBasicFooter': {to: 'templateBasicFooter'},
    },
    notFoundTemplate: 'templatePublicNotFound',
    loadingTemplate: 'templatePublicLoading',
});
Router.onBeforeAction(routerFilters.isLoggedIn, {only: AdminPages});
Router.onBeforeAction(routerFilters.hasAdmin, {only: ['atSignIn']});


///**
// * require login, if user logged in then call loading template else back to login page
// */
//var requireLogin = function() {
//    if (!Meteor.user()) {
//        if (Meteor.loggingIn())
//            this.render('templatePublicLoading');
//        else
//            Router.go('usersLogin');
//    } else {
//        this.next();
//    }
//}
//
//Router.onBeforeAction(requireLogin, {
//    except: [
//        'sitesIndex',
//        'postsIndex',
//        'postsView',
//        'usersRegister',
//        'usersLogin',
//    ]
//});

Router.route('forbidden', {
    template: 'templatePublicForbidden'
});








Router.route('/sign-out', {
  name: 'signOut',
  template: 'albums',
  onBeforeAction: function() {
    Meteor.logout(function() {});
    Router.go('home');
    this.next();
  }
});

/**
* Registration Page (only show for first admin)
* Path: /first-time-register
* Registration page for admin
*/
Router.route('/first-time-register', {
  name          : 'registration',
  template      : 'registration',
  layoutTemplate: 'layoutNoHeaders',
  onBeforeAction: function() {
      Meteor.call('hasAdmin', function (err, result) {
          if (!err && result) // if admin user detected, go to sign-in page
              Router.go('atSignIn');
      });
      this.next();
  },
  path          : '/first-time-register'
});
