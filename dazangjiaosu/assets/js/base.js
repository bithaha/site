/* rem布局，
    1rem = body宽度 / 16 
    长度rem = 16 x 设计图实际像素/设计图宽度
*/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (document.body.clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.onresize = function(){recalc();};
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

(function() {
    function yyAlert(text, callback, params) {
        var defaults = {
            'okText': '确定'
        };
        var options = extend(defaults, params);

        var alertEle = document.getElementById('yyalert-dialog'),
            coverbox, popbox, yyBtnConfirm;

        if (alertEle === undefined || alertEle == null || alertEle.length <= 0) {
            var cover = '<div id="yyalert-cover" class="yyalert-cover" style=""><div class="yyalert-cover-inner"></div></div>';
            var divelement = '<div class="yyalert" id="yyalert"><div class="yyalert-text">' + text + '</div><div class="yyalert-footer"><a href="javascript:void(0);" id="yyBtnAlert" class="yyalert-btn">知道了</a></div></div>';
            alertEle = document.createElement('div');
            alertEle.setAttribute('id', 'yyalert-dialog');
            alertEle.innerHTML = cover + divelement;

            document.body.appendChild(alertEle);
        }
        coverbox = document.getElementById('yyalert-cover');
        popbox = document.getElementById('yyalert');
        yyBtnConfirm = document.getElementById('yyBtnAlert');

        /* set */
        yyBtnConfirm.innerHTML = options.okText;
        popbox.children[0].innerHTML = text;
        /* position */
        popbox.style.marginTop = - popbox.offsetHeight / 2 + 'px';
        popbox.style.marginLeft = - popbox.offsetWidth / 2 + 'px';
        setTimeout(function() {
            alertEle.classList.add('open');
        }, 50);
        coverbox.onclick = function() {
            alertEle.classList.remove('open');
        };
        yyBtnConfirm.onclick = function() {
            alertEle.classList.remove('open');
            if (callback !== null && typeof(eval(callback)) == "function") {
                callback();
            }
        };
    }
    window.yyAlert = yyAlert;
})();
var loading = {
	"show": function(){
		if($('#loading').length <= 0){
			$('body').append('<div class="loading-container" id="loading"><div class="loading spinner"></div></div>')
		}
		$('#loading').addClass('active');
	},
	"hide":function(){
		$('#loading').removeClass('active');
	}
}

/* extend 模拟jquery的$.extend() */
function extend(destination, source) {
    var d = deepCopy(destination);
    for (var property in source)
        d[property] = source[property];
    return d;
}
/* 深拷贝 */
var deepCopy = function(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;

    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}
$(function($){
    $.fn.moredata = function(){
        var s = this;
        var defaults = {
            'text': '下拉刷新',
            'loadmore': null
        };
        var timeout = null,endLoad = true,isLoading = false;
        s.init = function(opts){
            var options = $.extend(defaults,opts);
            if($(".refresh").length <= 0){
                $('body').append('<div class="refresh"><div class="inner"></div></div>');
            }
            
            var touchEvents = {
                    'startX': 0,
                    'startY': 0,
                    'currentX': 0,
                    'currentY': 0
                },flag = false;
            $(document).off('touchstart touchmove touchend').on({
                'touchstart': function(e) {
                    if($('body').scrollTop() > 0) return;
                    if (e.originalEvent) e = e.originalEvent;
                    var touch = e.touches[0];
                    touchEvents.startX = touch.pageX;
                    touchEvents.startY = touch.pageY;
                },
                'touchmove': function(e) {
                    if (e.originalEvent) e = e.originalEvent;
                    var touch = e.touches[0];
                    
                    if($('body').scrollTop() > 0 || isLoading) return;
                    
                    if(!flag){
                        flag = true;
                        touchEvents.startY = touch.pageY;
                    }
                    touchEvents.currentY = touch.pageY;
                    var movey = (touchEvents.currentY - touchEvents.startY)/2;
                    
                    if(movey >= 0 && movey <=100){
                        e.preventDefault();e.stopPropagation();endLoad = false;
                        $('.refresh').css({'opacity':movey/100,'transition':'none','transform':'translateY('+movey+'px)'});
                        $(".refresh .inner").css({'transform':'rotate(-'+movey*3.6+'deg)'});
                        
                    }
                    
                },
                'touchend': function(e) {
                    if($('body').scrollTop() > 0 || isLoading) return;      
                    var movey = (touchEvents.currentY - touchEvents.startY)/2;
                    if(movey>=100 && !endLoad){ /* 下拉刷新 */
                        $('.refresh').css({'transition':'all .2s','transform':'translateY(50px)'});
                        $('.refresh .inner').addClass('rotating');
                        
                        if(options.getData) options.getData(s.complete); /* 自定义下拉刷新事件 */
                        flag = false;
                        isLoading = true;
                        // timeout = setTimeout(function(){
                        //     if(!endLoad){
                        //         s.complete();
                        //     }
                        //     window.clearTimeout(timeout);
                        // },2000);
                        
                    }else{ /* 不刷新，回弹 */
                        $('.refresh').css({'opacity':'0','transition':'all .2s','transform':'translateY(0px)'});
                        $('.refresh .inner').removeClass('rotating');
                    }                           
                }

            });

        }
        s.complete = function(){
            endLoad = true;isLoading = false;
            $('.refresh').css({'opacity':'0','transform':'translateY(0)'});
            $('.refresh .inner').removeClass('rotating');
        }
        s.destroy = function(){
            $('.refresh').remove();           
        }
        return {
            'init': s.init,
            'complete': s.complete,
            'empty': s.empty,
            'destroy': s.destroy
        };
    }();
})
