Meteor.publishComposite('works', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Works with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Works.find(doc, sort);
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
            /* return all related Works */
{
find: function(collection) {
return Works.find(collection.title);}
},
/* return all related Works */
{
  find: function(collection) {
  return Works.find(collection.isWork);}
  },
  /* return all related Works */
  {
find: function(collection) {
return Works.find(collection.content);}
},
/* return all related Works */
{
find: function(collection) {
return Works.find(collection.date);}
},

        ],
    }
});


Meteor.methods({
    "Works.insert": function(doc) {
        var _id = Works.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
 var query = Works.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
