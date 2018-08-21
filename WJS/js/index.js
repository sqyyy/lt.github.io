$(function () {
    banner();
    initMTab();
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                dataType: 'json',
                data: '',
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    };
    var render = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768;
            var pointHtml = template('pointTemplate', {list: data});
            var imgHtml = template('imgTemplate', {list: data, isM: isMobile});
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imgHtml);
        });
    };
    $(window).on('resize', function () {
        render();
    }).trigger('resize');
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $(".wjs_banner").on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;return false;
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX < 0) {
                $('.carousel').carousel('next');
            } else {
                $('.carousel').carousel('prev');
            }
        }
       startX=0;
        distanceX=0;
        isMove=false;
    });
};

var initMTab = function () {
    var $navTabs=$(".wjs_product .nav-tabs");
    var w=0;
    $navTabs.find("li").each(function (i,item) {
        w+=$(this).outerWidth(true);
    });
    $navTabs.width(w);
    new IScroll($(".nav-tabs-parent")[0],{
        scrollX:true,
        scrollY:false,
        click:true
    })
};

