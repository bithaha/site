(function(){var ua=navigator.userAgent.toLowerCase();var bIsIpad=ua.match(/ipad/i)=="ipad";var bIsIphoneOs=ua.match(/iphone os/i)=="iphone os";var bIsAndroid=ua.match(/android/i)=="android";var bIsWM=ua.match(/windows mobile/i)=="windows mobile";if(bIsIpad||bIsIphoneOs||bIsAndroid||bIsWM){}else{window.location.href="//www.zixinyun.com"}})();
(function(doc, win) {var docEl = doc.documentElement,resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', recalc = function() {var clientWidth = docEl.clientWidth;if (!clientWidth) return;docEl.style.fontSize = 20 * (document.body.clientWidth / 320) + 'px';};if (!doc.addEventListener) return; win.addEventListener(resizeEvt, recalc, false);doc.addEventListener('DOMContentLoaded', recalc, false);})(document, window);

var cur_section, trans_list;
var callbacks = {
    afterLoad: function(anchorLink, index) {
        activeAniSection(index);
        activeTranSection(index);
        setTimeout(function() {
            if (cur_section == index) {
                return
            }
            unactiveAniSection(cur_section)
        },
        1e3)
    },
    onLeave: function(index, nextIndex, direction) {
        cur_section = index;
        unactiveTranSection(index);
        changeContainer(nextIndex);
        changeGuide(nextIndex)
    }
};

function updateMenu(index) {
    $(".menu span").removeClass("selected").eq(index - 1).addClass("selected")
}

function activeAniSection(index) {
    $(".section" + index).addClass("active_ani");
    // if ("section" + index in trans_list) {
    //     trans_list["section" + index].start()
    // }
}

function activeTranSection(index) {
    $(".section" + index).addClass("active_tran")
}

function unactiveAniSection(index) {
    $(".section" + index).removeClass("active_ani");
    // if ("section" + index in trans_list) {
    //     trans_list["section" + index].stop()
    // }
}

function unactiveTranSection(index) {
    $(".section" + index).removeClass("active_tran")
}

function changeContainer(index) {
    $("body").attr("data-section_id", index)
}

function changeGuide(index) {
    if (index == 4) {
        $(".guide").attr("data-status", "end")
    } else {
        $(".guide").attr("data-status", "start")
    }
}

function init_frame() {
    $("#fullpage").fullpage({
        onLeave: callbacks.onLeave,
        afterLoad: callbacks.afterLoad,
        scrollingSpeed: 500
    })
}

function init_section() {
    activeAniSection(1);
    activeTranSection(1);
    $(".section").show()
}

function init_section1() {
    cur_section = 1;
    changeContainer(1);
    $(".section1 .container_video").css("z-index", "-1")
}

function init_img() {
    $("img").each(function() {
        var src = this.getAttribute("data-src");
        src && (this.src = src)
    });
}

function init_star() {
    trans_list = {
        section1: (new Trans).init(".section1", 20),
        section2: (new Trans).init(".section2", 20),
        section3: (new Trans).init(".section3", 20),
        section4: (new Trans).init(".section4", 20)
    }
}



function init_guide() {
    changeGuide(1);
    $(".guide_inner").bind("click",
    function() {
        var $obj = $(this).parent();
        if ($obj.attr("data-status") == "start") {
            $.fn.fullpage.moveSectionDown();
            return
        }
        if ($obj.attr("data-status") == "end") {
            $.fn.fullpage.moveTo(1);
            return
        }
    })
}
function init_banner(){
    $(".flexslider").flexslider({
        animation:"fade",
        slideshowSpeed:6e3,
        controlsContainer:$(".custom-controls-container"),
        customDirectionNav:$(".custom-navigation a")
    });
    $(".board_sliders").flexslider({
        animation:"fade",
        slideshowSpeed:6e3,
        controlsContainer: $('.board_controller'),
        customDirectionNav:$(".board_pages a")
    });

    if (navigator.userAgent.indexOf("MSIE") >= 0 && navigator.userAgent.indexOf("Opera") < 0) {
        $("#rotatingGlobe").hide(),
        $(".banner_img_planet").show();
        var userAgent = navigator.userAgent,
        rMsie = /(MSIE\s|trident.*rv:)([\w.]+)/,
        version, match = rMsie.exec(userAgent);
        match[2] < 9 && $(".slide-video video").hide()
    } else $(".banner_img_planet").hide(),
    $("#rotatingGlobe").css('margin-left',-$(window).width()/2+'px').show(),
    function() {
        function e(e) {
            e = e || {};
            var n = !1,
            i = null,
            t = function() {
                window.innerWidth + (e.extraWidth || 0),
                400 + (e.extraHeight || 0);
                i.canvas.width = $(window).width(),
                i.canvas.height = 360,
                i.projection.translate([i.canvas.width/2, 360])
            };
            return function(e) {
                i = e,
                e.onInit(function() {
                    n = !0,
                    d3.select(window).on("resize",
                    function() {
                        n = !0
                    })
                }),
                e.onDraw(function() {
                    n && (t(), n = !1)
                })
            }
        }
        function n(e) {
            return e = e || {},
            function(n) {
                n.onInit(function() {
                    window.innerWidth + (e.extraWidth || 0),
                    window.innerHeight + (e.extraHeight || 0);
                    n.projection.scale(250)
                })
            }
        }
        function i(e) {
            return function(n) {
                var i = null,
                t = !1;
                n.plugins.autorotate = {
                    pause: function() {
                        t = !0
                    },
                    resume: function() {
                        t = !1
                    }
                },
                n.onDraw(function() {
                    if (t || !i) i = new Date;
                    else {
                        var o = new Date,
                        a = o - i,
                        r = n.projection.rotate();
                        r[0] += e * a / 1e3,
                        r[0] >= 180 && (r[0] -= 360),
                        n.projection.rotate(r),
                        i = o
                    }
                })
            }
        }
        var t = document.getElementById("rotatingGlobe"),
        o = planetaryjs.planet();
        o.loadPlugin(e({
            extraHeight: -120
        })),
        o.loadPlugin(n({
            extraHeight: -120
        })),
        o.loadPlugin(planetaryjs.plugins.earth({
            topojson: {
                file: "./assets/js/world-110m.json"
            },
            oceans: {
                fill: "#0060bb"
            },
            land: {
                fill: "#7db4f4"
            },
            borders: {
                stroke: "#2577d4"
            }
        })),
        o.loadPlugin(planetaryjs.plugins.pings()),
        o.loadPlugin(planetaryjs.plugins.zoom({
            scaleExtent: [50, 5e3]
        })),
        o.loadPlugin(i(5)),
        o.projection.rotate([250, -10, 0]),
        o.draw(t);
        var a = ["white"];
        setInterval(function() {
            var e = 45 * Math.random() + 40,
            n = 360 * Math.random() - 180,
            i = a[Math.floor(Math.random() * a.length)];
            o.plugins.pings.add(n, e, {
                color: i,
                ttl: 2e3,
                angle: 10 * Math.random()
            })
        },
        100)
    } ();
}
function initIe7(){
     if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
    { 
        $(".section .container").each(function(){
            $(this).css({
                top:$(this).parent().height()/2 - $(this).height()/2 + 'px'
            })
        })
    } 
}

$(function() {
    init_img();
    //init_star();
    init_frame();
    init_section();
    init_section1();
    init_guide();
    init_banner();
    initIe7();
});
$(function(){
    $('.menu-btn').on('click',function(){
        if($('.header').hasClass('head-menu-show')){
            $('.header').removeClass("head-menu-show");
            $('.header-cover').remove();
        }else{
            $('.header').addClass("head-menu-show");
            $('body').append('<div class="header-cover"></div>');
            $('.header-cover').off('click').on('click',function(){
                $('.header').removeClass("head-menu-show");
                $('.header-cover').remove();
            })
        }
        
    });
    $('.section4 .item_link').click(function(){
        $(this).addClass('active');
    })
})