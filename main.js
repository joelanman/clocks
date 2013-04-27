
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

$('.clockWrap').on('click touchstart', function(e){
	e.preventDefault();

	var $this = $(this);

	var hours 		= Number($this.find('.hours').text()),
		minutes 	= Number($this.find('.minutes').text()),
		totalMins 	= hours*60 + minutes,
		location 	= $this.find('.location').text();

	console.log(totalMins);

	$(".dial").val(totalMins).trigger('change');
 
 	$('.clockDisplay').val(hours + ':' + minutes);

 	$('.locationEdit input').val(location);

	$('#controlsWrap').fadeIn('fast');
})

$('#controlsWrap').on('click touchstart', function(e){
	e.preventDefault();

	if ($(e.target).closest('.controls').length == 1){
		return;
	}

	$('#controlsWrap').fadeOut('fast');
})