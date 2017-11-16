function Trans(container) {
    var self = this;
    var initlized = false;
    var num, container, selecter, height, width;
    var map_dire = ["star_left"];
    var map_size = ["star_1", "star_2", "star_3"];
    var map_speed = [1500, 3500, 7500];
    var map_time_delta = [1, -1];
    var timer;
    var setWindow = function() {
        height = $(window).height() * 1.6;
        width = $(window).width()
    };
    var getRandom = function(arr) {
        var len = arr.length;
        return arr[parseInt(len * Math.random(), 10) % len]
    };
    var draw = function() {
        var stars = container.find(".star[data-status=free]");
        if (!stars.size()) {
            return
        }
        var star = stars.eq(0);
        var classNameArr = [];
        var speed = getRandom(map_speed),
        pos_left = parseInt(1.5 * width * Math.random(), 10) - .5 * width;
        classNameArr.push(getRandom(map_dire));
        classNameArr.push(getRandom(map_size));
        classNameArr.push("star");
        star.attr("class", classNameArr.join(" "));
        star.attr("data-status", "busy");
        star.css({
            left: pos_left,
            height: height
        });
        star.find(".star_ani").css({
            webkitAnimationDuration: speed + "ms"
        });
        setTimeout(function() {
            star.attr("data-status", "free")
        },
        speed)
    };
    var go = function() {
        var time_delta_1 = getRandom(map_time_delta),
        time_delta_2 = parseInt(10 * Math.random(), 10) % num,
        time_delta = 1e3 / num + time_delta_1 * 1e3 / time_delta_2;
        draw();
        timer = setTimeout(go, time_delta)
    };
    self.init = function(_selecter, _num) {
        var container_tmp = $(_selecter);
        num = parseInt(_num, 10);
        container = $(_selecter + " .frame_star");
        selecter = _selecter;
        if (container_tmp.size() && num) {
            initlized = true;
            setWindow();
            container = $('<div class="frame_star u_camera u_p3d"></div>');
            $(window).resize(setWindow);
            for (var i = 0; i < num; i++) {
                $(['<div class="star" data-status="free">', '<div class="star_ani"></div>', "</div>"].join("")).appendTo(container)
            }
            container_tmp.prepend(container)
        }
        return self
    };
    self.start = function() {
        if (!initlized) {
            return self
        }
        if (timer) {
            return self
        }
        go();
        return self
    };
    self.stop = function() {
        if (!initlized) {
            return self
        }
        var ret = window.clearInterval(timer);
        timer = null;
        return self
    };
    return self
}