// page preloader
jQuery(window).on('load', function () { jQuery("#preloader").fadeOut(500); });

//On Scroll Header fixed to top
$(window).scroll(function () {
  if ($(window).scrollTop() >= 500) {
    $('header').addClass('fixed-top');
  }
  else {
    $('header').removeClass('fixed-top');
  }
});

// mega menu - wsmenu
arrow = '<span class="wsmenu-click"><i class="wsmenu-arrow bi bi-chevron-down"></i></span>';

$(function () {
  $('#wsnavtoggle')['click'](function () {
    $('.wsmenucontainer')['toggleClass']('wsoffcanvasopener')
  });
  $('.overlapblackbg')['click'](function () {
    $('.wsmenucontainer')['removeClass']('wsoffcanvasopener')
  });
  $('.wsmenu-list> li')['has']('.wsmenu-submenu')['prepend'](arrow);
  $('.wsmenu-list > li')['has']('.megamenu')['prepend'](arrow);
  $('.wsmenu-click')['click'](function () {
    $(this)['toggleClass']('ws-activearrow')['parent']()['siblings']()['children']()['removeClass']('ws-activearrow');
    $('.wsmenu-submenu, .megamenu')['not']($(this)['siblings']('.wsmenu-submenu, .megamenu'))['slideUp']('slow');
    $(this)['siblings']('.wsmenu-submenu')['slideToggle']('slow');
    $(this)['siblings']('.megamenu')['slideToggle']('slow')
  });
  $('.wsmenu-list > li > ul > li')['has']('.wsmenu-submenu-sub')['prepend']('<span class="wsmenu-click02"><i class="wsmenu-arrow bi bi-chevron-down"></i></span>');
  $('.wsmenu-list > li > ul > li > ul > li')['has']('.wsmenu-submenu-sub-sub')['prepend']('<span class="wsmenu-click02"><i class="wsmenu-arrow bi bi-chevron-down"></i></span>');
  $('.wsmenu-click02')['click'](function () {
    $(this)['children']('.wsmenu-arrow')['toggleClass']('wsmenu-rotate');
    $(this)['siblings']('.wsmenu-submenu-sub')['slideToggle']('slow');
    $(this)['siblings']('.wsmenu-submenu-sub-sub')['slideToggle']('slow')
  });
});

//hero slick slider
$(document).ready(function () {
  $('.carouselhero').slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  }).slickAnimation();
});

//testimonial slider
$(document).ready(function () {
  $('.carouselTestimonials').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //prevArrow: $('.prev'),
    //nextArrow: $('.next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
});

//partner slider
$(document).ready(function () {
  $('.carouselPartner').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        }
      }
    ]
  });
});

//On Scroll back to top
$(window).on('scroll', function () {

  // Back Top Button
  if ($(window).scrollTop() > 500) {
    $('.scrollup').addClass('back-top');
  } else {
    $('.scrollup').removeClass('back-top');
  }
});
// On Click Section Switch
// used for back-top
$('[data-type="section-switch"]').on('click', function () {
  if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
    var target = $(this.hash);
    if (target.length > 0) {

      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

// wow js
$(document).ready(function () {
  wow = new WOW(
    {
      boxClass: 'wow',      // default
      animateClass: 'animated', // default
      offset: 0,          // default
      mobile: true,       // default
      live: true        // default
    }
  )
  wow.init();
});

// int nice select
$(document).ready(function () {
  $('select').niceSelect();
});

// Search model
$('.search-switch').on('click', function () {
  $('.search-model').fadeIn(400);
});
$('.search-close-switch').on('click', function () {
  $('.search-model').fadeOut(400, function () {
    $('#search-input').val('');
  });
});

// plus minus button
$(document).ready(function () {
  $('.button-minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.button-plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

// tooltip function
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Wishlist notify
$('.wishlist').on("click", function () {
  $('.wish-notify').fadeIn().append('<p class="wish-note">Add product in <a href="shop-wishlist.html"> Wishlist</a> Successfully!</p>');
  setTimeout(function () {
    $('.wish-note').fadeOut()
  }, 1000);
});
// compare notify
$('.compare').on("click", function () {
  $('.compare-notify').fadeIn().append('<p class="compare-note">Add product in <a href="compare.html"> <i class="bi bi-arrow-repeat"></i>Compare list</a> Successfully!</p>');
  setTimeout(function () {
    $('.compare-note').fadeOut()
  }, 2000);
});
// Add to cart button notify
$('.add-to-cart').on("click", function () {
  $('.cart-notify').fadeIn();
  setTimeout(function () {
    $('.cart-notify').fadeOut()
  }, 2000);
});

// product slider
$(document).ready(function () {
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
  });
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    centerMode: true,
    focusOnSelect: true
  });
});
// modal open show product gallery
$('.modal').on('shown.bs.modal', function (e) {
  $('.slider-for').slick('setPosition');
  $('.slider-nav').slick('setPosition');
});

// zoom product gallery

function zoom(e) {
  var zoomer = e.currentTarget;
  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
  x = offsetX / zoomer.offsetWidth * 100
  y = offsetY / zoomer.offsetHeight * 100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

// deal zone slider
$(document).ready(function () {
  $('.carouselDeal').slick({
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: $('.prevDeal'),
    nextArrow: $('.nextDeal'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});

// Add active class to the current button (highlight it)
$(function () {
  $('#dashboard li a').filter(function () { return this.href == location.href }).parent().addClass('active').siblings().removeClass('active')
  $('#dashboard li a').click(function () {
    $(this).parent().addClass('active').siblings().removeClass('active')
  })
});

// whishlist table select checkbox
$(".selectall").click(function () {
  $(".individual").prop("checked", $(this).prop("checked"));
});

//category slider
$(document).ready(function () {
  $('.carouselCat').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    //prevArrow: $('.prev'),
    //nextArrow: $('.next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
});