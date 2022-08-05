(function () {
    var popIE = function () {
        if (window.innerWidth >= 680) {
            function IETester(userAgent) {
                var UA = userAgent || navigator.userAgent;
                if (/msie/i.test(UA)) {
                    return UA.match(/msie (\d+\.\d+)/i)[1];
                } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
                    return UA.match(/rv:(\d+\.\d+)/)[1];
                }
                return false;
            }
            if (IETester() == 9.0 || IETester() == 8.0 || IETester() == 7.0 || IETester() == 6.0 || IETester() == 5.0) {
                var hintIE = '<div class="popIE"><div class="popIE-contain"><div class="popIE-hint"><div class="popIE-close"></div><div class="popIE-hint">鎮ㄧ殑ie鐗堟湰杩囦綆锛屽皢鍙兘褰卞搷姝ｅ父娴忚缃戦〉锛�</div><div class="popIE-link"><span>瑙ｅ喅鏂规锛�</span><a href="https://www.microsoft.com/zh-cn/edge" target="_blank">鍗囩骇娴忚鍣�</a><a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">璋锋瓕娴忚鍣�</a><a href="https://browser.360.cn/ee/" target="_blank">360娴忚鍣�</a><a href="https://www.firefox.com.cn/" target="_blank">鐏嫄娴忚鍣�</a></div></div></div>';
                $("body").prepend(hintIE);
                $(".popIE").show();
                $(".popIE-close").click(function () {
                    $(".popIE").hide();
                });
            }
            IETester('Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko');
        }
    }

    var equipmentFn = function () {
        if (window.innerWidth >= 1000) {
            $("body").addClass("PC");
        } else {
            $("body").removeClass("PC");
        }
        if (window.innerWidth < 1000 && window.innerWidth >= 640) {
            $("body").addClass("PAD");
        } else {
            $("body").removeClass("PAD");
        }
        if (window.innerWidth < 640) {
            $("body").addClass("MB");
        } else {
            $("body").removeClass("MB");
        }
    }

    var mbPenetrate = function (el) {
        var elNum = document.getElementsByClassName(el).length;
        if (window.innerWidth >= 1000 || elNum == 0) {
            return false;
        }
        for (var i = 0; i < elNum; i++) {
            var elScroll = document.getElementsByClassName(el)[i],
                targetY = null;
            elScroll.addEventListener("touchstart", function (e) {
                targetY = Math.floor(e.targetTouches[0].clientY)
            }, {
                passive: true
            });
            elScroll.addEventListener("touchmove", function (e) {
                var newTargetY = Math.floor(e.targetTouches[0].clientY),
                    scrollTop = elScroll.scrollTop,
                    realHeight = elScroll.scrollHeight,
                    viewHeight = elScroll.clientHeight;
                if (scrollTop <= 0 && newTargetY - targetY > 0 && e.cancelable) {
                    e.preventDefault();
                } else if (scrollTop >= realHeight - viewHeight && newTargetY - targetY < 0 && e.cancelable) {
                    e.preventDefault();
                }
            }, {
                passive: true
            });
        }
    }

    var banDrag = function () {
        $("body").find("img,a").attr("ondragstart", "return false");
    }

    var navbarFn = function () {
        $('.Header-navclick').click(function () {
            if (window.innerWidth >= 1000) {
                $("body").addClass("bodyMenu");
                $(".Header-website-shade").addClass("active");
                $(".Header-website").addClass("active");
            } else {
                if ($(".Header-search-click").length > 0) {
                    $(".Header-search-click").removeClass("active");
                    $(".Header-search-item").removeClass("active");
                    $("body").removeClass("bodySearch");
                }
                if ($('.Header-navbar').is(':hidden')) {
                    $(this).addClass('active');
                    $('.Header-navbar').fadeIn(360).addClass("active");
                    $("body,html").css({
                        "overflow": "hidden"
                    });
                } else {
                    $(this).removeClass('active');
                    $('.Header-navbar').fadeOut(300).removeClass("active");
                    $("body,html").css({
                        "overflow": ""
                    });
                }
            }
        });
        if (window.innerWidth < 1000) {
            $(".Header-website-click").click(function () {
                $(".Header-website-shade").addClass("active");
                $(".Header-website").addClass("active");
            })
        }
        $(".Header-website-close, .Header-website-shade").click(function () {
            $(".Header-website-shade").removeClass("active");
            $(".Header-website").removeClass("active");
            $("body").removeClass("bodyMenu");
        });
    }

    var headerLi = function () {
        if (window.innerWidth >= 1000) {
            return false;
        }
        var liTime = 0.12;
        $(".Header-navbar ul li").each(function () {
            $(this).css('transition-delay', liTime + 's');
            liTime += 0.12;
        });
    }

    var searchFn = function () {
        $(".Header-search-click").click(function () {
            if (window.innerWidth < 1000 && $(".Header-navclick").length > 0) {
                $('.Header-navclick').removeClass('active');
                $('.Header-navbar').hide().removeClass("active");
                $("body,html").css({
                    "overflow": ""
                });
            }
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
                $(".Header-search-item").addClass("active");
                $("body").addClass("bodySearch");
            } else {
                $(this).removeClass("active");
                $(".Header-search-item").removeClass("active");
                $("body").removeClass("bodySearch");
            }
        });
    }

    var headerDrop = function () {
        if (window.innerWidth >= 1000) {
            $(".Header-navbar li").hover(function () {
                $(this).find(".Header-drop").stop().slideDown(360);
            }, function () {
                $(this).find(".Header-drop").stop().slideUp(300);
            });
            $(".Header-case-li-more .items").hover(function () {
                $(this).find(".arrow").addClass("active");
                $(this).find(".drop").stop().slideDown(360);
            }, function () {
                $(this).find(".arrow").removeClass("active");
                $(this).find(".drop").stop().slideUp(300);
            });
            $(".Header-case-menu .link").mouseenter(function () {
                $(".Header-case-menu .link").removeClass("active");
                $(".Header-case-items").removeClass("active");
                $(this).addClass("active");
                $(".Header-case-items").eq($(this).index()).addClass("active");
            });
        } else {
            $(".Header-case-menu .link").click(function (e) {
                $(".Header-case-menu .link").removeClass("active");
                $(".Header-case-items").removeClass("active");
                $(this).addClass("active");
                $(".Header-case-items").eq($(this).index()).addClass("active");
                return false;
            });
            $(".Header-case-li-more .items .arrow").click(function () {
                if ($(this).next(".drop").is(":hidden")) {
                    $(".Header-case-li-more .items .arrow").removeClass("active");
                    $(".Header-case-li-more .items .drop").slideUp(300);
                    $(this).addClass("active");
                    $(this).next(".drop").slideDown(360);
                } else {
                    $(this).removeClass("active");
                    $(this).next(".drop").slideUp(300);
                }
            });
        }

    }

    var headerDropMb = function () {
        $(".Header-arrow").click(function () {
            if ($(this).next(".Header-drop").is(':hidden')) {
                $(".Header-arrow").removeClass('active');
                $(".Header-drop").slideUp(300);
                $(this).addClass('active');
                $(this).next(".Header-drop").slideDown(360);
            } else {
                $(this).removeClass('active');
                $(this).next(".Header-drop").slideUp(300);
            }
        });
    }

    var langFn = function () {
        if (window.innerWidth >= 1000) {
            $(".Header-lang").hover(function () {
                $(this).addClass("active");
            }, function () {
                $(this).removeClass("active");
            });
        } else {
            $(".Header-lang").click(function (e) {
                if ($(".Header-navclick").length > 0) {
                    $('.Header-navclick').removeClass('active');
                    $('.Header-navbar').hide().removeClass("active");
                    $("body,html").css({
                        "overflow": ""
                    });
                }
                if ($(".Header-search-click").length > 0) {
                    $(".Header-search-click").removeClass("active");
                    $(".Header-search-item").removeClass("active");
                    $("body").removeClass("onSearch");
                }
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active");
                    $(".Header-lang-more").show();
                } else {
                    $(this).removeClass("active");
                    $(".Header-lang-more").hide();
                }
                e.stopPropagation();
            });
            $(window).click(function () {
                $(".Header-lang-more").hide();
                $(".Header-lang").removeClass("active");
            });
        }
    }

    var footerDropMb = function () {
        if (window.innerWidth >= 1000) {
            return false;
        }
        $(".Footer-menu").click(function () {
            if ($(this).next(".Footer-drop").is(':hidden')) {
                $(".Footer-menu").removeClass('active');
                $(".Footer-drop").slideUp(300);
                $(this).addClass('active');
                $(this).next(".Footer-drop").slideDown(360);
            } else {
                $(this).removeClass('active');
                $(this).next(".Footer-drop").slideUp(300);
            }
        });
    }

    var sonMenu = function (f, s) {
        if ($(s).length <= 0 || window.innerWidth >= 680) {
            return false;
        }
        var menuWidth = 0;
        var menuMargin = parseInt($(s).find("a").css('marginLeft'));
        $(s).find("a").each(function () {
            menuWidth += $(this)[0].getBoundingClientRect().width + menuMargin * 2;
        });
        $(s).width(menuWidth);
        var ontrueLeft;
        if ($(s).find("a").hasClass("active")) {
            ontrueLeft = $(s).find("a.active").offset().left - menuMargin
        } else {
            ontrueLeft = 0
        }
        setTimeout(function () {
            $(f).animate({
                'scrollLeft': menuWidth - $(window).width()
            }, 800).after().animate({
                'scrollLeft': ontrueLeft
            }, 800)
        }, 800);
    }

    var backTop = function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 200) {
                $('.backTop').fadeIn(300);
            } else {
                $('.backTop').fadeOut(200);
            }
        });
        var isClick = true;
        $(".backTop").click(function () {
            if (isClick && $(window).scrollTop() > 0) {
                isClick = false;
                $("html,body").animate({
                    scrollTop: "0px"
                }, 800);
            }
            setTimeout(function () {
                isClick = true;
            }, 800);
        });
    }

    var HeaderFn = function () {
        if (window.innerWidth >= 1000 && !$("body").hasClass("noLucency")) {
            if ($(window).scrollTop() >= 70) {
                $("body").addClass("bodyScroll");
            } else {
                $("body").removeClass("bodyScroll");
            };
            $(".Header-wrapper").mouseenter(function () {
                $("body").addClass("bodyMouse");
            });
            $(".Header-wrapper").mouseleave(function () {
                $("body").removeClass("bodyMouse");
            });
        } else {
            $("body").removeClass("bodyScroll");
            $("body").removeClass("bodyMouse");
        }
    }

    // 鎵ц鍑芥暟 ******************************************************************************************************************************
    $(function () {
        popIE(); // 鍒ゆ柇IE鐗堟湰鎻愮ず
        equipmentFn(); // body-class璁惧淇℃伅
        mbPenetrate("navbarScroll"); //绉诲姩绔姝㈢┛閫� 浼犲叆class
        headerLi(); //绉诲姩绔鑸嚭鍦哄姩鐢�
        banDrag(); //绂佹鍥剧墖銆乤鏍囩鎷栧姩
        navbarFn(); //绉诲姩绔眽鍫￠敭
        searchFn(); //鎼滅储
        headerDrop(); //瀵艰埅涓嬫媺
        headerDropMb(); //绉诲姩绔�-瀵艰埅涓嬫媺
        footerDropMb(); //绉诲姩绔�-搴曢儴瀵艰埅涓嬫媺
        langFn(); //璇█
        backTop(); //缃《
        HeaderFn(); //瀵艰埅鍙樿壊
        // sonMenu(".sonBar-menu",".sonBar-menu-scroll"); //绉诲姩绔�-鍐呴〉鑿滃崟("瀹氫箟overflow-x: auto鐨勭埗鍏冪礌","璁剧疆瀹藉害鐨勫瓙鍏冪礌")
    });

    // 鍏ㄥ眬鍑芥暟 ******************************************************************************************************************************
    // 鏁板瓧鍓嶉潰琛�0锛屼娇鐢� $.prefixInteger(num,length)
    jQuery.prefixInteger = function (num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }

    // 绐楀彛浜嬩欢 ******************************************************************************************************************************
    $(window).resize(function () {
        equipmentFn(); // body-class璁惧淇℃伅
        HeaderFn(); //瀵艰埅鍙樿壊
    });

    // 婊氬姩浜嬩欢 ******************************************************************************************************************************
    $(window).scroll(function () {
        HeaderFn(); //瀵艰埅鍙樿壊
    });
}());



//图片入帘式进场效果放大

$(function () {
    // banner
    var bannerOne = false;
    $(".banner .swiper-slide").eq(0).addClass('oneSlide');
    var bannerSwiper = new Swiper(".banner .swiper-container", {
        // autoplay:{delay: 5000,disableOnInteraction: false},
        speed: 1000,
        watchSlidesProgress: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        simulateTouch: false,
        pagination: {
            el: '.banner-page',
            clickable: true,
            renderBullet: function (index, className) {
                return '<p class="' + className + '"><span></span><i></i></p>';
            }
        },
        on: {
            // init: function(swiper){
            //     setTimeout(function(){
            //         bannerFn($('.banner .swiper-slide.one'))
            //     },100)
            // },
            slideChangeTransitionStart: function () {
                if (this.realIndex >= 1) {
                    this.slides.removeClass("oneSlide");
                } else {
                    preloader.init()
                }
            },
            slideChangeTransitionEnd: function () {
                // this.autoplay.start();
                var _this = $('.banner .swiper-slide').eq(this.activeIndex);
                // if(!bannerOne){bannerOne = true;}else{bannerFn(_this)}
            }
        }
    });
    // function bannerFn(_this){
    //     if(_this.hasClass('one') && window.innerWidth >= 1100) {
    //          bannerSwiper.autoplay.stop();
    //          setTimeout(function(){bannerSwiper.autoplay.start();},8000)
    //     }
    // }
    $(".banner-play").click(function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            bannerSwiper.autoplay.stop();
        } else {
            $(this).removeClass("active");
            bannerSwiper.autoplay.start();
        }
    });
    // 方案
    var runStop1 = 0,
        runStop2 = 0;
    var runSpaceTop = $(".indmh").offset().top + $(".Header-wrapper").height();
    //.indmh——容器 .Header-wrapper——导航栏
    //$(".indmh").offset().top容器顶部上边框相对于文档顶端的偏移量
    //$(".Header-wrapper").height()头部导航的高度
    //runSpaceTop
    runFn();

    function runFn() {
        //当屏幕宽度尺寸大于1100px时才执行
        if (window.innerWidth > 1100) {
            var runEndTop = $(window).scrollTop();//滚动条距离顶部的高度
            var runEndText = runEndTop - runSpaceTop;//通过runEndText来判断此时容器是否在可被看到的范围内
            var runEndTop = runEndTop - runSpaceTop - 400;//通过这个来判断图片是否要进行放大
            if (runEndText >= 0) { //如果runEndText的值大于0，说明此时容器正在能被看到的范围内
                if (runEndText > 200) {//当容器能被看到后，让文字隐藏
                    $(".indmh-text").addClass("active")
                } else {
                    $(".indmh-text").removeClass("active")
                }
            } else {
                $(".indmh-text").removeClass("active")//容器不在可被查看的范围内时，文字隐藏
            }
            if (runEndTop >= 0) {//大于0说明此时容器不仅被看到了，而且文字也被隐藏了，滚轮大致滚过了两次，应该轮到图片放大了
                // 放大
                var runScale = 1 + runEndTop * 0.004;//滚轮
                if (runScale < 2.4) {
                    $(".indmh-logo").css("transform", "scale(" + runScale + ")");
                    runStop1 = runEndTop//赋值给Sotp,用来控制透明
                } else {
                    $(".indmh-logo").css("transform", "scale(" + 2.4 + ")")//图片最大放大到2.4倍
                }
                // 透明
                var runOpacity = 1 - (runEndTop - runStop1) * 0.002;//图片透明值赋值
                if (runScale >= 2.4) {
                    if (runOpacity >= 0) {//相当于runEndTop-runStop1的值大于500，runStop1的值是记录图片放大到2.4前的最后一次runEndTop的值，相当于鼠标滚动次数在3次以内
                        $(".indmh-logo").css("opacity", runOpacity);
                        runStop2 = runEndTop
                    } else {//相当于runEndTop-runStop1的值小于500，说明滚轮滚的次数到了，图片应该变为透明，相当于鼠标滚动次数大于了3次
                        $(".indmh-logo").css("opacity", 0)
                    }
                } else {
                    $(".indmh-logo").css("opacity", 1);
                }
                // 加黑
                var runShade = (runEndTop - runStop2) * 0.002;
                if (runOpacity <= 0) {
                    if (runShade <= 1) {
                        $(".indmh-shade").css("opacity", runShade)
                    } else {
                        $(".indmh-shade").css("opacity", 1)
                    }
                } else {
                    $(".indmh-shade").css("opacity", 0)
                }
                // 文字
                if (runOpacity <= 0) {
                    if (runShade > 1) {
                        $(".indmh-content").addClass("active")
                    } else {
                        $(".indmh-content").removeClass("active")
                    }
                } else {
                    $(".indmh-content").removeClass("active")
                }

            } else {
                $(".indmh-logo").css("transform", "scale(1)");
                $(".indmh-logo").css("opacity", 1)
            }
        }
    }
    $(window).scroll(function () {
        runFn();
    });
    // 数字滚动
    $('.indTimer').each(function () {
        $(this).attr({
            'data-speed': '3000',
            'data-to': $(this).text()
        });
    });
    // 新闻
    var indxwSwiper = new Swiper('.indxw-loop .swiper-container', {
        // autoplay:{delay:3600,disableOnInteraction: false},
        loop: true,
        speed: 1000,
        spaceBetween: 14,
        pagination: {
            el: '.indxw-loop .swiper-pagination',
            clickable: true
        },
    });
});
$(".indfa .indTitle").addClass("wow fadeInUp").attr("data-wow-delay", '0.4s');
$(".indfa-main").addClass("wow fadeInLeft").attr("data-wow-delay", '0.4s');
$(".indfa-top").addClass("wow fadeInUp").attr("data-wow-delay", '0.4s');
$(".indfa-bottom .indfa-link").each(function (n) {
    $(this).addClass("wow fadeInUp").attr("data-wow-delay", 0.3 * (n + 1) + 's');
});
$(".indjs .indTitle").addClass("wow fadeInUp").attr("data-wow-delay", '0.4s');
$(".indjs-list li").each(function (n) {
    $(this).addClass("wow fadeInUp").attr("data-wow-delay", 0.3 * (n + 1) + 's');
});
$(".indxw .indTitle").addClass("wow fadeInUp").attr("data-wow-delay", '0.4s');
$(".indxw-left").addClass("wow fadeInLeft").attr("data-wow-delay", '0.4s');
$(".indxw-items:nth-of-type(1)").addClass("wow fadeInRight").attr("data-wow-delay", '0.4s');
$(".indxw-items:nth-of-type(2)").addClass("wow fadeInRight").attr("data-wow-delay", '0.5s');
$(".indxw-small").addClass("wow fadeInRight").attr("data-wow-delay", '0.4s');
$(".indxw-main").addClass("wow fadeInUp").attr("data-wow-delay", '0.6s');
wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: false,
    live: true
});
wow.init();