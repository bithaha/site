//选项卡
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6.I.J=2(l){l=6.K({w:0,8:"L",9:"M N",m:"O",o:p,s:0,x:"t",n:"",y:q,u:""},l,{P:Q});v.z(2(){4 b;4 c=-1;4 d=6(v);3(l.y){l.9=l.9+"[R^=\'#\']"}4 e=d.7(l.9);4 f=d.7(l.m);4 g=e.S;4 h=2(a){3(a!=c){e.5(c).A(l.8);f.B();d.7(l.9+":5("+a+")").C(l.8);3(l.o<p&&l.n!="")l.n="";3(l.n=="T"){d.7(l.m+":5("+a+")").U({D:q,E:p})}r 3(l.n=="V"){d.7(l.m+":5("+a+")").W({D:q,E:p})}r{d.7(l.m+":5("+a+")").F()}c=a}};4 j=2(){e.5(c).A(l.8);f.B();3(++c>=g)c=0;e.5(c).C(l.8);f.5(c).F()};h(l.w);3(l.s>0){4 k=X(2(){j()},l.s)}e.z(2(i,a){3(l.x=="t"){6(a).t(2(){h(i);G q})}r 3(l.o>0){6(a).Y(2(){b=Z(2(){h(i);b=H},l.o)},2(){3(b!=H)10(b)})}r{6(a).11(2(){h(i)})}})});3(l.u!="")12(l[l.u]);G v};',62,65,'||function|if|var|eq|jQuery|find|titOnClassName|titCell|||||||||||||mainCell|effect|delayTime|250|false|else|interTime|click|debug|this|defaultIndex|trigger|omitLinks|each|removeClass|hide|addClass|queue|duration|show|return|null|fn|switchTab|extend|current|.tabs|span|.tabs-panel|version|120|href|length|fade|fadeIn|slide|slideDown|setInterval|hover|setTimeout|clearTimeout|mouseover|alert'.split('|'),0,{}))

$(document).ready(function(){
	//返回顶部
	var $backToTopTxt="", $backToTopEle = $('.gotop')
	        .click(function() {
	            $("html, body").animate({ scrollTop:0 }, 300);
				
	}), $backToTopFun = function() {	
        var st = $(document).scrollTop(), winh = $(window).height();
        // (st > 150)? $backToTopEle.fadeIn(): $backToTopEle.fadeOut();    
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 210);    
        }
        
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun();});
		
});

//图片懒加载
$(function() {  
      $("img.lazy").lazyload({
	     loading:true,
	     effectspeed:200,
		 threshold:200,
	     effect:"fadeIn",
		 skip_invisible:false,
		 data_attribute: "src"
	  });
});

//页面适配
$(function() { 
	function init_page(){
		if($(window).width()<1420){
			$('body').addClass('max-width-1420');
			$('html').css('background','none');
		}else{
			$('body').removeClass('max-width-1420');
		}
	}
	init_page();
	$(window).resize(function(){
		init_page();
	})

	var leftTop = $("#left-bar-start").length?($("#left-bar-start").offset().top+$("#left-bar-start").height()):0;
	var rightTop = $("#right-bar-start").length?($("#right-bar-start").offset().top+$("#right-bar-start").height()):0;
	var centerTop = $("#center-bar-start").length?($("#center-bar-start").offset().top+$("#center-bar-start").height()):0;
	console.log(centerTop)
	var scrollFun = function(){
		var st = $(document).scrollTop();
		if(leftTop){
			if(st > leftTop){
		        $('body').addClass('float-fixed-left');
		        $("#left-bar-start .g-bd").css({height: ($(window).height()-220)+'px',overflow:'auto'})
		        if(!$("#left-bar-start .g-bd").attr('data-scroll_active')){
		        	$("#left-bar-start .g-bd").attr('data-scroll_active',1);
		        	$("#left-bar-start .g-bd").mCustomScrollbar({scrollInertia:150});
		        }
	     		
	        }else{
	        	$('body').removeClass('float-fixed-left');
		        $("#left-bar-start .g-bd").css({height: 'auto',overflow:'visible'});
		        $("#left-bar-start .g-bd").mCustomScrollbar("destroy");
		        $("#left-bar-start .g-bd").removeAttr('data-scroll_active');
	        }
	    }
	    if(rightTop){
	        if(st > rightTop){
				$('body').addClass('float-fixed-right');
	        }else{
	        	$('body').removeClass('float-fixed-right');
	        }
        }
        if(centerTop){
	        if( st > centerTop){
				$('body').addClass('float-fixed-center');
	        }else{
	        	$('body').removeClass('float-fixed-center');
	        }
        }
        
	}
	$(window).bind("scroll", scrollFun);
	$(function() { scrollFun();});
})

//顶部导航
$(function(){
	$(".topbar .nav .item,.float-menu .item").hover(function(){
		$(this).addClass('active');
	},function(){
		$(this).removeClass('active');
	})
	/*顶部城市*/
	var current_city= (localStorage && localStorage.getItem('current_city')) || "全国";
	$("#cityname").html(current_city);
	$('.citylist a').each(function(){
		if($(this).html()==current_city){$(this).addClass('active').siblings().removeClass('active');}
	})
	$('.citylist a').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$("#cityname").html($(this).html());
		$(".citylist").parent().parent().removeClass('active');
		localStorage.setItem('current_city',$(this).html())
	});
	/*菜单*/
	$(".btn-menu").click(function(){
		$('.topbar').toggleClass('open-menu-active')
	})
	$(document).on('click',function(){$('.topbar').removeClass('open-menu-active');})
	$('.topbar').click(function(e){e.stopPropagation();})
	/*右侧浮动菜单*/
	$('.float-menu .item').hover(function(){

	})
})