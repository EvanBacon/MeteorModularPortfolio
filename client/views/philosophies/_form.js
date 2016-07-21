Template.philosophies_form.rendered = function() {

};

Template.philosophies_form.helpers({
  /* show error message on view */
  error: function(field) {
    return MeteorisSimpleSchema.error(Philosophies, field);
  },
  /* get current selected dropdown */
  selected: function(_id) {
    if (this._id === _id)
    return "selected";
  },
  philosophies: function() {
    return Philosophies.find({});
  },

});
