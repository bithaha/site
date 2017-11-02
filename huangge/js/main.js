$(function(){
	
	
	/*nav*/
	$('#nav .nav-con').css('padding-top',$(window).height()/2 - $('#nav .nav-con').height()/2+'px');
	$('#content').css('padding-top',$(window).height()/2 - $('#content').height()/2+'px');
	
	$('#nav .toggle').click(function(){
		if($('#nav').hasClass('open')){
			$('#nav').removeClass('open');
		}else{
			$('#nav').addClass('open');
		}
	});
	
	
});
$(window).resize(function(){
	$('#nav .nav-con').css('padding-top',$(window).height()/2 - $('#nav .nav-con').height()/2+'px');
	$('#content').css('padding-top',$(window).height()/2 - $('#content').height()/2+'px');
});


function loadDate(){
	var now = new Date();
	var year = now.getYear() + 1900;
	var month = now.getMonth()+1;
	var day = now.getDate();
	var week = now.getDay();
	switch(week){
		case 1:week = '星期一';break;
		case 2:week = '星期二';break;
		case 3:week = '星期三';break;
		case 4:week = '星期四';break;
		case 5:week = '星期五';break;
		case 6:week = '星期六';break;
		case 0:week = '星期日';break;
	}
	
	var hour = now.getHours();
	var minu = now.getMinutes();
	var sec = now.getSeconds();
	if(sec < 10){
		sec = '0' + sec
	}
	
	
	$('#date').html(year+'-'+month+'-'+day+' '+week);
	$('#time').html(hour+':'+minu+':'+sec);
	$('#day').html(day);
	$('#cndate').html(GetCNDate());
}

