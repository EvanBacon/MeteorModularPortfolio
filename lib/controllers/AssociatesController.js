AssociatesController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();


        this.subscription = this.subs.subscribe('associates', this.getCriteria(), sort);
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
                {name: {$regex: search, $options: 'i'}},
{title: {$regex: search, $options: 'i'}},
{description: {$regex: search, $options: 'i'}},
{facebook: {$regex: search, $options: 'i'}},
{twitter: {$regex: search, $options: 'i'}},
{linkedin: {$regex: search, $options: 'i'}},
{website: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Associates.find(this.getCriteria(), sort);

        return this.render('associatesIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('associatesView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            name: t.find('#name').value,
title: t.find('#title').value,
description: t.find('#description').value,
facebook: t.find('#facebook').value,
twitter: t.find('#twitter').value,
linkedin: t.find('#linkedin').value,
website: t.find('#website').value,

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

            Associates.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Associates");
                Router.go('associatesView', {_id: _id});
            });
        }
        return this.render('associatesInsert', {});
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

            Associates.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Associates");
            });
            Router.go('associatesView', {_id: _id});
        }
        return this.render('associatesUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Associates.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Associates");
        });
    },
    _loadModel: function(_id) {
        return Associates.findOne(_id);
    },
});
