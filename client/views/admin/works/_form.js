Template.works_form.rendered = function() {
    $('#date').datepicker();
};

Template.works_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Works, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    works: function() {
return Works.find({});
},


});
