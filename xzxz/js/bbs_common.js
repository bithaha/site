$(function(){
	/**/
	$('#s_cate_t').click(function(){
		$('#s_cate_d').show();
	});
	$("#s_cate_d a").click(function(){
		$('#s_cate_t').html($(this).html());
		$('#s_cate_txt').val($("#s_cate_d a").index($(this)));
		$("#s_cate_d").hide();
	});
	/*绑定鼠标点击动作*/
	$(document).bind("click",function(e){ 
		var target = $(e.target);
		if(target.closest("#s_cate_t").length == 0 && target.closest("#s_cate_d").length == 0){
			$("#s_cate_d").hide();
		}
	});
	
	$('#tz_search_txt').focus(function(){
		if($(this).val() == ''){
			$(this).next().show().addClass('for');
		}else{
			
		}
		
	});
	$('#tz_search_txt').blur(function(){
		if($(this).val() == ''){
			$(this).next().show().removeClass('for');
		}else{
			
		}
		
	});
	$('#tz_search_txt').keydown(function(){
		if($(this).val() == ''){
			$(this).next().hide();
		}else{
			
		}
		
	});
	
});