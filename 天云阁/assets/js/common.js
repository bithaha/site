
$(document).ready(function(){
	
	//返回顶部
	var $backToTopTxt="", $backToTopEle = $('.gotop')
	        .click(function() {
	            $("html, body").animate({ scrollTop:0 }, 300);
				
	}), $backToTopFun = function() {	
	        var st = $(document).scrollTop(), winh = $(window).height();
	        (st > 150)? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();    
	        if (!window.XMLHttpRequest) {
	            $backToTopEle.css("top", st + winh - 210);    
	        }
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun();});
	
});

$(function(){
	$('.tabs').each(function(){
		$(this).find('li').eq(0).addClass('active').siblings().removeClass('active');
		$(this).next('.tabs-panels').find('.tabs-panel').eq(0).addClass('active').siblings().removeClass('active');
	});
	$(document).on('click','.tabs > li',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().next().find('.tabs-panel').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
})