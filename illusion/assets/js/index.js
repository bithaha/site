$(function(){
	$('.sliders').owlCarousel({
		autoplay:true,
		loop:true,
		margin:0,
		dots: true,
		nav: false,
		autoplayTimeout:5000,
		smartSpeed:500,
		lazyLoad:true,
		items:1,
		mouseDrag:true,
		slideBy:1
	});	
	$('.party-sliders').owlCarousel({
		autoplay:true,
		loop:false,
		margin:15,
		dots: false,
		nav: true,
		autoplayTimeout:5000,
		smartSpeed:500,
		lazyLoad:true,
		items:3,
		mouseDrag:true,
		slideBy:1,
		navText:"",
		navControll:"true",
		navControlPrev:'.party-prev',
		navControlNext:'.party-next'
		
	});	
})