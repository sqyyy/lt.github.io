$(function () {
    getCategoryData(function (data) {
        var tabLeft = template('first-temp', data);
        $('.cate_left ul').html(tabLeft);
        var initId = $('.cate_left ul li:first-child').find('a').data('id');
        render(initId);
    });
    $('.cate_left').on('tap', 'a', function () {
        if ($(this).parent().hasClass('now')) return false;
        $(this).parent().addClass('now').siblings().removeClass('now');
        render($(this).data('id'));
    });
});
var getCategoryData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};
var getSecondData = function (params, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};
var render = function (categoryId) {
    getSecondData({id: categoryId}, function (data) {
        $('.cate_right ul').html(template('second-temp', data));
    });
};