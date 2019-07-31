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
                docEl.style.fontSize = 100 * document.body.clientWidth / 600 + 'px';
            }else{
                docEl.style.fontSize = 100 * 600 / 600 + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.initRem = recalc;
    win.onresize = function(){recalc();};
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


$(function(){
	
})

$(function(){
	/* 懒加载 */
    if($("img.lazy").length > 0){
        $("img.lazy").lazyload({ effect : "fadeIn",data_attribute:"src"});   
    }
})
