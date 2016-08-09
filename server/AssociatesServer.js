Meteor.publishComposite('associates', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Associates with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Associates.find(doc, sort);
        },
        children: [
          {
            find: function(collection) {
              return Images.find({_id: collection.imageId});
            }
          },
            /* return all related Users */
            {
                find: function(collection) {
                    return Meteor.users.find({
                        $or: [
                            {_id: collection.createdUserId},
                            {_id: collection.updatedUserId},
                        ]
                    });
                }
            },

        ],
    }
});


Meteor.methods({
    "Associates.insert": function(doc) {
        var _id = Associates.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
 var query = Associates.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
