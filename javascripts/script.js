/* Author:

*/


// Global Variables

var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);



// Miscellaneous JS

(function($) {


	function slideMenu() {
		$('.toggle-open').on('click', function(event) {
			event.preventDefault();
			$('body').addClass('menu-open');
			$('.menu-backdrop').fadeIn();
		});	

		$('.toggle-close, .menu-backdrop').on('click', function(event) {
			event.preventDefault();
			$('body').removeClass('menu-open');
			$('.menu-backdrop').fadeOut(200);
		});

	}


	function dropdownInit() {
		var dropdown = $('.dropdown');
		dropdown.each(function() {
			var $this = $(this);
			var dropdownContent = $this.find('.dropdown-content');
			if (dropdown.hasClass('hover')) {
				dropdown.on('mouseenter', function() {
					$this.addClass('dropdown-show').outerWidth();
					$this.addClass('dropdown-animate');
				}).on('mouseleave', function() {
					$this.removeClass('dropdown-animate').one('transitionend webkit', function() {
						$this.removeClass('dropdown-show');
					});
				});
			} else {
				dropdown.on('click', function() {
					if (dropdownContent.is(':hidden')) {
						$this.addClass('dropdown-show').outerWidth();
						$this.addClass('dropdown-animate');
					} else {
						$this.removeClass('dropdown-animate').one('transitionend webkit', function() {
							$this.removeClass('dropdown-show');
						});
					}
				});
			}
		});


		// $(document).on('click', function(event) {
		// 	if (!$(event.target).closest('.dropdown').length) {
		// 		$('.dropdown').removeClass('dropdown-animate').one('transitionend webkit', function() {
		// 			$(this).removeClass('dropdown-show');
		// 		});
		// 	}
		// });
		
	}



	function panelHeight() {
		$('.panel').on('mouseenter', function() {
			var $this = $(this);
			var $thisHeight = $this.height();
			var panelHover =$this.find('.panel-hover');
			var panelHoverContent = $this.find('.panel-hover-content');
			var panelHoverHeight = panelHoverContent.height() + 6;
			//console.log(''+$this.height()+' '+panelHoverHeight+'');
			if ($this.height() < panelHoverHeight || $) {
				panelHover.height(panelHoverHeight);
			} else {
				
			}
		});
	}



	function btt() {
		$('.btt-btn').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 350, 'easeInExpo');
		});	
	}



	function popupInit() {
		$('.popup-btn').magnificPopup({
			type: 'inline',

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,
			
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in'
		});


		if ($('#welcome-intro').length > 0) {

			setTimeout(function() {
				$.magnificPopup.open({
			        items:{
			            src: '#welcome-intro',
			            type: 'inline'
			        },
			        fixedContentPos: true,
			        fixedBgPos: true,
			        overflowY: 'auto',
			        closeBtnInside: true,
			        preloader: false,
			        midClick: true,
			        removalDelay: 300,
			        mainClass: 'my-mfp-zoom-in'
			    });
			}, 2000);

		}
	}



	equalheight = function(container){

	var currentTallest = 0,
	     currentRowStart = 0,
	     rowDivs = new Array(),
	     $el,
	     topPosition = 0;
	 $(container).each(function() {

	   $el = $(this);
	   $($el).height('auto');
	   topPostion = $el.position().top;

	   if (currentRowStart != topPostion) {
	     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	       rowDivs[currentDiv].height(currentTallest);
	     }
	     rowDivs.length = 0; // empty the array
	     currentRowStart = topPostion;
	     currentTallest = $el.height();
	     rowDivs.push($el);
	   } else {
	     rowDivs.push($el);
	     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	     rowDivs[currentDiv].height(currentTallest);
	   }
	 });
	};

	$(window).load(function() {
	  equalheight('.panel-grid .panel');
	});


	$(window).resize(function(){
	  equalheight('.panel-grid .panel');
	});




	function customSelect() {
		$('.custom-select').each(function() {
			var $this = $(this),
				$option = $this.children('option'),
				$optionLength = $option.length;

			$this.hide();
			$this.wrap('<div class="dd-select"></div>');
			$this.after('<div class="dd-select-text"></div>');


			
			var $selectText = $this.next('.dd-select-text');
			$selectText.text($option.eq(0).text());

			var $ddWrapper = $('<div />', {
				'class': 'dd-list'
			}).insertAfter($selectText);

			var $ul = $('<ul />', {
				'class': 'dd-list-content'
			}).appendTo($ddWrapper);

			for (var i = 0; i < $optionLength; i++) {
				$('<li />', {
					text: $option.eq(i).text(),
					rel: $option.eq(i).val()
				}).appendTo($ul);
			}


			var $listItems = $ul.children('li');
			var $ddList = $this.find('.dd-list');
			
			$selectText.on('click', function(event) {
				event.preventDefault();
				$('.dd-select-text').removeAttr('style');
				$('.dd-list').fadeOut(200);
				$('.dd-select-text').removeClass('active');
				var $scroll = $(this).next().find('.custom-scroll');
				if ($ddWrapper.is(':hidden')) {
					$(this).addClass('active');
					$ddWrapper.slideDown(250);
					//$scroll.perfectScrollbar();
				} else {
					$(this).removeClass('active');
					$ddWrapper.fadeOut(200);
					$selectText.removeAttr('style');
				}
			});


			$listItems.on('click', function(event) {
				event.preventDefault();
				var $thisValue = $(this).text();
				$selectText.text($thisValue);
				$selectText.removeClass('active');
				$ddWrapper.fadeOut(200);
				$selectText.removeAttr('style');
			});


			$(document).on('click', function(event) {
				if (!$(event.target).closest('.dd-select').length) {
					$ddWrapper.fadeOut(200);
					$selectText.removeClass('active');
					$selectText.removeAttr('style');
				}
			});

		});
	}


	if (!isMobile) {
		customSelect();
	}


	$(window).on('load', function() {

	});


	$(document).ready(function() {
		FastClick.attach(document.body);
		
		slideMenu();
		dropdownInit();
		panelHeight();
		btt();
		popupInit();


	});
	
})(jQuery);