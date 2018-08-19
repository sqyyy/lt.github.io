$(function () {
    $('.lt_search a').on('tap', function () {
        var key = $.trim($('input').val());
        if (!key) {
            mui.toast('请输入搜索内容',
                {duration: 'short', type: 'div'});
            return false;
        }
        location.href = 'searchlist.html?key=' + key;
    });
});