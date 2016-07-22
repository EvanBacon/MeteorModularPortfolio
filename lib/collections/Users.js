//activate groundDB for users collection to work offline
//GroundDB(Meteor.users);

Meteor.users.helpers({
    mugenRoleGroup: function() {
        return MugenRoleGroups.findOne(this.profile.mugenRoleGroupId);
    },
});

Meteor.users.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'users', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'users', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'users', 'remove');
        return result;
    },
});

/* register helper for default relations */
Meteor.users.helpers({
  // image: function() {
  //   return Images.findOne(this.imageId);
  // },
  linkedin: function() {
    return Meteor.users.findOne(this.linkedin);
  },
  // content: function() {
  //   return Works.findOne(this.content);
  // },
  // date: function() {
  //   return Works.findOne(this.date);
  // },
});
