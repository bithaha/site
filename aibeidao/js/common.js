$(function(){
	
	
	//大图轮播
	$('.slide-banners').owlCarousel({
		autoplay:true,
		loop:true,
		margin:0,
		dots: true,
		nav: true,
		autoplayTimeout:5000,
		smartSpeed:500,
		lazyLoad:true,
		items:1,
		mouseDrag:true,
		slideBy:1
	});	
	//大图轮播
	$('.g-slide').owlCarousel({
		autoplay:true,
		loop:true,
		margin:0,
		dots: true,
		nav: false,
		autoplayTimeout:5000,
		smartSpeed:500,
		lazyLoad:true,
		items:1,
		mouseDrag:true,
		slideBy:1
	});	
	//品牌轮播
	$('.brand-slide').owlCarousel({
		autoplay:true,
		loop:true,
		margin:0,
		dots: false,
		nav: false,
		autoplayTimeout:3000,
		smartSpeed:500,
		lazyLoad:true,
		items:8,
		mouseDrag:true,
		slideBy:1
	});	
});
//顶部左侧菜单
silderbar("#ul-cont li", "#menuCon .sub-pannel");
/*
 *
 * 鍒ゆ柇IE鐗堟湰鏂规硶
 * return   myBrowser()=="IE7" myBrowser()=="IE8"
 *
 */
function myBrowser(ie) {
		var userAgent = navigator.userAgent;
		var isOpera = userAgent.indexOf("Opera") > -1; 
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; 
		var isFF = userAgent.indexOf("Firefox") > -1; 
		var isSafari = userAgent.indexOf("Safari") > -1; 

		if (isIE) {
			var IE5 = IE55 = IE6 = IE7 = IE8 = false;
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);

			IE55 = fIEVersion == 5.5;
			IE6 = fIEVersion == 6.0;
			IE7 = fIEVersion == 7.0;
			IE8 = fIEVersion == 8.0;
			IE9 = fIEVersion == 9.0;
			if (ie) {
				return "IE"
			}
			if (IE55) {
				return "IE55";
			}
			if (IE6) {
				return "IE6";
			}
			if (IE7) {
				return "IE7";
			}
			if (IE8) {
				return "IE8";
			}
			if (IE9) {
				return "IE9";
			}
		} //isIE end

		if (isFF) {
			return "FF";
		}
		if (isOpera) {
			return "Opera";
		}

	} //myBrowser() end
//if IE8 IE7 
function iFie(json) {
	var ie = myBrowser()
	if (ie == "IE7" || ie == "IE8") {
		if (ie == "IE8" && json["ie8"]) {
			return json["ie8"]();
		}
		if (ie == "IE7" && json["ie7"]) {
			return json["ie7"]();
		}
		if (json["ie78"]) {
			return json["ie78"]();
		}
	}
}

//头部左侧菜单效果
function silderbar(obj, box) {
	navOpen(obj, box);
	$(obj).hover(barfn1, barfn2);
	var fn1time, fn2time, ietest = false

	function barfn1(i) {
		var This = i ? $(obj).eq($(this).index()) : this;
		var px1, px2;
		if ($(box).eq($(this).index()).css("display") != "none") {
			clearTimeout(fn2time);
			px1 = 47, px2 = 47, ietest = true;

		} else {
			px1 = 39, px2 = 47;
		}
		fn1time = setTimeout(function() {
			$(box).eq($(This).index()).show().stop()
				.animate({
					opacity: 0.96,
					filter: "alpha(opacity=96)",
					left: "180px"
				}, 200);
			$(obj).removeClass("nav-selected nav-hover");
			$(This).addClass("nav-selected nav-hover");
			IE($(This), px1, px2, ietest);
		}, 5)
	}

	function barfn2(i) {
		var This = i ? $(obj).eq($(this).index()) : this;
		fn2time = setTimeout(function() {
			$(This).removeClass("nav-hover");
			$(box).eq($(This).index()).stop()
				.animate({
					opacity: 0.5,
					filter: "alpha(opacity=50)",
					left: "170px"
				}, 0, function() {
					$(this).hide();
				});
			IE($(This), 47, 39);
		}, 5)
	}
	$(box).hover(function() {
		clearTimeout(fn2time)
	}, barfn2)

	function IE(t, px1, px2, ietest) {
		if (myBrowser(1)) {
			t.find("i").css("width", px1).stop().animate({
				width: px2
			}, 100);
		}
		iFie({
			ie78: function() {
				px1 == 39 || ietest ? t.find("span").addClass("ie") : t.find("span").removeClass("ie")
			}
		})
	}
}

function navOpen(obj, box) {
	var opentime1, opentime2;
	if ($(".navMain").attr("stop") == "true") {
		$(".navMain .open-m").hover(function() {
			openfn1(obj)
		}, function() {
			openfn2(obj)
		});
		$(box).hover(function() {
			openfn1(obj)
		}, function() {
			openfn2(obj)
		});
	}

	function openfn1(obj) {
		$(obj).parent().show().stop().animate({
			height: 480
		}, 150);
		$(".navMain .open-menu-btn span").removeClass().addClass("up");
	}

	function openfn2(obj) {
		$(obj).parent().stop().animate({
			height: 0
		}, 150, function() {
			$(this).hide();
			$(".navMain .open-menu-btn span").removeClass().addClass("down");
		});
	}
}
