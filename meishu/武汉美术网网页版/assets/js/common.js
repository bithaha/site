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

//图片懒加载
$(function() {  
      $("img.lazy").lazyload({
	     loading:true,
	     effectspeed:200,
		 threshold:200,
	     effect:"fadeIn",
		 skip_invisible:false,
		 data_attribute: "src"
	  });
});