! function () {
    "use strict";
    var t = function (e, a) {
        function o(t, e, a, o) {
            return Math.sqrt((a - t) * (a - t) + (o - e) * (o - e))
        }
        if (!(this instanceof t)) return new t(e);
        var i = this,
            s = {
                img_id: "cartoonDot-img",
                text_id: !1,
                with_box: !0,
                background_color: !1,
                dot_color: !1,
                mouse_hover: !1,
                lighter: !0
            };
        i.options = a || s;
        var n = function (t, e, a, o) {
            this.x = t, this.y = e, this.r = a, this.s = o, this.a = Math.random() * Math.PI * 2, this.hue = 360 * Math.random()
        };
        n.prototype = {
            constructor: n,
            update: function () {
                this.a += .5 * Math.random() - .25, this.x += Math.cos(this.a) * this.s, this.y += Math.sin(this.a) * this.s, this.hue += this.s, this.x > i.WIDTH ? this.x = 0 : this.x < 0 && (this.x = i.WIDTH), this.y > i.HEIGHT ? this.y = 0 : this.y < 0 && (this.y = i.HEIGHT)
            },
            // 澶栧洿鏁ｇ偣棰滆壊
            render: function (t) { // 褰╄壊
                t.save(),
                    t.fillStyle = "hsla(" + this.hue + ", 100%, 50%, 1)",
                    t.translate(this.x, this.y), t.rotate(this.a), t.beginPath(), t.arc(0, 0, this.r, 0, 2 * Math.PI), t.fill(), t.restore()
            },
            // render: function(t) { // 鐧借壊
            //     t.save(),
            //     t.fillStyle = "hsla(120, 50%, 100%, 1)",
            //     t.translate(this.x, this.y),t.rotate(this.a),t.beginPath(),t.arc(0, 0, this.r, 0, 2 * Math.PI),t.fill(),t.restore()
            // }
        };
        var r = function (t, e, a, o, s) {
            this.x = t, this.y = e, this.ox = t, this.oy = e, this.tx = a, this.ty = o, this.lx = t, this.ly = e, this.r = s, this.br = s, this.a = Math.random() * Math.PI * 2, this.sx = .5 * Math.random(), this.sy = .5 * Math.random(), this.o = 1 * Math.random(), this.delay = 80 * Math.random(), this.delayCtr = 0, this.hue = i.hue(), i.options.dot_color && (this.color = i.options.dot_color), this.mr = 10 * Math.random()
        };
        return r.prototype = {
                constructor: r,
                update: function () {
                    if (this.delayCtr < this.delay) return void this.delayCtr++;
                    var t, e;
                    this.color || (this.hue += 1), this.a += .1, this.lx = this.x, this.ly = this.y, i.flyAway ? (t = this.ox, e = this.oy) : (t = this.tx, e = this.ty), this.x += (t - this.x) * this.sx, this.y += (e - this.y) * this.sy, this.r = this.br + Math.cos(this.a) * (.5 * this.br);
                    var a = o(this.x, this.y, i.mouse.x, i.mouse.y);
                    if (i.options.mouse_hover) {
                        var s = 2,
                            n = Math.atan2(this.y - i.mouse.y, this.x - i.mouse.x),
                            r = 200 / a;
                        this.x += Math.cos(n) * r + .05 * (t - this.x), this.y += Math.sin(n) * r + .05 * (e - this.y)
                    } else {
                        var l = .04 * i.WIDTH;
                        if (l < 30 && (l = 30), o(this.tx, this.ty, i.mouse.x, i.mouse.y) < l) {
                            var d = this.tx > i.img_center_x ? this.mr : -this.mr,
                                c = this.ty > i.img_center_y ? this.mr : -this.mr;
                            this.x += (this.tx - i.mouse.x) / 10 + d, this.y += (this.ty - i.mouse.y) / 10 + c
                        }
                    }
                },
                // 鍐呭洿鐐归鑹�
                render: function (t) { // 褰╄壊
                    i.flyAway ? (t.save(),
                        t.fillStyle = "hsla(" + this.hue + ", 100%, 50%, 0)",
                        t.strokeStyle = "hsla(" + this.hue + ", 100%, 50%, 1)",
                        t.beginPath(), t.moveTo(this.lx, this.ly), t.lineTo(this.x, this.y), t.fill(), t.stroke(), t.restore()) : (t.save(), t.globalAlpha = this.o,
                        t.fillStyle = this.color ? this.color : "hsla(" + this.hue + ", 100%, 50%, 1)",
                        t.translate(this.x, this.y), t.beginPath(), t.arc(0, 0, this.r, 0, 2 * Math.PI), t.fill(), t.restore())
                },
                // render: function(t) { // 鐧借壊
                //     i.flyAway ? (t.save(),
                //     t.fillStyle = "hsla(120, 50%, 100%, 1)",
                //     t.strokeStyle = "hsla(" + this.hue + ", 100%, 50%, 1)",
                //     t.beginPath(), t.moveTo(this.lx, this.ly), t.lineTo(this.x, this.y), t.fill(), t.stroke(), t.restore()) : (t.save(), t.globalAlpha = this.o,
                //     t.fillStyle = this.color ? this.color : "hsla(120, 50%, 100%, 1)",
                //     t.translate(this.x, this.y), t.beginPath(), t.arc(0, 0, this.r, 0, 2 * Math.PI), t.fill(), t.restore())
                // }
            }, i.txtCanvas = document.createElement("canvas"), i.txtCtx = i.txtCanvas.getContext("2d"), i.c = document.getElementById(e), i.ctx = i.c.getContext("2d"), i.WIDTH = i.c.width = window.innerWidth, i.HEIGHT = i.c.height = window.innerHeight, i.img = !!i.options.img_id && document.getElementById(i.options.img_id), i.text = !(i.options.img_id || !i.options.text_id) && $(i.options.text_id), i.img_center_x = 0, i.img_center_y = 0, i.imgData = null, i.skip = 8, i.dots = [], i.dot = null, i.flyAway = !1, i.boxList = [], i.box = null, i.anim_frame = void 0, i.anim_timer = void 0, i.hue = function () {
                return 30 * Math.random()
            }, i.mouse = {
                x: -1e3,
                y: -1e3
            }, i.mousemove = function (t) {
                i.mouse.x = t.clientX, i.mouse.y = t.clientY
            }, i.touchmove = function (t) {
                i.mouse.x = t.touches[0].clientX, i.mouse.y = t.touches[0].clientY
            },
            i.drawText = function () {
                var t = i.WIDTH,
                    e = i.HEIGHT,
                    a = i.txtCanvas,
                    o = i.txtCtx,
                    s = i.img,
                    n = i.text,
                    l = i.dots,
                    d = t >= 768 ? 4 : 2,
                    c = t >= 768 ? i.skip : 5,
                    h, m, p, u;
                if (t >= 1600 && (c = 12), s) h = s.width, m = s.height, p = s.getBoundingClientRect().left - i.c.getBoundingClientRect().left, u = s.getBoundingClientRect().top - i.c.getBoundingClientRect().top, i.img_center_x = p + h / 2, i.img_center_y = u + m / 2, a.width = t, a.height = e, o.globalCompositeOperation = "copy", o.drawImage(i.img, p, u, h, m);
                else {
                    h = n.width(), m = n.height(), p = n[0].getBoundingClientRect().left - i.c.getBoundingClientRect().left, u = n[0].getBoundingClientRect().top - i.c.getBoundingClientRect().top, i.img_center_x = p + h / 2, i.img_center_y = u + m / 2;
                    var f = n.text();
                    a.width = t, a.height = e, o.font = "bold " + v + " " + g, o.textAlign = "left", o.fillText(f, p, u + m - m / 12)
                }
                i.imgData = o.getImageData(0, 0, t, e).data, l.splice(0, l.length);
                for (var b = 0; b < e; b += c)
                    for (var w = 0; w < t; w += c) {
                        var _ = 4 * (w + b * t) - 1;
                        if (i.imgData[_] > 0) {
                            var y = 2 * Math.PI * Math.random(),
                                k = new r(t / 2 + Math.cos(y) * t, e / 2 + Math.sin(y) * t, w, b, Math.random() * d);
                            l.push(k)
                        }
                    }
            }, i.loop = function () {
                var t = i.dots,
                    a = i.ctx,
                    o = i.boxList,
                    s = i.WIDTH,
                    n = i.HEIGHT,
                    r = i.options.background_color;
                if (void 0 == document.getElementById(e)) return i.kill(), !1;
                if (a.globalCompositeOperation = "source-over", r) a.fillStyle = r.colorRgb(".5"), a.fillRect(0, 0, s, n);
                else {
                    // 娓愬彉
                    // var grad=a.createLinearGradient(0,0,n,0);
                    // grad.addColorStop(0,"#3b1d4e");
                    // grad.addColorStop(1,"#1a2176");
                    // a.fillStyle=grad;
                    // 鍒濆
                    a.fillStyle = "rgba(1, 1, 2, 1)", //鑳屾櫙棰滆壊
                        a.fillRect(0, 0, s, n);
                    // var l = a.createRadialGradient(s / 2, n / 10, 50, s / 2, n, n);
                    // l.addColorStop(0, "rgba(50, 50, 58, .5)"),//鍦堝湀閲岄潰
                    // l.addColorStop(1, "rgba(20, 20, 30, .5)"),//鍦堝湀澶栧洿
                    // a.fillStyle = l, a.fillRect(0, 0, s, n)
                }
                if (i.options.lighter && (a.globalCompositeOperation = "lighter"), i.img || i.text)
                    for (var d = 0, c = t.length; d < c; d++) {
                        var h = t[d];
                        h.update(), h.render(a)
                    }
                if (i.options.with_box)
                    for (var m = 0; m < o.length; m++) {
                        var p = o[m];
                        p.update(), p.render(a)
                    }
                i.requestFrame(i.loop)
            }, i.init = function () {
                var t = i.WIDTH,
                    e = i.HEIGHT,
                    a = t >= 768 ? 12 : 8,
                    o = t >= 768 ? 8 : 4,
                    s = i.boxList,
                    r = 2;
                if ((i.img || i.text) && i.drawText(), i.options.with_box)
                    for (var l = 0; l < a; l++) {
                        var d = new n(t * Math.random(), e * Math.random(), Math.random() * o, 2 * Math.random());
                        s.push(d)
                    }
                i.c.addEventListener("mousemove", i.mousemove), i.c.addEventListener("touchstart", i.touchmove), i.loop(), $(window).off("resize.dottext").on("resize.dottext", i.resize), $("html").is(".pagevisibility") && document.addEventListener("visibilitychange", i.visibility_change)
            }, i.requestFrame = function (t) {
                var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
                e ? i.anim_frame = e(t) : i.anim_timer = window.setTimeout(t, 50)
            }, i.cancelRequestFrame = function () {
                var t = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
                t ? t(i.anim_frame) : clearTimeout(i.anim_timer)
            }, i.resize = function () {
                i.WIDTH = i.c.width = window.innerWidth, i.HEIGHT = i.c.height = window.innerHeight, (i.img || i.text) && i.drawText()
            }, i.visibility_change = function () {
                document.hidden ? i.cancelRequestFrame() : i.loop()
            }, i.pause = function () {
                i.cancelRequestFrame(), i.c.removeEventListener("mousemove", i.mousemove), i.c.removeEventListener("touchstart", i.touchmove), document.removeEventListener("visibilitychange", i.visibility_change)
            }, i.replay = function () {
                i.c.addEventListener("mousemove", i.mousemove), i.c.addEventListener("touchstart", i.touchmove), i.loop(), $("html").is(".pagevisibility") && document.addEventListener("visibilitychange", i.visibility_change)
            }, i.kill = function () {
                i.cancelRequestFrame(), i.c.removeEventListener("mousemove", i.mousemove), i.c.removeEventListener("touchstart", i.touchmove), document.removeEventListener("visibilitychange", i.visibility_change), $(window).off("resize.dottext")
            }, i.init(), i
    };
    window.dotText = t
}();
var skrollrObj, tt_dot_text;
var pageHome = {
    save_index: !1,
    skr: !1,
    init: function () {
        var e = this,
            a = void 0;
        e.skr = skrollrObj, e.dot_pause = !1, tt_dot_text = new dotText("cartoonDot-text", {
            img_id: "cartoonDot-img",
            text_id: !1,
            with_box: !0,
            background_color: !1,
            dot_color: !1,
            mouse_hover: !1,
            lighter: !0
        });
    }
};
var preloader = {
    init_page_timer: void 0,
    init: function (t, e) {
        function a() {
            m.each(function () {
                var t = $(this),
                    e = t.is("img") ? t : t.children("img.hide");
                void 0 != e.data("src") && e.attr("src", e.data("src"));
                var a = e.attr("src"),
                    i = new Image;
                i.src = a, i.complete ? o() : i.onload = o
            })
        }

        function o() {
            u == p ? i() : u++
        }

        function i() {
            setTimeout(function () {
                void 0 != e ? e() : s.initPage()
            }, 200)
        }
        var s = this,
            n = t || $("body");
        var m = n.find("#cartoonDot-img"),
            p = m.length,
            u = 1;
        p > 0 ? a() : i()
    },
    initPage: function (t, e) {
        pageHome.init()
    }
};
$(function () {
    preloader.init()
})