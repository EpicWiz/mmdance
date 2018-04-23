$(function() {

  //animated nav-scroll arrow
  let growShrink = () => {
    let aSRC = $('#topDownArrow').attr('src');
    if (aSRC === './images/arrow2.png') {
      $('#topDownArrow').css({ '-moz-transform': 'scale(0.8) translateY(-100%)', '-webkit-transform': 'scale(0.8) translateY(-100%)', 'transform': 'scale(0.8) translateY(-100%)' });
      setTimeout(function() {
        $('#topDownArrow').css({ '-moz-transform': 'scale(1) translateY(-100%)', '-webkit-transform': 'scale(1) translateY(-100%)', 'transform': 'scale(1) translateY(-100%)' }); }, 450);
      setTimeout(function() { growShrink(); }, 1000);
    } else {
      setTimeout(function() { growShrink(); }, 1000);
    }
  };

  growShrink();

  //make arrow vis/invis
  let windowTop = () => {
    let scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $('#topDownArrow').css({'opacity': '0'});
    } else {
      $('#topDownArrow').css({'opacity': '1'});
    }
  };

  windowTop(); //check on page load to see if arrow should be visible

  //check of the arrow should be visible following a scroll event
  $(window).scroll(function(event) {
    windowTop();
  });

  //change to black arrow on hover
  $('#topDownArrow').on('mouseenter', function() {
    $('#topDownArrow').attr('src', './images/arrow1.png');
  });

  //change back to red arrow no hover
  $('#topDownArrow').on('mouseleave', function() {
    $('#topDownArrow').attr('src', './images/arrow2.png');
  });

  //smooth scroll from top to article/youtube
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
  });

  //bring down social menu
  $('#social').on('click', function() {
    if ($('#contactDrop').css('top') != '0px') {
      $('#contactDrop').css('top', '0px');
      $('#downCarrot2').css({
        '-ms-transform': 'rotate(0deg)',
        '-webkit-transform': 'rotate(0deg)',
        'transform': 'rotate(0deg)'
      });

    }

    if ($('#socialDrop').css('top') != '0px') {
      $('#socialDrop').css('top', '0px');
      $('#downCarrot').css({
        '-ms-transform': 'rotate(0deg)',
        '-webkit-transform': 'rotate(0deg)',
        'transform': 'rotate(0deg)'
      });
    } else {
      $('#socialDrop').css('top', '78px');
      $('#downCarrot').css({
        '-ms-transform': 'rotate(450deg)',
        '-webkit-transform': 'rotate(450deg)',
        'transform': 'rotate(450deg)'
       })
    }
  });

  //bring down contact menu
  $('#contact').on('click', function() {
    if ($('#socialDrop').css('top') != '0px') {
      $('#socialDrop').css('top', '0px');
      $('#downCarrot').css({
        '-ms-transform': 'rotate(0deg)',
        '-webkit-transform': 'rotate(0deg)',
        'transform': 'rotate(0deg)'
      });
    }

    if ($('#contactDrop').css('top') != '0px') {
      $('#contactDrop').css('top', '0px');
      $('#downCarrot2').css({
        '-ms-transform': 'rotate(0deg)',
        '-webkit-transform': 'rotate(0deg)',
        'transform': 'rotate(0deg)'
      });
    } else {
      $('#contactDrop').css('top', '78px');
      $('#downCarrot2').css({
        '-ms-transform': 'rotate(450deg)',
        '-webkit-transform': 'rotate(450deg)',
        'transform': 'rotate(450deg)'
       })
    }
  });

  //make down carrot red for social
  $('#social').on('mouseenter', function() {
    $('#downCarrot').attr('src', './images/sideCarrot2.png');
  });

  $('#social').on('mouseleave', function() {
    $('#downCarrot').attr('src', './images/sideCarrot.png');
  });

  //make down carrot red for contact
  $('#contact').on('mouseenter', function() {
    $('#downCarrot2').attr('src', './images/sideCarrot2.png');
  });

  $('#contact').on('mouseleave', function() {
    $('#downCarrot2').attr('src', './images/sideCarrot.png');
  });

  //view all arrow movement
  $('.viewAll').on('mouseenter', function() {
    $(this).find(".vaArrow").css({ 'left': '10px' });
  });

  //view all arrow movement
  $('.viewAll').on('mouseleave', function() {
    $(this).find(".vaArrow").css({ 'left': '0' });
  });

  //CONTACT FORM
  $("#contactForm").submit(function(event) {
    event.preventDefault();
    submitForm();
  });

  let submitForm = () => {
    let name = $("#name").val();
    let email = $("#email").val();
    let subject = $("#subject").val();
    let message = $("#message").val();

    $.ajax({
      type: "POST",
      url: "./contact.php",
      data: {
        name: name,
        email: email,
        subject: subject,
        message: message,
        captcha: grecaptcha.getResponse()
      },
      success: function(text){
        if (text == "Recaptcha Success, Mail Sent Successfully") {
          console.log("Mail Sent :" + text);
          formSuccess();
        } else {
          console.log("Mail Send Failure :" + text);
          // $.parseJSON(text);
        }
      }
    });

  };

  let formSuccess = () => {
    $("#msgSubmit").removeClass("hidden");
  };

});
