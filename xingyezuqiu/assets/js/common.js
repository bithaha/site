/* rem布局, 设计稿宽度1080px
    长度rem = 设计图实际像素/100
*/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth < 600){
                docEl.style.fontSize = 100 * document.body.clientWidth / 1080 + 'px';
            }else{
                docEl.style.fontSize = 100 * 600 / 1080 + 'px';
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
            if($('.a-header').length){
                if(st>0){
                    $('.a-header').addClass('fixed');
                }else{
                    $('.a-header').removeClass('fixed');
                }
            }
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun();});
	
});

$(function(){
    /* 通用搜索框search-box */
    $(".search-box .btn-clear").click(function(){
        $(this).hide();
        $(this).parent().find('.text').val('');
    })
    $('.search-box .text').on('input propertychange',function(){
        if($(this).val()!=''){
            $(this).parent().find('.btn-clear').show();
        }else{
            $(this).parent().find('.btn-clear').hide();
        }
    })

    /**/
    if($('.footer').length){
        $('body').addClass('has-footer');
    }
    if($('.header').length){
        $('body').addClass('has-header');
    }
})