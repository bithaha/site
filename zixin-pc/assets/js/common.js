(function(){var ua=navigator.userAgent.toLowerCase();var bIsIpad=ua.match(/ipad/i)=="ipad";var bIsIphoneOs=ua.match(/iphone os/i)=="iphone os";var bIsAndroid=ua.match(/android/i)=="android";var bIsWM=ua.match(/windows mobile/i)=="windows mobile";if(bIsIpad||bIsIphoneOs||bIsAndroid||bIsWM){window.location.href="//m.zixinyun.com"}else{}})();


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
	

	//公共tab切换
	$(document).on('click','.tab-tit .tab-item',function(){
		var index = $('.tab-tit .tab-item').index($(this));
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().next().children('.tab-pannel').eq(index).addClass('active').siblings().removeClass('active');
	})
});

/*  */
$(function(){
	$('.menu-btn').on('click',function(){
		$('.header').toggleClass("head-menu-show");
	});
})