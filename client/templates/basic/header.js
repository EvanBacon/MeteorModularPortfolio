Template.templateBasicHeader.events({
    'click #btnLogout': function() {
        Meteor.logout();
    }

});
Template.templateBasicHeader.rendered = function() {
  $(document).ready(function(){

  $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

  
  $('.collapsible').collapsible();

});

};
