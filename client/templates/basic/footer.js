Template.templateBasicFooter.helpers({
  user() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    return user;
  },
  username() {
    var user = Meteor.users.findOne({}, { sort: { 'profile.mugenRoleGroupId': 1 } });
    // console.log("user", user.profile);
    return user;
  },
  year: function () {
    return (new Date()).getFullYear();
  },
  social: function () {
    var user = Settings.findOne();
    console.log("footer",user);
    return user;
  },
});
