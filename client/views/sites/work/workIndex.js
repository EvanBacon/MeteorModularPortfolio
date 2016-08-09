Template.workCardWrapper.helpers({
  round() {
    // console.log(Math.random());
    return (Math.round(Math.random()) == 0) ? "round" : "";
  },

  multi() {
    // return true;

    return (Math.round(Math.random()) == 0);
  },
  randWidth() {
    const max = 50;
    const min = 35;
    let w = (Math.random() * (max - min) + min);
    console.log(w);
    return w;
  },

  randOffset() {
    const max = 70;
    const min = 35;
    let w = (Math.random() * (max - min) + min);
    console.log(w);
    return w;
  },
  randomCol() {

    if (Math.round(Math.random()) == 0) {
      return (Math.round(Math.random()) == 0) ? "m6" : "m8";
    } else {
      return (Math.round(Math.random()) == 0) ? "m6  offset-m2" : "m7 offset-m5";
    }


  }
});

Template.workCardWrapper.rendered = function() {
  jQuery(document).ready(function($) {
    // console.log("update height");
    // var cw = $('.equal-ratio').width();
    // $('.equal-ratio').css({'height':cw+'px', 'min-height': cw+'px'});

    $( window ).resize(function() {
      console.log("update height");

      var cw = $('.equal-ratio').width();
      $('.equal-ratio').css({'height':cw+'px', 'min-height': cw+'px'});
    });


  });
};
