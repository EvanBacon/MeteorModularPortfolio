/**
* This Code was created on April 2014
* If you find any bug, unreadable code, messy code, potential bug code, etc
* Please contact me at:
* Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
*/

Works = new Mongo.Collection("works");

var schemas = new SimpleSchema({
  title:{
    type:String,
    label: 'Title',
  },
  content:{
    type:String,
    label: 'Content',
  },
  date:{
    type:Date,
    label: 'Date',
    optional: true,
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

Works.attachSchema(schemas);

Works.allow({
  insert: function(userId, doc) {
    var result = Meteor.call('MugenRoleActions.getRoles', 'works', 'insert');
    return result;
  },
  update: function(userId, doc) {
    var result = Meteor.call('MugenRoleActions.getRoles', 'works', 'update');
    return result;
  },
  remove: function(userId, doc) {
    var result = Meteor.call('MugenRoleActions.getRoles', 'works', 'remove');
    return result;
  },
});

//activate groundDB for works collection to work offline
Ground.Collection(Works);

/* register helper for default relations */
Works.helpers({
  image: function() {
    return Images.findOne(this.imageId);
  },
  title: function() {
    return Works.findOne(this.title);
  },
  content: function() {
    return Works.findOne(this.content);
  },
  date: function() {
    return Works.findOne(this.date);
  },

  createdUser: function() {
    return Meteor.users.findOne(this.createdUserId);
  },
  updatedUser: function() {
    return Meteor.users.findOne(this.updatedUserId);
  },
});
