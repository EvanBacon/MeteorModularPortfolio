/**
* This Code was created on April 2014
* If you find any bug, unreadable code, messy code, potential bug code, etc
* Please contact me at:
* Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
*/

Slides = new Mongo.Collection("slides");

var schemas = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
  },
  content: {
    type: String,
    label: 'Content',
  },
  date:{
    type: Date,
    label: 'Date',
    optional: true,
  },
  isSlide:{
    type: Boolean,
    label: 'IsSlide',
  },
  imageId: {
    type: String,
    label: "Image",
    optional: true,
  },
  /* AUTOVALUE */
  appId: {
    type: String,
    label: "App Id",
    autoValue: function() {
      if (this.isInsert)
      return App.id;
    },
  },
  createdAt: {
    type: Date,
    label: "Created Date",
    autoValue: function() {
      if (this.isInsert)
      return new Date;
    },
    denyUpdate: true,
    optional: true
  },
  updatedAt: {
    type: Date,
    label: "Updated Date",
    autoValue: function() {
      return new Date();
    },
    optional: true
  },
  createdUserId: {
    type: String,
    label: "Created by",
    autoValue: function() {
      if (this.isInsert)
      return Meteor.user()._id;
    },
    denyUpdate: true,
    optional: true
  },
  updatedUserId: {
    type: String,
    label: "Updated by",
    autoValue: function() {
      return Meteor.user()._id;
    },
    optional: true
  },
});

Slides.attachSchema(schemas);

Slides.allow({
  insert: function(userId, doc) {
    var result = Meteor.call('MugenRoleActions.getRoles', 'slides', 'insert');
    return result;
  },
  update: function(userId, doc) {
    var result = Meteor.call('MugenRoleActions.getRoles', 'slides', 'update');
    return result;
  },
  remove: function(userId, doc) {
    var result = Meteor.call('MugenRoleActions.getRoles', 'slides', 'remove');
    return result;
  },
});

//activate groundDB for slides collection to work offline
Ground.Collection(Slides);

Slides.helpers({
  image: function() {
    return Images.findOne(this.imageId);
  },
  title: function() {
    return Slides.findOne(this.title);
  },
  date: function() {
    return Slides.findOne(this.date);
  },
  isSlide: function() {

    return (this.isSlide == true) ? true : "false";
  },
  content: function() {
    return Slides.findOne(this.content);
  },

  createdUser: function() {
    return Meteor.users.findOne(this.createdUserId);
  },
  updatedUser: function() {
    return Meteor.users.findOne(this.updatedUserId);
  },
});
