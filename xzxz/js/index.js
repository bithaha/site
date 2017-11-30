$(function(){
	/*banner*/
	$("#banner").find('.index_b_t').find('a').mouseover(function(){
		window.clearInterval(int);
		show($("#banner").find('.index_b_t').find('a').index($(this)));
		int=setInterval("autoSlide()",slideTime);
	});
	
	
	/**/
	$('.list_line li').hover(function(){
		$(this).addClass('on').siblings().removeClass('on');
	});
	
	$('.g_hd ul li').mouseover(function(){
		var index = $(this).parent().find('li').index($(this));
		$(this).addClass('select').siblings().removeClass('select');
		$(this).parent().parent().next().find('.g_hd_sub').eq(index).addClass('current').siblings().removeClass('current');
	});
	
	
	
	/*摄影作品*/
	$('#m_sy li a').hover(function(){
		$(this).find('.img_cover').animate({'top':'0px'},200);
	},function(){
		$(this).find('.img_cover').animate({'top':$(this).parent().height()+'px'},200);
	});
	
	/*热门帖子切换*/
	$('.tie_t a').mouseover(function(){
		$(this).addClass('tab_now').parent().siblings().find('a').removeClass('tab_now');	
		$(this).parent().parent().parent().next().find('.tie_item').eq($('.tie_t a').index(this)).addClass('current').siblings().removeClass('current');
	});
	
	/*晒图达人*/
	
	$('#tuErea').find('.tu_c').find('ul').width(($('#tuErea').find('li').width()+10)*$('#tuErea').find('li').size()+'px');
	$('#tuErea').find('.tu_t').find('a').mouseover(function(){
		window.clearInterval(tu_ini);
		tu_action($('#tuErea').find('.tu_t').find('a').index($(this)));
		tu_ini = setInterval(function(){tu_action(tu_i+1);},3000);
	});
	
	$("#backToTop").click(function(){
		$('body,html').animate({scrollTop:0},1000);
		return false;
	});
});
/*晒图达人*/
var tu_i = 0;

var tu_ini = setInterval(function(){
	tu_action(tu_i+1)
},3000);

function tu_action(index){
	$('#tuErea').find('.tu_t').find('dd').eq(index).addClass('tab_now').siblings().removeClass('tab_now');
	
	var liW = $('#tuErea').find('.tu_c').find('ul').find('li').width();
	moveW = (liW+10)*3;
	$('#tuErea').find('.tu_c').find('ul').stop(false,true).animate({'left':-index*moveW+'px'},1000);
	tu_i++;
	if(tu_i >= $('#tuErea').find('.tu_c').find('li').size()/3-1){
		tu_i = -1;return;
	}
}

/*  s  报名进行时*/
var acting_i = -1;
var act_time = setInterval('acting_move()',500);
function acting_move(){
	if(acting_i >= $('#acting ul').size()-1){
		acting_i = -1;
		window.clearInterval(act_time);
		setTimeout(function(){
			act_time = setInterval('acting_move()',500);
		},2000);
		return;
	}
	acting(acting_i+1);
}

function acting(index){
	$('#acting ul').eq(index).find('li').css('margin-top','0px').eq(0).css('margin-top','-258px');
	$('#acting ul').eq(index).find('li').eq(0).animate({'margin-top':'-172'},400);
	
	var li3 = $('#acting ul').eq(index).find('li').eq(3).html();
	 
	setTimeout(function(){
		$('#acting ul').eq(index).find('li').css('margin-top','0px');
		$('#acting ul').eq(index).find('li').eq(3).remove();
		$('#acting ul').eq(index).prepend('<li>'+li3+'</li>');
		
		$('#acting ul').eq(index).find('li').eq(0).css('margin-top','-258px')
			
	},600)
	acting_i = index;
}
/*  e 报名进行时*/

/*  s  象足风采*/
var fc_i=0;
var fc_ini=setInterval("autoFc()",2000);


function autoFc(){
	fc_i+1>=$("#fc").find('.m_tab_item').size()?fc_i=-1:false;
	fc_show(fc_i+1,0);
}
function fc_show(index,num){
	$(".m_tab_t").eq(num).find('li').eq(fc_i).find('a').removeClass('tab_now');
	$(".m_tab_c").eq(num).find('.m_tab_item').eq(fc_i).css({'display':'none'});
	
	$(".m_tab_t").eq(num).find('li').eq(index).find('a').addClass('tab_now');
	$(".m_tab_c").eq(num).find('.m_tab_item').eq(index).css({'display':'block'});
	fc_i=index;
}
/*  e  象足风采*/




/*banner切换*/
var curIndex=0;
var time=800;
var slideTime=5000;
var int=setInterval("autoSlide()",slideTime);


function autoSlide(){
	curIndex+1>=$("#banner").find('.index_b_l').find('li').size()?curIndex=-1:false;
	show(curIndex+1);
}
function show(index){
	$("#banner").find('.index_b_t').find('dd').eq(curIndex).find('a').removeClass('banner_now');
	$("#banner").find('.index_b_t').find('h4').eq(curIndex).css({'display':'none'});
	$("#banner").find('.index_b_l').find('li').eq(curIndex).stop(false,true).fadeOut(time);
	$("#banner").find('.index_b_l').find('li').eq(index).stop(false,true).fadeIn(time);
	$("#banner").find('.index_b_t').find('dd').eq(index).find('a').addClass('banner_now');
	$("#banner").find('.index_b_t').find('h4').eq(index).css({'display':'block'});
	curIndex=index;
}