/* rem布局, 设计稿宽度1080px
    长度rem = 设计图实际像素/100
*/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth < 600){
                docEl.style.fontSize = 100 * document.body.clientWidth / 1080 + 'px';
            }else{
                docEl.style.fontSize = 100 * 600 / 1080 + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.initRem = recalc;
    win.onresize = function(){recalc();};
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


$(function(){
	/* 懒加载 */
    if($("img.lazy").length > 0){
        $("img.lazy").lazyload({ effect : "fadeIn",data_attribute:"src"});   
    }
   
    

})

$(document).ready(function(){
	
	//返回顶部
	var $backToTopTxt="",$backToTopEle = $('.gotop')
	        .click(function() {
	            $("html, body").animate({ scrollTop:0 }, 300);
				
	}), $backToTopFun = function() {	
	        var st = $(document).scrollTop(), winh = $(window).height();
	        (st > 150)? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();    
	        if (!window.XMLHttpRequest) {
	            $backToTopEle.css("top", st + winh - 210);    
	        }
            if($('.a-header').length){
                if(st>0){
                    $('.a-header').addClass('fixed');
                }else{
                    $('.a-header').removeClass('fixed');
                }
            }
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun();});
	
});

/*城市选择插件*/
;(function(window,$){
var city_modal={
    container: $(".city-modal"),
    show:function(){
        this.container.addClass('active');
        this.bind_click();
    },
    bind_click:function(){
        var _this = this;
        this.container.off('click')
        .on('click','.btn-close',function(){
            _this.hide();
        })
        .on('click','.item',function(){
            $(this).addClass('active').siblings().removeClass('active');
            _this.hide();
            $(".city-select span").html($(this).text());
            localStorage.setItem('current_city',$(this).text());
        })
    },
    hide:function(){
        this.container.removeClass('active');
    },
    init:function(){
        if(!this.container.length){
            $('body').append('<div class="modal city-modal ">\
                <div class="head">\
                    <a class="btn-close"></a>\
                    <h3 class="title">所有地区</h3>\
                </div>\
                <div class="subhead">\
                    <span class="tip">点击确定地区</span>\
                </div>\
                <div class="body">\
                    <div class="city-list">\
                        <a class="item active">全国</a>\
                        <a class="item hot">北京</a>\
                        <a class="item">天津</a>\
                        <a class="item">河北</a>\
                        <a class="item">山西</a>\
                        <a class="item">内蒙古</a>\
                        <a class="item">辽宁</a>\
                        <a class="item">吉林</a>\
                        <a class="item">黑龙江</a>\
                        <a class="item hot">上海</a>\
                        <a class="item">江苏</a>\
                        <a class="item">浙江</a>\
                        <a class="item">安徽</a>\
                        <a class="item">福建</a>\
                        <a class="item">江西</a>\
                        <a class="item">山东</a>\
                        <a class="item">河南</a>\
                        <a class="item">湖北</a>\
                        <a class="item">湖南</a>\
                        <a class="item">广东</a>\
                        <a class="item">广西</a>\
                        <a class="item">海南</a>\
                        <a class="item">重庆</a>\
                        <a class="item">四川</a>\
                        <a class="item">贵州</a>\
                        <a class="item">云南</a>\
                        <a class="item">西藏</a>\
                        <a class="item">陕西</a>\
                        <a class="item">甘肃</a>\
                        <a class="item">青海</a>\
                        <a class="item">宁夏</a>\
                        <a class="item">新疆</a>\
                        <a class="item">港澳台</a>\
                    </div>\
                </div>\
            </div>')
        }
        this.container = $(".city-modal")
        var city = localStorage.getItem('current_city') || '全国';
        $(".city-select span").html(city);
        this.container.find('.city-list').find('.item').each(function(){
            if($(this).text()==city){
                $(this).addClass('active').siblings().removeClass('active');
            }
        })  
    }
}
window.city_modal = city_modal;
})(window,jQuery);
/*频道选择插件*/
;(function(window,$){
var channel_modal={
    container: $(".channel-modal"),
    show:function(){
        this.container.addClass('active');
        this.bind_click();
    },
    bind_click:function(){
        var _this = this;
        this.container.off('click')
        .on('click','.btn-close',function(){
            _this.hide();
        })
        .on('click','.item',function(){
            $(this).addClass('active').siblings().removeClass('active');
            _this.hide();
        })
    },
    hide:function(){
        this.container.removeClass('active');
    },
    init:function(){
        if(!this.container.length){
            var channel_list_dom = '';
            var channel_list = [];
            var active_channel = $(".navbar li.active a").text();
            if(localStorage.getItem('channel_list')){
                channel_list = JSON.parse(localStorage.getItem('channel_list'));
            }else{
                $('.navbar ul li').each(function(){
                    channel_list.push({name:$(this).text(),hot:$(this).hasClass('hot')?1:0,href:$(this).find('a').attr('href'),active: active_channel==$(this).text()})
                })
            }
            
            $('.navbar ul').empty();
            channel_list.map(function(item,i){
                channel_list_dom+='<a class="item '+(item.active?'active':'')+' '+(item.hot?'hot':'')+'" data-href="'+item.href+'">'+item.name+'</a>';
               
                $('.navbar ul').append('<li class="'+(item.active?'active':'')+'"><a href="'+item.href+'">'+item.name+'</a></li>')
            })
            $('body').append('<div class="modal channel-modal ">\
                <div class="head">\
                    <a class="btn-close"></a>\
                    <h3 class="title">所有频道</h3>\
                </div>\
                <div class="subhead">\
                    <span class="tip">点击进入频道</span>\
                </div>\
                <div class="body">\
                    <div class="city-list">'+channel_list_dom+'\
                    </div>\
                </div>\
            </div>')
        }
        this.container = $(".channel-modal");

        var el = this.container.find('.city-list');
        Sortable.create(el[0], {
            handle: ".item",
            onEnd:function(evt){
                var list = [];
                el.find('.item').each(function(){
                    list.push({name:$(this).text(),hot:$(this).hasClass('hot')?1:0,href:$(this).attr('data-href'),active: active_channel==$(this).text()})
                })
                localStorage.setItem('channel_list',JSON.stringify(list));

                $('.navbar ul').empty();
                list.map(function(item,i){
                    $('.navbar ul').append('<li class="'+(item.active?'active':'')+'"><a href="'+item.href+'">'+item.name+'</a></li>')
                })
            }
        })
    }
}
window.channel_modal = channel_modal;
})(window,jQuery);
