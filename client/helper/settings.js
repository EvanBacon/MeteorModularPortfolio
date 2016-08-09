// a place to store temporary preference settings for the client
ClientSettings = new Meteor.Collection(null);

removeClientSetting = function(name) {
	ClientSettings.remove({'setting': name});
};

getClientSetting = function(name) {
	var setting = ClientSettings.findOne({'setting': name});
	if (!! setting)
		return setting.value;
};

setClientSetting = function(name, value) {
	if (! ClientSettings.findOne({'setting': name})) {
		ClientSettings.insert({'setting': name, 'value': value });
	} else {
		ClientSettings.update({'setting': name}, { $set: { 'value': value }});
	}
};

// get value from Settings collection
UI.registerHelper('getSetting', function(setting, defaultArgument){
  	var defaultArgument = (typeof defaultArgument !== 'undefined') ? defaultArgument : '';
		console.log("Request", setting, Settings);

  	// check if Settings has loaded, otherwise return a blank string
    if (!! Settings && !! Settings.find().count() ) {
	  var setting = getSetting(setting, defaultArgument);
	  if (typeof setting === "string" || typeof setting === "number" || typeof setting === "boolean")
		console.log("Return", setting);

	  	return setting;
	}
	console.log("Return nil");

	return '';
});

UI.registerHelper('settingsAvailable', function () {
	return !! Settings && !! Settings.find().count();
});
