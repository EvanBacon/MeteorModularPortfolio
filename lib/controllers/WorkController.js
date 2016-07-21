WorkController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
      var sort = MeteorisGridView.getSorting();
      sort.limit = this.limit();

      this.subscription = this.subs.subscribe('works', this.getCriteria(), sort);

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
      var sort = MeteorisGridView.getSorting();

      sort.limit = this.limit();
      var models = Works.find(this.getCriteria(), sort);
      console.log("models", models.count());

      return {
        works: {
          ready: this.subscription.ready,
          isEmpty: models.count() === 0 ? true : false,
          models: models,
          hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
        }
      };
    },
    _loadModel: function(_id) {
      return Works.findOne(_id);
    },
});
