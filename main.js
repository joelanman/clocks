
$(".dial").knob({
	lineCap: "round",
	cursor: true,
	fgColor: "#999",
	bgColor: "#EEE"
});

$('.clockWrap').on('click', function(e){
	e.preventDefault();
	$('#controls').toggle();
	$('#clocks').toggleClass('background');
})