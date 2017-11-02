$(function(){
	$('.slide').owlCarousel({
		autoplay:true,
		loop:true,
		margin:0,
		dots: true,
		nav: false,
		autoplayTimeout:5000,
		smartSpeed:500,
		lazyLoad:true,
		items:1,
		slideBy:1,
		mouseDrag:true,
		navText:['','']
	});
	//设计大师
	/*$('.sj-slides').owlCarousel({
		autoplay:false,
		loop:true,
		margin:0,
		dots: true,
		nav: false,
		autoplayTimeout:5000,
		dotsContainer:'.sj-tabs',
		smartSpeed:500,
		lazyLoad:true,
		items:1,
		slideBy:1,
		mouseDrag:true,
		navText:['','']
	});	*/
	//经典作品
	/*$('.cases-slides').owlCarousel({
		autoplay:false,
		loop:true,
		margin:0,
		dots: true,
		nav: false,
		autoplayTimeout:5000,
		dotsContainer:'.cases-tabs',
		smartSpeed:500,
		lazyLoad:true,
		items:1,
		slideBy:1,
		navText:['','']
	});	*/
	//新闻
	$('.news-slides').owlCarousel({
		autoplay:false,
		loop:true,
		margin:0,
		dots: true,
		nav: true,
		autoplayTimeout:5000,
		dotsContainer:'.news-tabs',
		smartSpeed:500,
		lazyLoad:true,
		items:1,
		slideBy:1,
		navText:['','']
	});	
	
	
	
});

