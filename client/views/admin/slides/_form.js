Template.slides_form.rendered = function() {
  $('#date').datepicker();
};

Template.slides_form.helpers({
  /* show error message on view */
  error: function(field) {
    return MeteorisSimpleSchema.error(Slides, field);
  },
  /* get current selected dropdown */
  selected: function(_id) {
    if (this._id === _id)
    return "selected";
  },
  slides: function() {
    return Slides.find({});
  },
});
