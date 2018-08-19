$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:3000
    });
});