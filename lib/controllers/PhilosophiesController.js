PhilosophiesController = MeteorisController.extend({
  /* get subscribtion from server with parameter criteria, and sort/limit */
  subscriptions: function() {
    var sort = MeteorisGridView.getSorting();
    sort.limit = this.limit();

    this.subscription = this.subs.subscribe('philosophies', this.getCriteria(), sort);
  },
  /* event searching data by user input with parameter */
  search: function(t) {
    Router.go(Router.current().route.getName(), {limit: this.limit()}, {query: "q=" + t.find('#search').value});
  },
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
  index: function() {
    var sort = MeteorisGridView.getSorting();
    sort.limit = this.limit();
    var models = Philosophies.find(this.getCriteria(), sort);

    console.log("phil", models[0]);
    return this.render('philosophiesIndex', {
      data: {
        ready: this.subscription.ready,
        isEmpty: models.count() === 0 ? true : false,
        models: models,
        hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
      }
    });
  },
  view: function() {
    return this.render('philosophiesView', {
      data: {
        model: this._loadModel(this.getId()),
      }
    });
  },
  /* private get user input docs */
  _getDoc: function(t) {
    return {
      title: t.find('#title').value,
      content: t.find('#content').value,
    };
  },
  /* uploading file using cfs:fileSystem package + cfs:ejson */
  _uploadImage: function() {
    var imageId = null;
    var file = $('#image').get(0).files[0];
    if (file) {
      var image = Images.insert(file, function(err) {
        if (err) {
          MeteorisFlash.set('danger', err.message);
          throw new Meteor.Error(err);
        }
      });
      imageId = image._id;
    }

    return imageId;
  },
  /* event inserting data */
  insert: function(t) {
    if (this._post) {
      //uploading file using cfs:fileSystem package + cfs:ejson
      var imageId = this._uploadImage();

      //set inserted doc
      var doc = this._getDoc(t);
      doc.imageId = imageId;

      Philosophies.insert(doc, function(err, _id) {
        if (err) {
          MeteorisFlash.set('danger', err.message);
          throw new Meteor.Error(err);
        }
        MeteorisFlash.set('success', "Success Inserting Philosophies");
        Router.go('philosophiesView', {_id: _id});
      });
    }
    return this.render('philosophiesInsert', {});
  },
  /* event updating data */
  update: function(t) {
    var _id = this.getId();
    var model = this._loadModel(_id);

    if (this._post) {
      //uploading file using cfs:fileSystem package + cfs:ejson
      var imageId = this._uploadImage();

      //remove old image if user inputting new image
      if (imageId && model.imageId)
      Images.remove(model.imageId);

      //set updated doc
      var doc = this._getDoc(t);
      doc.imageId = imageId ? imageId : model.imageId;

      Philosophies.update(_id, {$set: doc}, function(err) {
        if (err) {
          MeteorisFlash.set('danger', err.message);
          throw new Meteor.Error(err);
        }
        MeteorisFlash.set('success', "Success Updating Philosophies");
      });
      Router.go('philosophiesView', {_id: _id});
    }
    return this.render('philosophiesUpdate', {
      data: {
        model: model,
      }
    });
  },
  /* event removing data by id */
  remove: function(_id) {
    Philosophies.remove(_id, function(err) {
      if (err) {
        MeteorisFlash.set('danger', err.message);
        throw new Meteor.Error(err);
      }
      MeteorisFlash.set('success', "Success Removing Philosophies");
    });
  },
  _loadModel: function(_id) {
    return Philosophies.findOne(_id);
  },
});
