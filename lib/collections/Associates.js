/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Associates = new Mongo.Collection("associates");

var schemas = new SimpleSchema({
    name:{
type:String,
label: 'Name',
optional: true,
},
imageId: {
  type: String,
  label: "Image",
  optional: true,
},
title:{
type:String,
label: 'Title',
optional: true,
},
description:{
type:String,
label: 'Description',
optional: true,
},
facebook:{
type:String,
label: 'Facebook',
optional: true,
},
twitter:{
type:String,
label: 'Twitter',
optional: true,
},
linkedin:{
type:String,
label: 'Linkedin',
optional: true,
},
website:{
type:String,
label: 'Website',
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

Associates.attachSchema(schemas);

Associates.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'associates', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'associates', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'associates', 'remove');
        return result;
    },
});

//activate groundDB for associates collection to work offline
/* uncomment to use
 Ground.Collection(Associates);
 */

/* register helper for default relations */
Associates.helpers({
  image: function() {
    return Images.findOne(this.imageId);
  },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});
