/*
 * ����js�ļ�
 * ����ͷβ�ȹ��ð�顢���ò��
 *
 */



//���ض���
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

//���صײ�
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

/* ͼƬ������ */

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