
//***************** ��ҳJS ***********************

//��ͼ�ֲ�
var swiper1 = new Swiper('.slide-banners', {
   pagination: '.slide-banners .swiper-page',
   paginationClickable: true,
   autoplay:4000,//ͣ��ʱ��
   speed:600,
   autoplayDisableOnInteraction:false,
   loop : true
});

//�˵�����
var swiper2 = new Swiper('.app-nav', {
   pagination: '.app-nav .swiper-page',
   paginationClickable: true,
   loop : false
});

//Ҫ�ŷ���
var swiper4 = new Swiper('.news-slides', {
   pagination: '.today-news .swiper-page',
   paginationClickable: true,
   loop : true
});

//��Ʒ����
var swiper5 = new Swiper('.works-slides', {
   pagination: '.works-slides .swiper-page',
   paginationClickable: true,
   loop : true
});

//���ҷ���
var swiper6 = new Swiper('.studio-slides .swiper-container', {
   pagination: '.studio-slides .swiper-page',
   paginationClickable: true,
   slidesPerView:3,//����Ϊһ��
   slidesPerGroup:3,//��ʾ����
   autoplay:4000,//ͣ��ʱ��
   speed:1000,   
   autoplayDisableOnInteraction:false,
   loop : true
});

//�Ծ���
var swiper7 = new Swiper('.test-paper-slides .swiper-container', {
   pagination: '.test-paper-slides .swiper-page',
   paginationClickable: true,
   slidesPerView:3,
   slidesPerGroup:3,
   spaceBetween:6,//���
   loop : true
});

//�Ծ���
var swiper3 = new Swiper('.exam-time-section .swiper-container', {
   pagination: '.exam-time-section .swiper-page',
   paginationClickable: true,
   slidesPerView:2,
   slidesPerGroup:2,
   spaceBetween:6,//���
   loop : true
});

//��Ʒ��Ŀ-ͼƬ�ȸ�

$('.works-slide-item img').load(function(){
   var wImgeHeight=$('.works-slide-item li:nth-child(2)').height()-6
   $('.works-slide-item li:nth-child(1) img').css({
      'height':wImgeHeight+'px'
   })
})