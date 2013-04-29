var cities = [
	{
		'name'		: 'London',
		'difference': 1
	},
	{	'name'		: 'New York',
		'difference': -6
	},
	{	'name'		: 'Tokyo',
		'difference': 7
	},
	{	'name'		: 'Paris',
		'difference': 0
	}
]


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

	var totalClocks = $('#clocks .clock').length,
		date = new Date(),
		hours = date.getHours(),
		city = cities[totalClocks],
		cityHours = hours + city.difference,
		cityMinutes = date.getMinutes();

	cityHours = (cityHours >= 24) ? cityHours - 24 : cityHours;
	cityMinutes = (cityMinutes < 10) ? '0' + cityMinutes : cityMinutes;

	$newClock.find('.hours').text(cityHours);
	$newClock.find('.minutes').text(cityMinutes);
	$newClock.find('.location').text(city.name);

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

var date = new Date(),
	localOffset = date.getTimezoneOffset() / 60;

setInterval(function(){

	var date = new Date(),
		hours = date.getHours() + localOffset,
		minutes = date.getMinutes();

	minutes = (minutes<10) ? '0' + minutes : minutes;

	$('.clock').each(function(){

		var $this = $(this),
			cityName = $this.find('.location').text(),
			difference = 0;

		cities.forEach(function(city){
			if (city.name == cityName){
				difference = city.difference;
			}
		});

		var cityHours = hours + difference;

		cityHours = (cityHours >= 24) ? cityHours - 24 : cityHours;

		$this.find('.hours').text(cityHours);
		$this.find('.minutes').text(minutes);
		//var isVisible = ($this.find('.separator').css('visibility') == 'hidden') ? 'visible' : 'hidden';
		//$this.find('.separator').css({'visibility': isVisible});
	})

}, 1000);