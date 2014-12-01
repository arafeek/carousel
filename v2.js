$(document).ready(function(){

	var currentPosition = 0;
	var slides = $('ul.slides>li');
	var thumbnails = $('ul.thumbs>li');
	var numberOfSlides = slides.length;

	init()
  	$('.control').bind('click', function(){
	    var newPosition
		if($(this).attr('id')=='rightControl') {
			newPosition = currentPosition + 1;
		} else {
			newPosition = currentPosition - 1;
		}

		//fix current position going out of bounds
		(newPosition < 0) ? newPosition = numberOfSlides - 1 : newPosition = newPosition;
		(newPosition > numberOfSlides - 1) ? newPosition = 0 : newPosition = newPosition;

	    animateSlider(newPosition);
  	});

    $('ul.thumbs>li, .control').keypress(function(event){
  		if(event.keyCode == 13){
  			$(this).click();
	  	}
	});

	// Binds click event to thumbnail so you can control the slider with them
	$('ul.thumbs>li').bind('click', function() {
		//if this isn't already the one we're looking at, hide it and show the new one
		var newPosition = $(this).index()
		if(!(newPosition == currentPosition)) {
			animateSlider(newPosition)
		}
	});

	function animateSlider(newPosn) {
		slides.eq(newPosn).addClass('active')
		slides.eq(currentPosition).removeClass('active')
		thumbnails.eq(currentPosition).removeClass('active')
		currentPosition = newPosn
		//slides.eq(currentPosition).addClass('active')
		thumbnails.eq(currentPosition).addClass('active')
	}

	function init() {
	slides.eq(currentPosition).addClass('active');
	thumbnails.eq(currentPosition).addClass('active');
	}
});