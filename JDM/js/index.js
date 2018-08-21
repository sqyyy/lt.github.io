window.onload = function () {
    search();
    banner();
    downtime();
};
var search = function () {
    var searchbox = document.querySelector(".search");
    var banner = document.querySelector(".banner");
    var h = banner.offsetHeight;
    var opacity = 0;
    window.onscroll = function () {
        var scrolltop = document.body.scrollTop ||document.documentElement.scrollTop;
        if (scrolltop < h * 2) {
            opacity = scrolltop / h * 0.8 * 2;
        } else {
            opacity = .8;
        }
        searchbox.style.background = 'rgba(200, 20, 35, ' + opacity + ')';
    }
};
var banner = function () {
    var banner = document.querySelector('.banner');
    var w = banner.offsetWidth;
    var ul = document.querySelector('.banner>ul');
    var ol = document.querySelector('.banner>ol');
    var oli = ol.querySelectorAll('li');
    var index = 1;
    var setTransition = function () {
        ul.style.transition = 'all,.4s';
        ul.style.webkitTransition = 'all,.4s';
    };
    var removeTransition = function () {
        ul.style.transition = 'none';
        ul.style.webkitTransition = 'none';
    };
    var setTranslateX = function (translateX) {
        ul.style.transform = 'translateX(' + translateX + 'px)';
        ul.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };
    var setPoint = function () {
        for (var i = 0; i < oli.length; i++) {
            oli[i].classList.remove('now');
        }
        oli[index - 1].classList.add("now");
    };
    var timer = setInterval(function () {
        index++;
        setTransition();
        setTranslateX(-index * w);
    }, 2500);
    ul.addEventListener('transitionend', function () {
        if (index > 8) {
            index = 1;
            removeTransition();
            setTranslateX(-index * w);
        } else if (index < 1) {
            index = 8;
            removeTransition();
            setTranslateX(-index * w);
        }
        setPoint();
    });
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    ul.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    ul.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        e.preventDefault();
        removeTransition();
        setTranslateX(distanceX - index * w);
        isMove = true;
    });
    ul.addEventListener('touchend', function (e) {
        if (isMove) {
            if (Math.abs(distanceX) < w / 4) {
                setTransition();
                setTranslateX(-index * w);
            } else {
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                setTransition();
                setTranslateX(-index * w);
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            setTransition();
            setTranslateX(-index * w);
        }, 2500);
    });
};
var downtime = function () {
    var time = 2 * 60 * 60;
    var spans = document.querySelectorAll('.time>span');
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000)
};