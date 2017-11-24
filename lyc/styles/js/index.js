
//***************** 首页JS ***********************

//大图轮播
var swiper1 = new Swiper('.slide-banners', {
   pagination: '.slide-banners .swiper-page',
   paginationClickable: true,
   autoplay:4000,//停顿时间
   speed:600,
   autoplayDisableOnInteraction:false,
   loop : true
});

//菜单翻屏
var swiper2 = new Swiper('.app-nav', {
   pagination: '.app-nav .swiper-page',
   paginationClickable: true,
   loop : false
});

//要闻翻屏
var swiper4 = new Swiper('.news-slides', {
   pagination: '.today-news .swiper-page',
   paginationClickable: true,
   loop : true
});

//作品翻屏
var swiper5 = new Swiper('.works-slides', {
   pagination: '.works-slides .swiper-page',
   paginationClickable: true,
   loop : true
});

//画室翻屏
var swiper6 = new Swiper('.studio-slides .swiper-container', {
   pagination: '.studio-slides .swiper-page',
   paginationClickable: true,
   slidesPerView:3,//几个为一组
   slidesPerGroup:3,//显示个数
   autoplay:4000,//停顿时间
   speed:1000,   
   autoplayDisableOnInteraction:false,
   loop : true
});

//试卷翻屏
var swiper7 = new Swiper('.test-paper-slides .swiper-container', {
   pagination: '.test-paper-slides .swiper-page',
   paginationClickable: true,
   slidesPerView:3,
   slidesPerGroup:3,
   spaceBetween:6,//间隔
   loop : true
});

//试卷翻屏
var swiper3 = new Swiper('.exam-time-section .swiper-container', {
   pagination: '.exam-time-section .swiper-page',
   paginationClickable: true,
   slidesPerView:2,
   slidesPerGroup:2,
   spaceBetween:6,//间隔
   loop : true
});

//作品栏目-图片等高

$('.works-slide-item img').load(function(){
   var wImgeHeight=$('.works-slide-item li:nth-child(2)').height()-6
   $('.works-slide-item li:nth-child(1) img').css({
      'height':wImgeHeight+'px'
   })
})