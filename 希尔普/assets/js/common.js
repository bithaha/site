(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (document.body.clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


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

	$("#btnnav").on('click',function(){
        if($('.header').hasClass("active")){
            $('.header').removeClass("active");
            $('.header-cover').remove();
        }else{
            $('.header').addClass("active");
            $('body').append('<div class="header-cover"></div>');
            $('.header-cover').off('click').on('click',function(){
            	 $('.header').removeClass("active");
            	$('.header-cover').remove();
            })
        }
    })
});






