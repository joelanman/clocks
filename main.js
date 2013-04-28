
$(".dial").knob({
	min: 0,
	max: 1440,
	width: 330,
	height: 330,
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

$('body').on('click touchstart', '.clockWrap', function(e){
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

	var newClock = $($('#clockTemplate').html().trim()).clone();

	newClock.appendTo('#clocks');

	drawClocks();
});

var drawClocks = function(){
	var totalClocks = $('#clocks .clock').length;

	if (totalClocks == 1){
		$('.clockWrap').css({'width':'100%', 'height':'100%'});
	}

	if (totalClocks == 2){
		$('.clockWrap').css({'width':'50%', 'height':'100%'});
	}

	if (totalClocks == 3){
		$('.clockWrap').css({'width':'33.33%', 'height':'100%'});
	}

	if (totalClocks == 4){
		$('.clockWrap').css({'width':'50%', 'height':'50%'});
	}
}

$('body').on('click touchstart', '.clockWrap .remove', function(e){
	e.preventDefault();
	$(this).closest('.clockWrap').remove();
	drawClocks();

})