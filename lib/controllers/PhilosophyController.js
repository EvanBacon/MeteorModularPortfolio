PhilosophyController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
      var sort = MeteorisGridView.getSorting();
      sort.limit = this.limit();

      this.subscription = this.subs.subscribe('philosophies', this.getCriteria(), sort);


    },
    // view: function() {
    //   return this.render('slidesView', {
    //     data: {
    //       model: this._loadModel(this.getId()),
    //     }
    //   });
    // },
    /* @override getCriteria */
    getCriteria: function() {
      var search = this.params.query.q ? this.params.query.q : "";
      return {
        $or: [
          {title: {$regex: search, $options: 'i'}},
          {content: {$regex: search, $options: 'i'}},
        ]
      };
    },

    /* passing data from controllers to view */
    data: function() {
      var sort = MeteorisGridView.getSorting();

      sort.limit = this.limit();
      var models = Philosophies.find(this.getCriteria(), sort);
      console.log("models", models.count());

      return {
        philosophies: {
          ready: this.subscription.ready,
          isEmpty: models.count() === 0 ? true : false,
          models: models,
          hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
        }
      };
    },
    _loadModel: function(_id) {
      return Philosophies.findOne(_id);
    },
});
