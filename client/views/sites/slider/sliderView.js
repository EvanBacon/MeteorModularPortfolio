Template.slider.rendered = function() {
  $(document).ready(function(){
    console.log("first");
    // $('.carousel.carousel-slider').carousel({full_width: true, indicators: true});

    $('.slider').slider({full_width: true, indicators:false, height: '80vh'});
  });
};

Template.slider.helpers({
  nameForIndex(index) {
    let nums = ["one","two","three", "four"];
    return nums[index];
  },
  init() {
    console.log("log init");
    // $('.carousel.carousel-slider').carousel({full_width: true, indicators: true});

    $('.slider').slider({full_width: true, indicators:false, height: '80vh'});
  }

});
