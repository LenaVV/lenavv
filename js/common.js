$(function() {

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,
    
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  
  $(".top-line .sf-menu").superfish({
    	cssArrows: false,
      hoverClass: '0'
    });

  $(".service-item-price").equalHeights();

  $(".product-prew").equalHeights();

  $(".sf-menu").after("<div id='my-menu'>")
  $(".sf-menu").clone().appendTo("#my-menu");
  $("#my-menu").find("*").attr("style", "")
  $("#my-menu").find("ul").removeClass("sf-menu")
  $("#my-menu").mmenu({
  	extensions: ['widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-blakc']
  	
  });

  $(".mobile-mnu").click(function() {
  var mmAPI = $("#my-menu").data("mmenu");
  mmAPI.open();
  var thiss = $(this).find(".toggle-mnu");
  thiss.toggleClass("on");
  $(".main-mnu").slideToggle();
  return false;
  });
  
  
    var owl = $(".slider");
    
    owl.owlCarousel({
    	loop: true,
    	items: 1,
    	itemClass: "slide-wrap",
    	nav: true,
    	navText: "",

    });

    $(".prev").click(function(){
    	owl.trigger('prev.owl.carousel');
    });

    $(".next").click(function(){
    	owl.trigger('next.owl.carousel');
    });

 var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 3; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: true,
    autoplay: true,
    loop: true,
    responsiveRefreshRate : 200,
    navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #676767;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #676767;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    nav: true,
    smartSpeed: 200,
    slideSpeed : 500,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    
    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$(".email").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(".success").addClass("visible");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
        $(".success").removeClass("visible");
        $.magnificPopup.close();
			}, 3000);
		});
		return false;
	});
  });

