/*
 * 公用js文件
 * 包括头尾等公用版块、常用插件
 *
 */



//返回顶部
$(function(){
    var $backToTopTxt="TOP", $backToTopEle = $('.gotop')
        $('.gotop').click(function() {
            $("html, body").animate({ scrollTop:0 }, 100);
    }), $backToTopFun = function() {	
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > winh-100)? $backToTopEle.fadeIn(100): $backToTopEle.fadeOut(100);  	
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun();});
})

//返回底部
$(function(){
    var $backToBottomTxt="BOTTOM", $backToBottomEle = $('.gobottom')
        $('.gobottom').click(function() {
            $("html, body").animate({ scrollTop:$(document).height() }, 100);
    }), $backToBottomFun = function() {	
        var st = $(document).scrollTop(), domh = $(document).height();
        (st <= domh - 800)? $backToBottomEle.fadeIn(100): $backToBottomEle.fadeOut(100);  	
    };
    $(window).bind("scroll", $backToBottomFun);
    $(function() { $backToBottomFun();});
})

/* 图片懒加载 */

$(function(){
	if($("img.lazy").length > 0){
		$("img.lazy").lazyload({ effect : "fadeIn"});	
	}
})

$(function(){
	$('.page-panel .btn-back').click(function(){
		$(this).parents('.page-panel').removeClass('open');
	});
})