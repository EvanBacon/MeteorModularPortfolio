Template.articles_form.rendered = function() {
    $('#date').datepicker();
};

Template.articles_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Articles, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    articles: function() {
return Articles.find({});
},
articles: function() {
return Articles.find({});
},
articles: function() {
return Articles.find({});
},

});