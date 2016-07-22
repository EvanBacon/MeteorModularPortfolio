Template.contactIndex.helpers({
  user() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    return user;
  },
  username() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    console.log("user", user.profile);
    return user.profile.name;
  },
  linkedin() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    console.log("user", user.linkedin);
    return user.linkedin;
  }
});

Template.socialLinks.helpers({
  user() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    return user;
  },

  username() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    console.log("user", user.profile);
    return user.profile.name;
  },
  linkedin() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    console.log("linked ", user.linkedin);
    return user.linkedin;
  }
});
