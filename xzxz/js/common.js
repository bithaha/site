$(function(){
	
	
	/*顶部更多按钮*/
	$('#top_more').hover(function(){
		$(this).addClass('left_more_h').find('div').slideDown(500);
	},function(){
		$(this).removeClass('left_more_h').find('div').slideUp(10);
	});
	/*顶部快速导航*/
	$('#fast_nav').hover(function(){
		$(this).addClass('fast_nav_h').find('div').slideDown();
	},function(){
		$(this).removeClass('fast_nav_h').find('div').slideUp();
	});
	/*顶部搜索*/
	var search_index = 0,search_sel = 0;
	$('#search_select_t').click(function(){
		if(search_index == 0){
			$(this).addClass('search_select_t_now');
			$('#search_select_c li').eq(search_sel).addClass('search_select_now').siblings().removeClass('search_select_now');
			$('#search_select_c').slideDown();
			search_index = 1;
		}else{
			$(this).removeClass('search_select_t_now')
			$('#search_select_c').slideUp();
			search_index = 0;
		}
	});
	$('#search_select_c a').click(function(){
		search_sel = $('#search_select_c a').index(this);
		$('#search_select_t').removeClass('search_select_t_now');
		$('#search_select_c').slideUp();
		$('#search_select_t label').html($(this).html());
		search_index = 0;
	});
	$('#search_text').focus(function(){
		if(trim($(this).val()) == ''){
			$(this).next('label').addClass('light_l');
		}else{
			
		}
	});
	$('#search_text').blur(function(){
		if(trim($(this).val()) == ''){
			$(this).next('label').css('display','block').removeClass('light_l');;
			
		}else{
		}
	});
	$('#search_text').keydown(function(){
		$(this).next('label').css('display','none');
		
	});
	/*绑定鼠标点击动作*/
	$(document).bind("click",function(e){ 
		var target = $(e.target);
		if(target.closest('#search_select_t').length == 0 && target.closest("#search_select_c").length == 0){
			$('#search_select_t').removeClass('search_select_t_now');$('#search_select_c').slideUp();search_index = 0;
		}
	});
	/*tab切换1*/
	$('.m_tab_t ul li').mouseover(function(){
		var index = $(this).parent().find('li').index($(this));
		var num = $('.m_tab_t').index($(this).parent().parent());
		if($(this).parent().parent().parent().attr('id')=='fc'){
			window.clearInterval(fc_ini);
			fc_show(index,num);
			fc_ini=setInterval("autoFc()",2000);
		}else{
			$(this).find('a').addClass('tab_now').parent().siblings().find('a').removeClass('tab_now');
			$(this).parent().parent().next().find('.m_tab_item').eq(index).css('display','block').siblings().css('display','none');
		}
	});
	
	/*tab切换2*/
	$('.m_tab1_t a').mouseover(function(){
		$(this).addClass('tab_now').siblings().removeClass('tab_now');
		if($(this).parent().next().find('.m_tab1_item').length > 0){
			$(this).parent().next().find('.m_tab1_item').eq($(this).parent().find('a').index($(this))).addClass('current').siblings().removeClass('current');
		}else{
			$(this).parent().parent().next().find('.m_tab1_item').eq($(this).parent().find('a').index($(this))).addClass('current').siblings().removeClass('current');
		}
	});
	
	/*导航*/
	$('#head_nav_t ul li').hover(function(){
		var i = $('#head_nav_t ul li').index($(this))+1;
		$(this).addClass('m_cate_menu_'+i+'_hover').addClass('m_cate_menu_hover').find('.m_cate_ext').css('display','block');
	},function(){
		var i = $('#head_nav_t ul li').index($(this))+1;
		$(this).removeClass('m_cate_menu_'+i+'_hover').removeClass('m_cate_menu_hover').find('.m_cate_ext').css('display','none');
	});
	
	$('#head_nav_t').hover(function(){
		if($(this).hasClass('head_nav_t1')){
			$(this).removeClass('head_nav_t1').addClass('head_nav_t1_hover');
		}
	},function(){
		if($(this).hasClass('head_nav_t1_hover')){
			$(this).addClass('head_nav_t1').removeClass('head_nav_t1_hover');
		}
	});
	
	/*侧部*/
	$('.xl_ul li').mouseover(function(){
		$(this).addClass('xl_on').siblings().removeClass('xl_on');
	});
	
	$('#c_banner').find('.controle').find('a').click(function(){
		window.clearInterval(b_ini);
		b_acting($(this).parent().find('a').index($(this)));
		b_ini = setInterval('auto_active()',slideTime);
	});
});

/*内页导航*/
var cIndex = 0;
var c_time = 500;
var c_slideTime = 5000;
var b_ini = setInterval('auto_active()',c_slideTime);


$('#c_banner').find('.c_b_l').find('ul').width($('#c_banner').find('li').size()*$('#c_banner').find('li').width() + 'px');



function auto_active(){
	cIndex+1>=$('#c_banner li').size()?cIndex=-1:false;
	b_acting(cIndex + 1);
}
function b_acting(index){
	$('#c_banner').find('.controle').find('a').eq(index).addClass('banner_now').siblings().removeClass('banner_now');
	$('#c_banner ul').stop(false,true).animate({'left':-$('#c_banner ul li').width()*index+'px'},c_time);
	cIndex = index;
}



function trim(str){ //删除左右两端的空格
　     return str.replace(/(^\s*)|(\s*$)/g, "");
}