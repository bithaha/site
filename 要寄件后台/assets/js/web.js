$(function(){
	if($('.btn-menu').length<=0){
		$('.header .container').append('<a class="btn btn-menu"><b></b></a>')
	}
	$(document).on('click','.btn-menu',function(){
		if($('.header').hasClass('active')){
			$('.header').removeClass('active');
			$('.header-cover').removeClass('active');
		}else{
			$('.header').addClass('active');
			if($('.header-cover').length<=0){$('body').append('<div class="header-cover"></div>');$(".header-cover").click(function(){
				$('.header').removeClass('active');
				$('.header-cover').removeClass('active');
			})}
			setTimeout(function(){
				$('.header-cover').addClass('active');
			})
		}
	})
})