$(function () {
    var $banner=$(".sn_banner");
    var w=$banner.width();
    var $imgBox=$banner.find("ul:first");
    var $pointBox=$banner.find("ul:last");
    var $points=$pointBox.find("li");
    var index=1;
    var ani=function () {
        $imgBox.animate({transform: "translateX(" + (-index * w) + "px)"}, 200, function () {
            if (index >= 9) {
                index = 1;
                $imgBox.css({transform: "translateX(" + (-index * w) + "px)"})
            } else if (index <= 0) {
                index = 8;
                $imgBox.css({transform: "translateX(" + (-index * w) + "px)"})
            }
            $points.removeClass('now').eq(index - 1).addClass('now');
        });
    };
    var timer = setInterval(function () {
        index++;
        ani();
    }, 6000);
    $banner.on('swipeLeft',function () {
        index++;
        ani();
    });
    $banner.on('swipeRight', function () {
        index--;
        ani();
    });
});