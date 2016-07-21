Meteor.publishComposite('articles', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Articles with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Articles.find(doc, sort);
        },
        children: [
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
            /* return all related Articles */
{
find: function(collection) {
return Articles.find(collection.title);}
},
/* return all related Articles */
{
find: function(collection) {
return Articles.find(collection.content);}
},
/* return all related Articles */
{
find: function(collection) {
return Articles.find(collection.date);}
},

        ],
    }
});


Meteor.methods({
    "Articles.insert": function(doc) {
        var _id = Articles.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */

 var query = Articles.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
