$(function($){
    $.fn.moredata = function(){
        var s = this;
        var defaults = {
        	'text': '上拉加载更多',
        	'loadmore': null
        };
        var timeout = null,endLoad = false,isEmpty = false;
        s.init = function(opts){
        	var options = $.extend(defaults,opts);
        	$('.mui-content').append('<div class="loadmore"><i class="mui-icon mui-icon-arrowthindown"></i>'+options.text+'</div>');
        	var touchEvents = {
					'startX': 0,
					'startY': 0,
					'currentX': 0,
					'currentY': 0
				},flag = false;
	    	$(document).off('touchstart touchmove touchend').on({
	    		'touchstart': function(e) {
	    			if(!(getScrollTop() + getWindowHeight() == getScrollHeight())) return;
	    			if (e.originalEvent) e = e.originalEvent;
	    			var touch = e.touches[0];
	    			touchEvents.startX = touch.pageX;
					touchEvents.startY = touch.pageY;
				},
				'touchmove': function(e) {
					if (e.originalEvent) e = e.originalEvent;
					var touch = e.touches[0];
					
					if(isEmpty) return;
					if(!(getScrollTop() + getWindowHeight() == getScrollHeight())) return;
					
					if(!flag){
						flag = true;
						touchEvents.startY = touch.pageY;
					}
					touchEvents.currentY = touch.pageY;
					var movey = (touchEvents.currentY - touchEvents.startY)/2;
					
					if(movey <= 0 ){
						e.preventDefault();e.stopPropagation();
						$('.mui-content').css({'transition':'none','transform':'translateY('+movey+'px)'});
						
					}
					if(movey >= -50){
						$('.loadmore i').css('transform','rotate(180deg)');
					}else{
						$('.loadmore i').css('transform','rotate(0deg)');
					}
					
				},
				'touchend': function(e) {if(isEmpty) return;
					if(!(getScrollTop() + getWindowHeight() == getScrollHeight())) return;		
					var movey = (touchEvents.currentY - touchEvents.startY)/2;
					if(movey<=-50){ /* 下拉刷新 */
						$('.mui-content').css({'transition':'all .2s','transform':'translateY(-50px)'});
						$('.loadmore i').removeClass('mui-icon-arrowthindown').addClass('mui-pull-loading mui-spinner').attr('style','-webkit-transition: -webkit-transform 0.3s ease-in; transition: -webkit-transform 0.3s ease-in; -webkit-transform: rotate(180deg); -webkit-animation: spinner-spin 1s step-end infinite;');
						
						if(options.loadmore) options.loadmore(s.moreDataComplete,s.empty); /* 自定义下拉刷新事件 */
						flag = false;
						timeout = setTimeout(function(){
							if(!endLoad){
								s.moreDataComplete();
							}
							window.clearTimeout(timeout);
						},2000);
						
					}else{ /* 不刷新，回弹 */
						$('.mui-content').css({'transition':'all .2s','transform':'translateY(0px)'});
						$('.loadmore i').css('transform','rotate(0deg)');
					}							
				}

			});

        }
        s.moreDataComplete = function(){
        	endLoad = true;
			$('.mui-content').css({'transform':'translateY(0)'});
			$('.loadmore i').addClass('mui-icon-arrowthindown').removeClass('mui-pull-loading mui-spinner').removeAttr('style');
        }
        s.empty = function(){
        	isEmpty = true;
        	if($('.mui-content .moredata-empty').length <= 0){
        		$('.mui-content').append('<div class="moredata-empty">没有更多数据了</div>');
        	}
        	$('.mui-content .loadmore').remove();
        }
        s.destroy = function(){
        	isEmpty = true;
        	$('.mui-content .loadmore').remove();        	
        }
        return {
        	'init': s.init,
        	'moreDataComplete': s.moreDataComplete,
        	'empty': s.empty,
        	'destroy': s.destroy
        };
    }();
})