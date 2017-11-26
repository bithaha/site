$(function(){
		$(".userTxt,.pwdTxt,.codeTxt").focus(function(){
			var value = $.trim($(this).val());
				$(this).prev('.placeholder').hide();
		});
		$(".userTxt,.pwdTxt,.codeTxt").blur(function(){
			var value = $.trim($(this).val());
			if(value==""){
				$(this).prev('.placeholder').css('display','inline-block');
			}
		});
		$(".checkbox").click(function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
			}else{
				$(this).addClass("active");
			}
		});
		$('#username').bind('input propertychange', function() {  
		    $(this).prev().hide();
		});  
		$('#password').bind('input propertychange', function() {  
		    $(this).prev().hide();
		});  
		
		if($('#username').val() != ''){
			$('#username').prev().hide();
		}
		if($('#password').val() != ''){
			$('#password').prev().hide();
		}
})

function showLogin(){
	$('#regist').hide();
	$('#login').show();
}
function showRegist(){
	$('#login').hide();
	$('#regist').show();
}