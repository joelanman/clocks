
$(".dial").knob({
	min: 0,
	max: 1440,
	width: 380,
	height: 380,
	lineCap: "round",
	cursor: true,
	fgColor: "#999",
	bgColor: "#EEE",
	thickness: 0.28,


    'change' : function (v) {
		var hours = Math.floor(v/60),
			minutes = v%60;
			minutes = (minutes < 10) ? '0' + minutes : minutes;
		$('.clockDisplay').val(hours + ':' + minutes);
    }
});

$('body').on('click touchstart', '.clockWrap .time', function(e){
	e.preventDefault();

	if ($(e.target).closest('.remove').length == 1){
		return;
	}

	var $this = $(this);

	var hours		= Number($this.find('.hours').text()),
		minutes		= Number($this.find('.minutes').text()),
		totalMins	= hours*60 + minutes,
		location	= $this.find('.location').text();

	console.log(totalMins);

	$(".dial").val(totalMins).trigger('change');

	$('.clockDisplay').val(hours + ':' + minutes);

	$('.locationEdit input').val(location);
	
	$('.controlsWrap .controls').hide();
	$('#clockControls').show();
	$('#controlsWrap').fadeIn('fast');
});

$('body').on('click touchstart', '.clockWrap .location', function(e){
	e.preventDefault();

	if ($(e.target).closest('.remove').length == 1){
		return;
	}

	var $this = $(this);

	var location = $this.text();

	$('.locationEdit input').val(location);

	$('.controlsWrap .controls').hide();
	$('#locationControls').show();
	$('#controlsWrap').fadeIn('fast');
});

$('#controlsWrap').on('click touchstart', function(e){
	e.preventDefault();

	if ($(e.target).closest('.controls').length == 1){
		return;
	}

	$('#controlsWrap').fadeOut('fast');
});

$('#addClock').on('click touchstart', function(e){
	e.preventDefault();

	var $newClock = $($('#clockTemplate').html().trim()).clone();

	$newClock.find('.hours').text('8');
	$newClock.find('.minutes').text('41');
	$newClock.find('.location').text('Paris');


	$newClock.appendTo('#clocks');

	drawClocks();
});

var drawClocks = function(){
	var totalClocks = $('#clocks .clock').length;

	$('#clocks').attr('class','clocks')
				.addClass('clocks_'+totalClocks);

}

$('body').on('click touchstart', '.clockWrap .remove', function(e){
	e.preventDefault();
	$(this).closest('.clockWrap').remove();
	drawClocks();

});

var inactiveTimeout = null;

$('body').on('mousemove', function(e){

	var $buttons = $('.menu,.remove');

	$buttons.show();

	if (inactiveTimeout){
		clearTimeout(inactiveTimeout);
	}

	inactiveTimeout = setTimeout(function(){

		$('.menu,.remove').fadeOut();

	}, 2000);

});