
/* DASHBOARDS */
Router.route('/', {
    name: 'sitesIndex',
    controller: SitesController,
});



Router.route('work', {
    name: 'workIndex',
    controller: WorkController,
});
Router.route('philosophy', {
    name: 'philosophyIndex',
    controller: PhilosophyController,
});

Router.route('about', {
    name: 'aboutIndex',
    controller: AboutController,
});

Router.route('atelier', {
    name: 'atelierIndex',
    controller: AtelierController,
});

Router.route('contact', {
    name: 'contactIndex',
    controller: ContactController,
});

/* EOF DASHBOARDS */


/**
  * Site Settings
  * Path: /admin/settings
  * View / Edit settings form
  */

// Controllers


AdminSettingsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
      var sort = MeteorisGridView.getSorting();
      sort.limit = this.limit();

      this.subscription = this.subs.subscribe('settings', this.getCriteria(), sort);

    },
    getCriteria: function() {
      var search = this.params.query.q ? this.params.query.q : "";
      return {
        $or: [
          {title: {$regex: search, $options: 'i'}},
          {content: {$regex: search, $options: 'i'}},
          {date: {$regex: search, $options: 'i'}},

        ]
      };
    },

    /* passing data from controllers to view */
    data: function() {
      // var sort = MeteorisGridView.getSorting();
      //
      // sort.limit = this.limit();
      // var models = Works.find(this.getCriteria(), sort);
      // console.log("settings models", models.count());

      console.log("settings", Settings.findOne());
      return {
        hasSettings: !!Settings.find().count(),
        settings: Settings.findOne()
      }
    },
    _loadModel: function(_id) {
      return Settings.findOne(_id);
    },
    metadata: function () {
        return { title: 'Settings', description: null};
    },
});


// SettingsController = RouteController.extend({
//     metadata: function () {
//         return { title: 'Settings', description: null};
//     },
//     data: function () {
//       console.log("data settings ", Settings.findOne());
//         return {
//           hasSettings: !!Settings.find().count(),
//           settings: Settings.findOne()
//         }
//     }
// });

Router.route('/admin/settings', {
  name          : 'settings',
  template      : 'settingsManager',
  path          : '/admin/settings',
  controller    : AdminSettingsController
});
