WorkController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
      var sort = MeteorisGridView.getSorting();
      // sort.limit = this.limit();
      this.subscription = this.subs.subscribe('settings', this.getCriteria(), sort);

      this.subscription = this.subs.subscribe('works', this.getCriteria(), sort);

    },
    getCriteria: function() {
      var search = this.params.query.q ? this.params.query.q : "";
      return {
        $or: [
          {title: {$regex: search, $options: 'i'}},
          {content: {$regex: search, $options: 'i'}},
          {date: {$regex: search, $options: 'i'}},
          {isWork: {$regex: search, $options: 'i'}},

        ]
      };
    },
    view: function() {
      console.log("model", this._loadModel(this.getId()));
      return this.render('projectView', {
        data: {
          model: this._loadModel(this.getId()),
        }
      });
    },
    /* passing data from controllers to view */
    data: function() {
      var sort = MeteorisGridView.getSorting();

      // sort.limit = this.limit();
      var models = Works.find({isWork:true});
      console.log("work models", models.count());
      // var models = Slides.find({isSlide:true});

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
