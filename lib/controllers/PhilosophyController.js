PhilosophyController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
      var sort = MeteorisGridView.getSorting();
      // sort.limit = this.limit();

      this.subscription = this.subs.subscribe('works', this.getCriteria(), sort);
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
      var sort = MeteorisGridView.getSorting();

      // sort.limit = this.limit();
      var models = Works.find({isWork: {$in: [null, false]} });
      // console.log("models", models.count());
      // var models = Slides.find({isSlide:true});
      // var stories = Slides.find({isSlide: {$in: [null, false]} });

      return {
        data: {
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
