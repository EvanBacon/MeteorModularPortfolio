Meteor.startup(function() {
  console.log("startup");
  console.log("settings count", Settings.find().count());
	if (Settings.find().count() === 0) {
    console.log("adding");

		Settings.insert({
			"aboutCode" : "<p class=\"text-center\">\nGo to <a href=\"/admin/settings\">settings</a> to add some content here.</p>\n",
			"footerCode" : "<div class=\"home-links\">\n\t\t<a href=\"/albums\">Albums</a> / \n\t\t<a href=\"/about\">About</a> / \n\t\t<a href=\"/contact\">Contact</a>\n<br>\n</div>",
			"homeDescription" : "Go to <a href=\"/admin/settings\">settings</a> to add some content here.</p>\n",
			"imageMaxSize" : 500000,
			"imageMaxWidth" : 1400,
			"imageWidthLarge" : 800,
			"imageWidthMedium" : 450,
			"imageWidthThumb" : 250,
			"numberSamplesFromAlbum" : 3,
			"mediaPerPage" : 30,
			"siteDescription" : "An image gallery manager built with Meteor.js"
		});

	}
});
