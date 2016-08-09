AutoForm.hooks({

  updateSettingsForm: {

    before: {
      update: function(modifier, doc) {
        console.log("mod", modifier, doc);
      	updateSaveButton('wait');
        return doc;
      }
    },

    onSuccess: function(operation, result) {
      updateSaveButton('complete');
    },

    onError: function(operation, result) {
    	updateSaveButton('error');
    }
  },

  insertSettingsForm: {

    before: {
      insert: function(doc) {
        console.log("doc", doc);
        updateSaveButton('wait');
        return doc;
      }
    },

    onSuccess: function(operation, result) {
		  updateSaveButton('complete')
    },

    onError: function(operation, result) {
    	updateSaveButton('error');
    }
  }
});

Template.settings.events({
	'change :input, keyup :input': function () {
		pageChanged(true);
	}
});
