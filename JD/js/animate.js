$(function () {
    var count = 0;
    var $oli = $(".clo2_hd>ol>li");
    var $uli = $(".clo2_hd>ul>li");
    var flag = true;
    $(".arrow_r").click(function () {
        if (flag) {
            flag = false;
            count++;
            count = count >= $uli.length ? 0 : count;
            $oli.eq(count).addClass("current").siblings().removeClass("current");
            $uli.eq(count).stop().fadeIn(600, function () {
                flag = true;
            }).siblings().stop().fadeOut(600);
        }
    });
    $(".arrow_l").on("click", function () {
        if (flag) {
            flag = false;
            count--;
            count = count < 0 ? $uli.length - 1 : count;
            $oli.eq(count).addClass("current").siblings().removeClass("current");
            $uli.eq(count).stop().fadeIn(600, function () {
                flag = true;
            }).siblings().stop().fadeOut(600);
        }
    });
    $oli.mouseenter(function () {
        count = $(this).index();
        $oli.eq(count).addClass("current").siblings().removeClass("current");
        $uli.eq(count).stop().fadeIn(150).siblings().stop().fadeOut(150);
        flag=true;
    });
    setInterval(function () {
        $(".arrow_r").click();
    }, 6000);
});

$(function () {
    $(".J_event").on("click", "i", function () {
        $(".J_event").hide();
        return false;
    });
    $(".jd_clo1>ul>li").mouseenter(function () {
        $(".list").show();
        $(".list").mouseenter(function () {
            $(".list").show();
        });
        $(".list").mouseleave(function () {
            $(".list").hide();
        });
    });
    $(".jd_clo1>ul>li").mouseleave(function () {
        $(".list").hide();
    });
});

$(function () {
    var liObj=$(".clo3_service>ul>li");
    for (var i=0;i<liObj.length;i++){
        var y=-Math.floor(i/4)*44;
        var x=-(i%4)*44;
        var a=x+"px";
        var b=y+"px";
        liObj.eq(i).children("a").children("i").css("backgroundPosition",a+" "+b);
    }
});

$(function () {
    $(".item1").mouseenter(function () {
        $(".tab_line").animate({left:0},200);
        $(".tab_bd>ul:eq(0)").addClass("tab_show").siblings().removeClass("tab_show");
    });
    $(".item2").mouseenter(function () {
        $(".tab_line").animate({left:55},200);
        $(".tab_bd>ul:eq(1)").addClass("tab_show").siblings().removeClass("tab_show");
    });
});

$(function () {
    $(".clo3_service>ul>li").mouseenter(function () {
        $(this).children("a").children("p").css("color","red");
        $(this).css("boxShadow","0 0 5px #bfc3cc");
    });
    $(".clo3_service>ul>li").mouseleave(function () {
        $(this).children("a").children("p").css("color","");
        $(this).css("boxShadow","");
    });
});
