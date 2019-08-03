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


var language = {
    init: function(){
        $('body').append(`<div class="countryWrapper">
            <div class="countryMask"></div>
            <div class="countryWrap" style="">
                <i class="icon-close" onclick="language.close()"></i>
                <a href="#"><img src="assets/images/language/c25ea55.svg" alt="" class="countryImg"> <span>Global</span></a>
                <a href="#"><img src="assets/images/language/1536c93.svg" alt="" class="countryImg"> <span>Česko</span></a>
                <a href="#"><img src="" alt="" class="countryImg"> <span>Colombia</span></a>
                <a href="#"><img src="assets/images/language/5ad4195.svg" alt="" class="countryImg"> <span>Deutschland</span></a>
                <a href="#"><img src="assets/images/language/f7d3cf9.svg" alt="" class="countryImg"> <span>Espana</span></a>
                <a href="#"><img src="assets/images/language/c8b9d57.svg" alt="" class="countryImg"> <span>Ελλάδα</span></a>
                <a href="#"><img src="assets/images/language/france.svg" alt="" class="countryImg"> <span>France</span></a>
                <a href="#"><img src="assets/images/language/f32d28c.svg" alt="" class="countryImg"> <span>Hrvatska</span></a>
                <a href="#"><img src="assets/images/language/italia.svg" alt="" class="countryImg"> <span>Italia</span></a>
                <a href="#"><img src="assets/images/language/nederland.svg" alt="" class="countryImg"> <span>Nederland</span></a>
                <a href="#"><img src="assets/images/language/dd05728.svg" alt="" class="countryImg"> <span>Slovenija</span></a>
                <a href="#"><img src="assets/images/language/45b729c.svg" alt="" class="countryImg"> <span>Srbija</span></a>
                <a href="#"><img src="assets/images/language/polska.svg" alt="" class="countryImg"> <span>Polska</span></a>
                <a href="/" class="nuxt-link-exact-active nuxt-link-active"><img src="assets/images/language/china.svg" alt="" class="countryImg"> <span>中国</span></a></div>
        </div>`)
    },
    show: function(){
        if(!$('.countryWrapper').length){
            this.init();
        }
        setTimeout(function(){
            $('.countryWrap,.countryMask').addClass('open')
        })
        
    },
    close: function(){
        $('.countryWrap,.countryMask').removeClass('open')
    }
}