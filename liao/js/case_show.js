var caseShow = {
	data:{
		href:'case_show.html'
	},
	
	show:function(o){
		$('body').append('<iframe src="'+caseShow.data.href+'" id="show_iframe" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe><a href="javascript:;" class="show-close" onclick="caseShow.hide();"></a>');
		
		
		
		$('body').css('overflow','hidden');
		
		$('#cover').fadeIn(1);
		/*$('#show').show().stop(false.true).animate({'width':w+'px','margin-left':-w/2+'px'},300);*/
		$('#show_iframe').css({
			'position':'fixed',
			'top':'0',
			'z-index':'9000'
		});
		
		
		$('#cover').click(function(){
			if($('#loading').length>0){
				$('#loading').remove();
			}
			caseShow.hide();
		})
		
	},
	
	hide:function(){
		//$('#show').show().stop(false.true).animate({'width':'0px','margin-left':'0px'},300);
		//$('#show,#cover').fadeOut(300);
		//setTimeout(function(){$('#show,#cover').remove();},300);
		$(window.parent.document).find('#show_iframe').remove();
		$('.show-close').remove();
	}
}

$(function(){
	$('.case-con li,.caselist li').click(function(){
		
		//caseShow.data.href = $(this).find('.open').attr('href');
		
		caseShow.show();
		
	});
	
	
})

