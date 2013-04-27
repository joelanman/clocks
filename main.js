
$(".dial").knob({
	min: 0,
	max: 1440,
	width: 300,
	height: 300,
	lineCap: "round",
	cursor: true,
	fgColor: "#999",
	bgColor: "#EEE",
	thickness: 0.2,


    'change' : function (v) {
    	var hours = Math.floor(v/60),
    		minutes = v%60;
    	minutes = (minutes < 10) ? '0' + minutes : minutes;
    	$('.clockDisplay').val(hours + ':' + minutes);
    }
});

setTimeout(function(){

		var v = $('.dial').val();
    	var hours = Math.floor(v/60),
    		minutes = v%60;
    	minutes = (minutes < 10) ? '0' + minutes : minutes;
    	$('.clockDisplay').val(hours + ':' + minutes);

}, 100);

$('.clockWrap,#controlsWrap').on('click touchstart', function(e){
	e.preventDefault();

	if ($(e.target).closest('.controls').length == 1){
		return;
	}

	$('#controlsWrap').toggle();
	$('#clocks').toggleClass('background');
})