$(function(){
	$(".btn-menu").click(function(){
		if($('.header').hasClass('nav-show')){
			$('.header').removeClass('nav-show');
			$('.header-cover').remove();
		}else{
			$('.header').addClass('nav-show');
			$('<div class="header-cover"></div>').appendTo($('body')).off('click').on('click',function(){
				$('.header').removeClass('nav-show');
				$('.header-cover').remove();
			});
		}
	})
})