var ROOT_CONFIG = {
    domain: "http://wwk.ngrok.xiaomiqiu.cn/"
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
(function($){
    var loading = {};
    var defaults = {
        text: "",
    }
    var timer;
    loading.show = function(opt){
        var opts = $.extend(true,{},defaults, opt);
        var temp = $('<div class="loading back-cover" id="loading"><div class="inner"><div class="loading-img"><div><span class="text"></span></div></div>');
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
    }
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