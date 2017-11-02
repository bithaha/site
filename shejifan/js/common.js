$(function(){
	

	$('.tabs-t li').mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().parent().find('.tabs-pannel').eq($(this).index()).show().siblings('.tabs-pannel').hide();
	});
	/*下拉菜单*/
	$('.toggle').click(function(event){
		event.stopPropagation();
		if($(this).parent().hasClass('open')){
			$(this).parent().removeClass('open');
		}else{
			$(this).parent().addClass('open').siblings().removeClass('open');
		}
	});
	$('.sub-menu a').on('click',function(event){
		event.stopPropagation();
		$(this).parent().parent().parent().removeClass('open');
	});
	//阻止弹窗框的点击时间
	$('body').on('click',function(event){

		$('.toggle').parent().removeClass('open');
	});
	//防止点击弹出窗口会自动关闭
	$('.sub-menu,.toggle-content').on('click',function(event){
		event.stopPropagation();
	});
	
	/*设计师动态滚动js*/
	if($("#dynamic").length > 0){
		var answerini = setInterval(function(){autoAnswer();},5000);
		$("#dynamic").mouseover(function(){
			window.clearInterval(answerini);
		});
		$("#dynamic").mouseout(function(){
			answerini = setInterval(function(){autoAnswer();},5000);
		});
	}
	function autoAnswer(){
		var ul = $("#dynamic ul");
		var wli = $("#dynamic ul li").length - 4;
		var wh = $("#dynamic ul li").height();
		var last_li = $("#dynamic ul li:gt("+wli+")");
		var first_li = "";
		last_li.each(function(){
			first_li += '<li style="opacity:0;">'+$(this).html()+'</li>';
		});
		//alert(first_li);
		
		ul.animate({'margin-top':wh+'px'},500,function(){
			ul.css('margin-top','0');
			ul.prepend($(first_li));
			$("#dynamic ul li:lt(3)").animate({'opacity':'1'},500);
			var ali = $("#dynamic ul li").length - 4
			$("#dynamic ul li:gt("+ali+")").remove();
			
		});
	}
	/*checkbox*/
	$('.checkbox').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active').find('input[type="hidden"]').val('0');
		}else{
			$(this).addClass('active').find('input[type="hidden"]').val('1');
		}
	});
	$('.nav-list li').hover(function(){
		$(this).addClass('open');
	},function(){
		$(this).removeClass('open');
	});
});

//让弹出窗口显示在body中央
function showPopbox(popbox_id){
	var popbox = $('#' + popbox_id);
	//return false;
	var new_left = ($(document).width() - popbox.width())/2;
	var new_top = $(document).scrollTop() + $(window).height()/2 - popbox.height()/2 ;
	popbox.css({"top": new_top + 'px'});
	popbox.css({"margin-left":-popbox.width()/2+'px',"left":"50%"});
	if($("#cover").length <= 0){
		$("body").append('<div class="cover" id="cover" style="display:none;"><div class="cover-main"></div></div>');
	}
	setTimeout(function(){
		popbox.css({"display":"block","opacity":"0","top":new_top-60+"px"}).animate({"opacity":"1","top":new_top+"px"},200);
		$("#cover").fadeIn(200);
	},100);


}


function closePopbox(popbox_id){
	var popbox = $('#' + popbox_id);
	var new_top = $(document).scrollTop() + $(window).height()/2 - popbox.height()/2 ;
	popbox.animate({"opacity":"0","top":new_top-60+"px"},200,function(){
		popbox.css({"display":"none"});

	});
	if($("#cover").length > 0){
		$("#cover").animate({"opacity":"0"},200,function(){
			$("#cover").remove();

		});
	}

}

//返回顶部
$(function(){
    var $backToTopTxt="TOP", $backToTopEle = $('.gotop')
        $('.gotop').click(function() {
            $("html, body").animate({ scrollTop:0 }, 100);
    }), $backToTopFun = function() {	
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > winh)? $backToTopEle.fadeIn(100): $backToTopEle.fadeOut(100);  	
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun();});
})

function showFbar(){
	$('#f-bar-tit').animate({'left':'-100%'},500,function(){
		$('#f-bar').animate({'left':'0'},500)
	});
}
function hideFbar(){
	$('#f-bar').animate({'left':'-100%'},500,function(){
		$('#f-bar-tit').animate({'left':'0'},500)
	});
}