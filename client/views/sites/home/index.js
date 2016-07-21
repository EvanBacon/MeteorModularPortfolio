
if (Meteor.isClient) {
  Meteor.startup(function() {
    window.sr = ScrollReveal({ reset: true });

  });
}

Template.story.helpers({
  isEven(index) {
    if(index % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }
});

Template.imageBlockRight.rendered = function() {
  $(document).ready(function(){
    sr.reveal('.fadein');
    $('.scrollspy').scrollSpy();
  });
};
Template.imageBlockLeft.rendered = function() {
  $(document).ready(function(){
    sr.reveal('.fadein');
    $('.scrollspy').scrollSpy();
  });
};




Template.sitesIndex.rendered = function() {
  $(document).ready(function(){
    sr.reveal('.fadein');
    $('.scrollspy').scrollSpy();
  });
};

Template.workIndex.rendered = function() {
  $(document).ready(function(){
    sr.reveal('.fadein');
    $('.scrollspy').scrollSpy();
  });
};

Template.philosophyIndex.rendered = function() {
  $(document).ready(function(){
    sr.reveal('.fadein');

    $('.scrollspy').scrollSpy();
  });
};
