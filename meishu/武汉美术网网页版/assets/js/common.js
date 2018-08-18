$(document).ready(function(){
	//返回顶部
	var $backToTopTxt="", $backToTopEle = $('.gotop')
	        .click(function() {
	            $("html, body").animate({ scrollTop:0 }, 300);
				
	}), $backToTopFun = function() {	
	        var st = $(document).scrollTop(), winh = $(window).height();
	        // (st > 150)? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();    
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

//顶部导航
$(function(){
	$(".topbar .nav .item,.float-menu .item").hover(function(){
		$(this).addClass('active');
	},function(){
		$(this).removeClass('active');
	})
	/*顶部城市*/
	var current_city= (localStorage && localStorage.getItem('current_city')) || "全国";
	$("#cityname").html(current_city);
	$('.citylist a').each(function(){
		if($(this).html()==current_city){$(this).addClass('active').siblings().removeClass('active');}
	})
	$('.citylist a').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$("#cityname").html($(this).html());
		$(".citylist").parent().parent().removeClass('active');
		localStorage.setItem('current_city',$(this).html())
	});
	/*菜单*/
	$(".btn-menu").click(function(){
		$('.topbar').toggleClass('open-menu-active')
	})
	$(document).on('click',function(){$('.topbar').removeClass('open-menu-active');})
	$('.topbar').click(function(e){e.stopPropagation();})
	/*右侧浮动菜单*/
	$('.float-menu .item').hover(function(){

	})
})