var ROOT_CONFIG = {
    domain: "http://www.meyur.cn"
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
    data:{
        wageLevel: [{"key": -1, "value": "面议" },
                    {"key": 0, "value": "保密" },
                    {"key": 1, "value": "2千以下" },
                    {"key": 2, "value": "2千-4千"},
                    {"key": 3, "value": "4千-6千"},
                    {"key": 4, "value": "6千-8千"},
                    {"key": 5, "value": "8千-1万"},
                    {"key": 6, "value": "1万-1.5万"},
                    {"key": 7, "value": "1.5万-2万"},
                    {"key": 8, "value": "2万-3万"},
                    {"key": 9, "value": "3万-4万"},
                    {"key": 10, "value": "4万-5万"},
                    {"key": 11, "value": "5万以上"}],
        workTime: [{"key": 1, "value": "无经验" },
                    {"key": 2, "value": "1-3年"},
                    {"key": 3, "value": "3-5年"},
                    {"key": 4, "value": "5-10年"},
                    {"key": 5, "value": "10年以上"}],
        reqEducation: [{"key": 1, "value": "博士" },
                    {"key": 2, "value": "硕士"},
                    {"key": 3, "value": "本科"},
                    {"key": 4, "value": "大专"},
                    {"key": 5, "value": "其它"}],
        welfare:[{type: 1, name: "美女如云"},
                 {type: 2, name: "餐补"},
                 {type: 3, name: "住房补贴"},
                 {type: 4, name: "包住"},
                 {type: 5, name: "包食宿"},
                 {type: 6, name: "五险一金"},
                 {type: 7, name: "六险一金"},
                 {type: 8, name: "话补"},
                 {type: 9, name: "双休"},
                 {type: 10, name: "年度旅游"},
                 {type: 11, name: "带薪年假"},
                 {type: 12, name: "专业团队"},
                 {type: 13, name: "弹性工作制"},
                 {type: 14, name: "期权"},
                 {type: 15, name: "年终奖"},
                 {type: 16, name: "公司氛围好"},
                 {type: 17, name: "领导nice"},
                 {type: 18, name: "年终分红"},
                 {type: 19, name: "扁平管理"},
                 {type: 20, name: "地铁周边"},
                 {type: 21, name: "移动互联网"}],
        companyScale: [{"key":1,"value":"少于50人"},
                       {"key":2,"value":"50-150人"},
                       {"key":3,"value":"150-500人"},
                       {"key":4,"value":"500-1000人"},
                       {"key":5,"value":"1000-5000人"},
                       {"key":6,"value":"5000-10000人"},
                       {"key":7,"value":"10000人以上"},]                  
    },
    filter:{
        wageLevel:function(a){
            var result = "其它";
            var item = API.data.wageLevel.find(function(b){
                return b.key == a;
            })
            item && (result = item.value);return result;
        },
        workTime:function(a){
            var result = "其它";
            var item = API.data.workTime.find(function(b){
                return b.key == a;
            })
            item && (result = item.value);return result;
        },
        reqEducation:function(a){
            var result = "其它";
            var item = API.data.reqEducation.find(function(b){
                return b.key == a;
            })
            item && (result = item.value);return result;
        },
        jobDate:function(timestemp){
            var d = new Date(timestemp),now = new Date();
            if(d.getFullYear() == now.getFullYear() && d.getMonth() == now.getMonth()){
                if(d.getDate() == now.getDate()){
                    return "今天";
                }else if(d.getDate() == now.getDate() - 1){
                    return "昨天";
                }else if(d.getDate() == now.getDate() - 2){
                    return "前天";
                }
            }
            return d.Format("MM-dd");
        },
        welfareTypes:function(type){
            return API.data.welfare.find(function(item){ return item.type==type;}).name;
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
    });
	/* 通用拦截 */
	if(!API.getQueryString("id") && !sessionStorage.getItem("user_id") && location.href.indexOf('job_detail')<=-1 && location.href.indexOf('resume_list_detail')<=-1){
		location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce4fd3757ef3a868&redirect_uri=http%3a%2f%2fwww.meyur.cn%2fWechatRedirectServlet%2flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
	}
    
});

function goback(){
    var checkJobDetail = function(){
        if(document.referrer == '' && location.href.indexOf('job_detail') > -1){
            window.location.href = "index.html";
        }else{
            window.history.go( -1 );
        }
    }
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){ // IE
        if(history.length > 0){
            checkJobDetail();
        }else{
            window.location.href = "index.html";
        }
    }else{ //非IE浏览器
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||
            navigator.userAgent.indexOf('Opera') >= 0 ||
            navigator.userAgent.indexOf('Safari') >= 0 ||
            navigator.userAgent.indexOf('Chrome') >= 0 ||
            navigator.userAgent.indexOf('WebKit') >= 0){

            if(window.history.length > 1){
                checkJobDetail();
            }else{
                window.location.href = "index.html";
            }
        }else{ //未知的浏览器
            checkJobDetail();
        }
    }
}
function initGuanzhu(){
    var guanzhu = '<div class="wx-guanzhu">\
                    <img src="http://www.meyur.cn/recruit_web/assets/images/meiyue_logo.jpg">\
                    <div class="det">\
                        <p>微信关注美约人才</p>\
                        <p>获取全国企业招聘信息</p>\
                    </div>\
                    <a class="btn" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5OTAyMDU2Nw==&scene=124#wechat_redirect">关注</a>\
                </div>'
    if($('.wx-guanzhu').length <= 0){
        $('body').addClass('has-guanzhu').append(guanzhu);
    }
}