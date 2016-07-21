Meteor.publishComposite('philosophies', function(doc, sort) {
  doc.appId = App.id;
  console.log("subscribing some Philosophies with it's relation in App Id = " + App.id);
  return{
    find: function() {
      return Philosophies.find(doc, sort);
    },
    children: [
      /* return all related Images */
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
      /* return all related Philosophies */
      {
        find: function(collection) {
          return Philosophies.find(collection.title);}
        },
        /* return all related Philosophies */
        {
          find: function(collection) {
            return Philosophies.find(collection.content);}
          }
          ],
        }
      });


      Meteor.methods({
        "Philosophies.insert": function(doc) {
          var _id = Philosophies.insert(doc);
          return {
            _id: _id,
          }
        },
      });

      /* observing collection */
      var query = Philosophies.find({});
      var handle = query.observe({
      removed: function(model) {
      //removing related image, when post removed
      Images.remove(model.imageId);
    }
  });
