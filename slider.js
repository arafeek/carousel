$(document).ready(function(){

	var currentPosition = 0;
	var slides = $('ul.slides>li');
	var thumbnails = $('ul.thumbs>li').length === 0 ? $('ol.carousel-bullets>li') : $('ul.thumbs>li');
	var numberOfSlides = slides.length;
	var autoSlide = ($('ul.slides.autoSlide').length === 0) ? false : true;
	var autoSlideEnabled = autoSlide;
	var carouselTimer = null;

	init()
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

  	$('#slidesContainer').hover(
  		function() { if (autoSlide && autoSlideEnabled) clearInterval(carouselTimer);}, // on mouseover
  		function() { if (autoSlide && autoSlideEnabled) resetTimer(); } // on mouseleave
  	);

  	$('#slidesContainer').bind('click', function() {
  		if(autoSlide) {
	  		toggleSlideAnimation();
	  		if (autoSlideEnabled) {
				carouselTimer = setInterval(function() {
				animateSlider(currentPosition + 1);
				}, 3000);
	  		} else {
	  			clearInterval(carouselTimer);
	  		}
  		}
  	});

    $('ul.thumbs>li, .control, #slidesContainer,ol.carousel-bullets>li').keypress(function(event){
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

	if(autoSlide) {
		carouselTimer = setInterval(function() {
		animateSlider(currentPosition + 1);
		}, 3000);
	}


// HELPERS

	function animateSlider(newPosn) {
		//manage currentPosition going out of bounds
		(newPosn < 0) ? newPosn = numberOfSlides - 1 : newPosn = newPosn;
		(newPosn > numberOfSlides - 1) ? newPosn = 0 : newPosn = newPosn;

		slides.eq(currentPosition).removeClass('active')
		thumbnails.eq(currentPosition).removeClass('active')
		currentPosition = newPosn
		slides.eq(currentPosition).addClass('active')

		$('ul.slides>li.next').removeClass('next')
		$('ul.slides>li.prev').removeClass('prev')
		
		slides.filter( function (index) {
			return index < currentPosition;
		}).addClass('prev');
		slides.filter( function (index) {
			return index > currentPosition;
		}).addClass('next')

		slides.eq(currentPosition).addClass('active')
		thumbnails.eq(currentPosition).addClass('active')
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

	function generateControls() {
		$('#slidesContainer').append
	}

});