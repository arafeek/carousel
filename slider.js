// Updated 24-02-15
// Adam Rafeek

$(document).ready(function(){

	var currentPosition = 0;
	var slides = $('ul.slides>li').length === 0 ? $('div.slideshowStrip>div') : $('ul.slides>li');
	var thumbnails = $('ul.thumbs>li').length === 0 ? $('ol.carousel-bullets>li') : $('ul.thumbs>li');
	var numberOfSlides = slides.length;
	var autoSlide = ($('ul.slides.autoSlide').length === 0) ? false : true;
	var defaultOn = ($('ul.slides.autoSlide.default-on').length === 0) ? false : true;
	var autoSlideEnabled = autoSlide;
	var carouselTimer = null;
	var slideshowControls = $('#slideshow-controls');
    var slidesContainer = $('#slidesContainer');
    // Touch vars
	var startX;
	var startTime;

	init();

	if(!defaultOn) {
		autoSlideEnabled = false;
	}
	
  	$('.control').bind('click', function(){
	    var newPosition
		if($(this).attr('id')=='rightControl') {
			newPosition = currentPosition + 1;
		} else {
			newPosition = currentPosition - 1;
		}

	    animateSlider(newPosition);
	    resetTimer();
  	});

    // Clicking on the slideshow moves the slide from left to right
  	$('#slidesContainer').bind('click', function() {
  		animateSlider(currentPosition+1);
  		resetTimer();
  	});

	// removed :#slidesContainer for now since it caused an issue with the play/plause button displaying correctly
  	$('.animation-control-button').bind('click', function() {
  		if(autoSlide) {
  			console.log("autoSlide") // debug
	  		toggleSlideAnimation();
	  		if (autoSlideEnabled) {
	  			console.log("autoSlideEnabled") // debug
				carouselTimer = setInterval(function() {
				animateSlider(currentPosition + 1);
				}, 3000);
	  		} else {
	  			clearInterval(carouselTimer);
	  		}
  		}
  	});

    $('ul.thumbs>li, .control, #slidesContainer,ol.carousel-bullets>li, .animation-control-button').keypress(function(event){
  		if(event.keyCode == 13){
  			$(this).click();
	  	}
	});



	// Binds click event to thumbnail so you can control the slider with them
	$('ul.thumbs>li,ol.carousel-bullets>li').bind('click', function() {
		//if this isn't already the one we're looking at, hide it and show the new one
		var newPosition = $(this).index()
		if(!(newPosition == currentPosition)) {
			animateSlider(newPosition)
			resetTimer();
		}
	});

	if(defaultOn) {
		carouselTimer = setInterval(function() {
		animateSlider(currentPosition + 1);
		}, 3000);
	}


	$('#slideshow-controls>img.button-play').bind('click', function() {
		$(this).css(({'display':'none'}));
		$('#slideshow-controls>img.button-pause').css(({'display':'inline'}))
	});

	$('#slideshow-controls>img.button-pause').bind('click', function() {
		$(this).css(({'display':'none'}));
		$('#slideshow-controls>img.button-play').css(({'display':'inline'}))
	});

// HELPERS

	function bindTouchHandlers() {
		slidesContainer.on('touchstart', function(e){
			var touchObj = e.originalEvent.changedTouches[0];
			startX = touchObj.pageX;
			startTime = new Date().getTime();
			e.preventDefault();
		});

		slidesContainer.bind('touchmove',function(e){
			e.preventDefault(); // prevent scrolling within the slideshow
		});

		slidesContainer.bind('touchend', function(e){
			var endTime = new Date().getTime();
			var elapsed = endTime - startTime;
			var touchObj = e.originalEvent.changedTouches[0];
			var dist = touchObj.pageX - startX;
			// Min amt of pixels to register as a swipe
			var minSwipeDist = 25;
			console.log(elapsed);

			if(Math.abs(dist) > minSwipeDist) {
				if(dist > 0) {
					animateSlider(currentPosition-1);
					resetTimer();
				} else if(dist < 0) {
					animateSlider(currentPosition+1);
					resetTimer();
				}
			} else if (elapsed < 250) {
				// We'll count this as a click
				animateSlider(currentPosition+1);
			}
		});
	}

	function animateSlider(newPosn) {
		//manage currentPosition going out of bounds
		(newPosn < 0) ? newPosn = numberOfSlides - 1 : newPosn = newPosn;
		(newPosn > numberOfSlides - 1) ? newPosn = 0 : newPosn = newPosn;

		slides.eq(currentPosition).removeClass('active')
		thumbnails.eq(currentPosition).removeClass('active')
		currentPosition = newPosn
		slides.eq(currentPosition).addClass('active')

		slides.removeClass('next prev')
		
		slides.filter( function (index) {
			return index < currentPosition;
		}).addClass('prev');
		slides.filter( function (index) {
			return index > currentPosition;
		}).addClass('next')

		slides.eq(currentPosition).addClass('active');
		thumbnails.eq(currentPosition).addClass('active');
	}

	function init() {
		slides.eq(currentPosition).addClass('active');

		slides.filter( function (index) {
			return index < currentPosition;
		}).addClass('prev');
		slides.filter( function (index) {
			return index > currentPosition;
		}).addClass('next')

		thumbnails.eq(currentPosition).addClass('active');

		// if the animation defaults, hide the play, if there is no automatic behaviour just hide both
		if(autoSlideEnabled) {
			if(defaultOn) {
				$('#slideshow-controls>img.button-play').css({'display':'none'});
			} else {
				$('#slideshow-controls>img.button-pause').css({'display':'none'});
			}
		} else {
			$('#slideshow-controls>img.button-play').css({'display':'none'});
			$('#slideshow-controls>img.button-pause').css({'display':'none'});
		}
		// Enable touch event handeling
		bindTouchHandlers();
	}

	function resetTimer() {
		if(autoSlide && autoSlideEnabled) {
			clearInterval(carouselTimer);
			carouselTimer = setInterval(function() {
			animateSlider(currentPosition + 1);
			}, 3000);
		}
	}

	function toggleSlideAnimation() {
		if (autoSlide)
			autoSlideEnabled = !autoSlideEnabled
	}

	// function generateControls() {
	// 	$('#slidesContainer').append
	// }

});