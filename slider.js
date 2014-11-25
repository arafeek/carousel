$(document).ready(function(){

	var currentPosition = 0;
	var slides = $('ul.slides>li');
	var numberOfSlides = slides.length;
	var slideWidth; //set in drawSlider()


	drawSlider();

	//Makes it responsive
	$(window).resize(function() {
		handleWindowResize();
	});

  	// Hide left arrow control on first load
  	//manageControls(currentPosition);

  	// Moves the slide based on which button was clicked
  	$('.control')
    	.bind('click', function(){
	    // Determine new position
		//currentPosition = ($(this).attr('id')=='rightControl') ? (currentPosition + 1) : (currentPosition - 1);
		if($(this).attr('id')=='rightControl') {
			currentPosition++;
		} else {
			currentPosition--;
		}

		//fix current position going out of bounds
		(currentPosition < 0) ? currentPosition = numberOfSlides - 1 : currentPosition = currentPosition;
		(currentPosition > numberOfSlides - 1) ? currentPosition = 0 : currentPosition = currentPosition;

	    
		// Hide / show controls
	    //manageControls(currentPosition);
	    animateSlider();
  	});

    //Bind a keypress event to the control buttons
    // prevent the keypress if it is disabled
    $('ul.thumbs>li, .control').keypress(function(event){
  		if(event.keyCode == 13){
  			if(!$(this).hasClass('disabled')) {
	  			$(this).click();
	  		}
	  	}
	});

	//Prevents disabled arrows from moving the slides
  	$('.disabled').click(function(e) {
  		e.preventDefault();
  	});

  	//generates the thumbnails based on the given list, comment this out if you don't want thumnails
  	//Uses the corresponding image's alt text and appends thumbnail to it
  // 	var thumbList = $('ul.thumbs');
  // 	var images = $('ul.slides>li').children().clone(); //copy the images or it'll use the originals
  // 	$.each(images, function(index,img) {
  // 		var item = $(img).addClass('thumb');
  // 		$('<li/>')
		// .addClass('thumbnail')
		// .html(item)
		// .attr('position',index)
		// .attr('alt',$(img).attr('alt') + " thumbnail")
		// .appendTo(thumbList);
  // 	});

  	// Binds click event to thumbnail so you can control the slider with them
  	$('ul.thumbs>li').bind('click', function() {
  		//currentPosition = $(this).attr('position')
  		currentPosition = $(this).index()

		// Hide / show controls
	    //manageControls(currentPosition);
	    // Move slideInner using margin-left
	    $('ul.slides').animate({
	      'marginLeft' : slideWidth*(-currentPosition)
	    });
  	});


  	// drawSlider: Generates the slider from the given page markup
  	// should be called at least once
	function drawSlider() {
		slideWidth = $('#slidesContainer').width();
		// Remove scrollbar in JS
		$('#slidesContainer').css('overflow', 'hidden');
		slides
		.css({
	      	'display' : 'inline-block',
	  		'width' : slideWidth
	    });
	  	$('ul.slides').css('width', slideWidth * numberOfSlides);
	}

	// handleWindowResize: Gives the slider responsive behaviour based on page width only
	// To be called in response to the window changing size
	function handleWindowResize() {
		drawSlider();
		animateSlider();
	}

	// animateSlider: Slides the desired image into view
	// Uses margin to move the slides
	function animateSlider() {
	    $('#slidesContainer ul.slides').animate({
      	'marginLeft' : slideWidth*(-currentPosition)
	    });
	}

	function animateSliderNew() {
		$('#slidesContainer ul.slides').animate({'left':'-'+ slideWidth*(-currentPosition)});
	}

  	// manageControls: Hides and Shows controls depending on currentPosition
  	function manageControls(position){
    	// Hide left arrow if position is first slide
		if(position<=0){ $('#leftControl').addClass("disabled") } else{ $('#leftControl').removeClass("disabled") }
		// Hide right arrow if position is last slide
	    if(position>=numberOfSlides-1){ $('#rightControl').addClass("disabled") } else{ $('#rightControl').removeClass("disabled") }
  	}

  	// keepBetween: keeps a value within a given threshold
  	// currently unused, but could be used to set "slideWidth" if you want to have a max and min width for each slide
  	function keepBetween(input, max, min) {
  		if(input <= min) {
  			return min;
  		} else if (input >= max) {
  			return max;
  		}
  		else {
  			return input;
  		}
  	}

});