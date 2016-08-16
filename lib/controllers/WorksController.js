WorksController = MeteorisController.extend({
  /* get subscribtion from server with parameter criteria, and sort/limit */
  subscriptions: function() {
    var sort = MeteorisGridView.getSorting();
    sort.limit = this.limit();

    // this.subs.subscribe('works', {});

    this.subscription = this.subs.subscribe('works', this.getCriteria(), sort);
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
        {date: {$regex: search, $options: 'i'}},

      ]
    };
  },
  index: function() {
    var sort = MeteorisGridView.getSorting();
    sort.limit = this.limit();
    var models = Works.find(this.getCriteria(), sort);

    return this.render('worksIndex', {
      data: {
        ready: this.subscription.ready,
        isEmpty: models.count() === 0 ? true : false,
        models: models,
        hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
      }
    });
  },
  view: function() {
    return this.render('worksView', {
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
      date: t.find('#date').value? new Date(t.find('#date').value):null,
      isWork: t.find('#isWork').checked,

    };
  },
  /* uploading file using cfs:fileSystem package + cfs:ejson */
  _uploadImage: function() {
    // FS.Utility.eachFile($('#image').get(0).files, function(file) {
    // Images.insert(file, function (err, fileObj) {
    //   if (err) {
    //     MeteorisFlash.set('danger', err.message);
    //     throw new Meteor.Error(err);
    //   }
    // // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    //   });
    // });

    var files = $('#image').get(0).files;

var imageIds = [];
    for (file in files) {
    // var imageIds = _.map(files, function (file) {

      Images.insert(file, function (err, fileObj) {
        if (err) {
          MeteorisFlash.set('danger', err.message);
          throw new Meteor.Error(err);
        }

      });
      // Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});


imageIds.push(image._id);
    // return image._id;
// });
    }


    //
    // var imageId = null;
    // var file = $('#image').get(0).files[0];
    // if (file) {
    //   var image = Images.insert(file, function(err) {
    //     if (err) {
    //       MeteorisFlash.set('danger', err.message);
    //       throw new Meteor.Error(err);
    //     }
    //   });
    //   imageId = image._id;
    // }

    return imageIds;
  },
  /* event inserting data */
  insert: function(t) {
    if (this._post) {
      //uploading file using cfs:fileSystem package + cfs:ejson
      var imageId = this._uploadImage();

      //set inserted doc
      var doc = this._getDoc(t);
      doc.imageId = imageId;

      Works.insert(doc, function(err, _id) {
        if (err) {
          MeteorisFlash.set('danger', err.message);
          throw new Meteor.Error(err);
        }
        MeteorisFlash.set('success', "Success Inserting Works");
        Router.go('worksView', {_id: _id});
      });
    }
    return this.render('worksInsert', {});
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

      Works.update(_id, {$set: doc}, function(err) {
        if (err) {
          MeteorisFlash.set('danger', err.message);
          throw new Meteor.Error(err);
        }
        MeteorisFlash.set('success', "Success Updating Works");
      });
      Router.go('worksView', {_id: _id});
    }
    return this.render('worksUpdate', {
      data: {
        model: model,
      }
    });
  },
  /* event removing data by id */
  remove: function(_id) {
    Works.remove(_id, function(err) {
      if (err) {
        MeteorisFlash.set('danger', err.message);
        throw new Meteor.Error(err);
      }
      MeteorisFlash.set('success', "Success Removing Works");
    });
  },
  _loadModel: function(_id) {
    return Works.findOne(_id);
  },
});
