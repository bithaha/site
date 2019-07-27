

$(function(){
	$('.tabs').each(function(){
		$(this).find('li').eq(0).addClass('active').siblings().removeClass('active');
		$(this).next('.tabs-panels').find('.tabs-panel').eq(0).addClass('active').siblings().removeClass('active');
	});
	$(document).on('click','.tabs > li',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().next().find('.tabs-panel').eq($(this).index()).addClass('active').siblings().removeClass('active');
	});
})

$(function(){
	/* 懒加载 */
    if($("img.lazy").length > 0){
        $("img.lazy").lazyload({ effect : "fadeIn",data_attribute:"src"});   
    }
})

$(document).ready(function(){
	
	//返回顶部
	var $backToTopTxt="",$backToTopEle = $('.gotop')
	        .click(function() {
	            $("html, body").animate({ scrollTop:0 }, 300);
				
	}), $backToTopFun = function() {	
	        var st = $(document).scrollTop(), winh = $(window).height();
	        (st > 150)? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();    
	        if (!window.XMLHttpRequest) {
	            $backToTopEle.css("top", st + winh - 210);    
	        }
	        ofMenuTop = $('.float-menu-line').offset().top;
	        ofMenuTop && (st+winh<=ofMenuTop)?$('.float-menu').addClass("fixed"):$('.float-menu').removeClass('fixed');
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun();});
	
});