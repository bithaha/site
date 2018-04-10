/* rem布局， 
    长度rem = 设计图实际像素/100
*/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth < 600){
                docEl.style.fontSize = 100 * document.body.clientWidth / 750 + 'px';
            }else{
                docEl.style.fontSize = 100 * 600 / 750 + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.initRem = recalc;
    win.onresize = function(){recalc();};
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


$(function(){
	/* 懒加载 */
    if($("img.lazy").length > 0){
        $("img.lazy").lazyload({ effect : "fadeIn",data_attribute:"src"});   
    }
    /*顶部浮动*/
    if($('.header').length>0 && !$('.header').hasClass("nofixed")){
        $('body').addClass("fixed-header");
        if($('.header .navbar').length>0){
            $('body').addClass("has-header-navbar");
        }
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
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun();});
	
});