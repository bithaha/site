var ROOT_CONFIG = {
    domain: "http://www.meyur.cn/meyur"
}

/* rem布局，
    1rem = body宽度 / 16 
    长度rem = 16 x 设计图实际像素/设计图宽度
*/
;(function(doc, win) {
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
(function() {
    function yyConfirm(text, callback, params) {
        var defaults = {
            'okText': '确定',
            'cancelText': '取消',
            'cancelFun': null
        };
        var options = extend(defaults, params);

        var confirmEle = document.getElementById('yyconfirm-dialog'),
            coverbox, popbox, yyBtnConfirm, yyBtnCancel;
        if (confirmEle === undefined || confirmEle==null || confirmEle.length <= 0) {
            var cover = '<div id="yyconfirm-cover" class="yyalert-cover" style=""><div class="yyalert-cover-inner"></div></div>';
            var divelement = '<div class="yyalert" id="yyconfirm"><div class="yyalert-text">' + text + '</div><div class="yyalert-footer"><a href="javascript:void(0);" id="yyBtnCancel" class="yyalert-btn">取消</a><a href="javascript:void(0);" id="yyBtnConfirm" class="yyalert-btn">知道了</a></div><a class="yy-close" id="yyBtnClose"><i class="ion-ios-close-empty"></i></a></div>';
            confirmEle = document.createElement('div');
            confirmEle.setAttribute('id', 'yyconfirm-dialog');
            confirmEle.innerHTML = cover + divelement;
            document.body.appendChild(confirmEle);
        }
        coverbox = document.getElementById('yyconfirm-cover');
        popbox = document.getElementById('yyconfirm');
        yyBtnConfirm = document.getElementById('yyBtnConfirm');
        yyBtnCancel = document.getElementById('yyBtnCancel');
        /* set */
        yyBtnConfirm.innerHTML = options.okText;
        yyBtnCancel.innerHTML = options.cancelText;
        popbox.children[0].innerHTML = text;

        popbox.style.marginTop = -popbox.offsetHeight / 2 + 'px';
        popbox.style.marginLeft = -popbox.offsetWidth / 2 + 'px';
        setTimeout(function() {
            confirmEle.classList.add('open');
        }, 50);
        coverbox.onclick = function() {
            confirmEle.classList.remove('open');
        };
        document.getElementById('yyBtnClose').onclick = function() {
            confirmEle.classList.remove('open');
        };
        yyBtnCancel.onclick = function() {
            confirmEle.classList.remove('open');
            if (options.cancelFun !== null && typeof(eval(options.cancelFun)) == "function") {
                options.cancelFun();
            }
        };
        yyBtnConfirm.onclick = function() {
            confirmEle.classList.remove('open');
            if (callback !== null && typeof(eval(callback)) == "function") {
                callback();
            }
        };

    }
    window.yyConfirm = yyConfirm;
})();
(function($){
    var loading = {};
    var defaults = {
        text: "",
    }
    var timer;
    loading.show = function(opt){
        var opts = $.extend(true,{},defaults, opt);
        var temp = $('<div class="loading back-cover" id="loading"><div class="inner"><div class="loading-img"></div><span class="text"></span></div></div>');
        if($('#loading').length > 0){
            temp = $('#loading');
        }else{
            $('body').append(temp);
        }

        window.clearTimeout(timer);

        if(opts.text){
            temp.find('.text').html(opts.text);
        }
        if(opts.template){
            temp.find('.inner').html(opts.template);
        }
        if(opts.noCover){
            temp.removeClass('back-cover');
        }
        if(opts.duration){
            timer = setTimeout(function(){
                loading.hide();
            },parseInt(opts.duration));
        }


    }
    loading.hide = function(){
        $('#loading').remove();
    }

    $.extend({
        loading: loading
    });
})(jQuery);
!function(a){"use strict";function g(a){a.touches||(a.touches=a.originalEvent.touches)}function h(a,b){b._startY=a.touches[0].pageY,b.touchScrollTop=b.$scrollArea.scrollTop()}function i(b,c){c._curY=b.touches[0].pageY,c._moveY=c._curY-c._startY,c._moveY>0?c.direction="down":c._moveY<0&&(c.direction="up");var d=Math.abs(c._moveY);""!=c.opts.loadUpFn&&c.touchScrollTop<=0&&"down"==c.direction&&!c.isLockUp&&(b.preventDefault(),c.$domUp=a("."+c.opts.domUp.domClass),c.upInsertDOM||(c.$element.prepend('<div class="'+c.opts.domUp.domClass+'"></div>'),c.upInsertDOM=!0),n(c.$domUp,0),d<=c.opts.distance?(c._offsetY=d,c.$domUp.html(c.opts.domUp.domRefresh)):d>c.opts.distance&&d<=2*c.opts.distance?(c._offsetY=c.opts.distance+.5*(d-c.opts.distance),c.$domUp.html(c.opts.domUp.domUpdate)):c._offsetY=c.opts.distance+.5*c.opts.distance+.2*(d-2*c.opts.distance),c.$domUp.css({height:c._offsetY}))}function j(b){var c=Math.abs(b._moveY);""!=b.opts.loadUpFn&&b.touchScrollTop<=0&&"down"==b.direction&&!b.isLockUp&&(n(b.$domUp,300),c>b.opts.distance?(b.$domUp.css({height:b.$domUp.children().height()}),b.$domUp.html(b.opts.domUp.domLoad),b.loading=!0,b.opts.loadUpFn(b)):b.$domUp.css({height:"0"}).on("webkitTransitionEnd mozTransitionEnd transitionend",function(){b.upInsertDOM=!1,a(this).remove()}),b._moveY=0)}function k(a){""!=a.opts.loadDownFn&&a.opts.autoLoad&&a._scrollContentHeight-a._threshold<=a._scrollWindowHeight&&m(a)}function l(a){a._scrollContentHeight=a.opts.scrollArea==b?e.height():a.$element[0].scrollHeight}function m(a){a.direction="up",a.$domDown.html(a.opts.domDown.domLoad),a.loading=!0,a.opts.loadDownFn(a)}function n(a,b){a.css({"-webkit-transition":"all "+b+"ms",transition:"all "+b+"ms"})}var f,b=window,c=document,d=a(b),e=a(c);a.fn.dropload=function(a){return new f(this,a)},f=function(a,b){var c=this;c.$element=a,c.upInsertDOM=!1,c.loading=!1,c.isLockUp=!1,c.isLockDown=!1,c.isData=!0,c._scrollTop=0,c._threshold=0,c.init(b)},f.prototype.init=function(f){var l=this;l.opts=a.extend(!0,{},{scrollArea:l.$element,domUp:{domClass:"dropload-up",domRefresh:'<div class="dropload-refresh">↓下拉刷新</div>',domUpdate:'<div class="dropload-update">↑释放更新</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>'},domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">↑上拉加载更多</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>',domNoData:'<div class="dropload-noData">暂无数据</div>'},autoLoad:!0,distance:50,threshold:"",loadUpFn:"",loadDownFn:""},f),""!=l.opts.loadDownFn&&(l.$element.append('<div class="'+l.opts.domDown.domClass+'">'+l.opts.domDown.domRefresh+"</div>"),l.$domDown=a("."+l.opts.domDown.domClass)),l._threshold=l.$domDown&&""===l.opts.threshold?Math.floor(1*l.$domDown.height()/3):l.opts.threshold,l.opts.scrollArea==b?(l.$scrollArea=d,l._scrollContentHeight=e.height(),l._scrollWindowHeight=c.documentElement.clientHeight):(l.$scrollArea=l.opts.scrollArea,l._scrollContentHeight=l.$element[0].scrollHeight,l._scrollWindowHeight=l.$element.height()),k(l),d.on("resize",function(){clearTimeout(l.timer),l.timer=setTimeout(function(){l._scrollWindowHeight=l.opts.scrollArea==b?b.innerHeight:l.$element.height(),k(l)},150)}),l.$element.on("touchstart",function(a){l.loading||(g(a),h(a,l))}),l.$element.on("touchmove",function(a){l.loading||(g(a,l),i(a,l))}),l.$element.on("touchend",function(){l.loading||j(l)}),l.$scrollArea.on("scroll",function(){l._scrollTop=l.$scrollArea.scrollTop(),""!=l.opts.loadDownFn&&!l.loading&&!l.isLockDown&&l._scrollContentHeight-l._threshold<=l._scrollWindowHeight+l._scrollTop&&m(l)})},f.prototype.lock=function(a){var b=this;void 0===a?"up"==b.direction?b.isLockDown=!0:"down"==b.direction?b.isLockUp=!0:(b.isLockUp=!0,b.isLockDown=!0):"up"==a?b.isLockUp=!0:"down"==a&&(b.isLockDown=!0,b.direction="up")},f.prototype.unlock=function(){var a=this;a.isLockUp=!1,a.isLockDown=!1,a.direction="up"},f.prototype.noData=function(a){var b=this;void 0===a||1==a?b.isData=!1:0==a&&(b.isData=!0)},f.prototype.resetload=function(){var b=this;"down"==b.direction&&b.upInsertDOM?b.$domUp.css({height:"0"}).on("webkitTransitionEnd mozTransitionEnd transitionend",function(){b.loading=!1,b.upInsertDOM=!1,a(this).remove(),l(b)}):"up"==b.direction&&(b.loading=!1,b.isData?(b.$domDown.html(b.opts.domDown.domRefresh),l(b),k(b)):b.$domDown.html(b.opts.domDown.domNoData))}}(window.Zepto||window.jQuery);

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
var API = {
    getQueryString : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2])
        }
        return null
    },
    filter:{
        wageLevel:function(a){
            result = "其它";
            switch(a){
                case "1": result = "2千以下";break;
                case "2": result = "2千-4千";break;
                case "3": result = "4千-6千";break;
                case "4": result = "6千-8千";break;
                case "5": result = "8千-1万";break;
                case "6": result = "1万-1.5万";break;
                case "7": result = "1.5万-2万";break;
                case "8": result = "2万-3万";break;
                case "9": result = "3万-4万";break;
                case "10": result = "4万-5万";break;
                case "11": result = "5万以上";break;
            }
            return result;
        },
        workTime:function(a){
            result = "其它";
            switch(a){
                case "1": result = "无经验";break;
                case "2": result = "1-3年";break;
                case "3": result = "3-5年";break;
                case "4": result = "5-10年";break;
                case "5": result = "10年以上";break;
            }
            return result;
        },
        reqEducation:function(a){
             result = "其它";
            switch(a){
                case "1": result = "博士";break;
                case "2": result = "硕士";break;
                case "3": result = "本科";break;
                case "4": result = "大专";break;
                case "5": result = "其它";break;
            }
            return result;
        }
    }
}
Date.prototype.Format = function (fmt) {
     var o = {
         "M+": this.getMonth() + 1, //月份 
         "d+": this.getDate(), //日 
         "H+": this.getHours(), //小时 
         "m+": this.getMinutes(), //分 
         "s+": this.getSeconds(), //秒 
         "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
         "S": this.getMilliseconds() //毫秒 
     };
     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     for (var k in o)
     if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
     return fmt;
}
$(document).ready(function(){

    
    //返回顶部
    var $backToTopTxt="", $backToTopEle = $('.gotop')
        .click(function() {
            $("html, body").animate({ scrollTop:0 }, 300);
            
    }), $backToTopFun = function() {    
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 50)? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();    
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 210);    
        }
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun();});


    $('#topuser').on('click',function(){
        if($('.header').hasClass('active')){
            $('.header').removeClass('active');
            $('.menu-cover').remove();
        }else{
            $('.header').addClass('active');
            var cover = $('<div class="menu-cover active"></div>')
            $('body').append(cover);
            cover.off('click').on('click',function(){
                $('.header').removeClass('active');
                $('.menu-cover').remove();
            })
        }
    })
    
});