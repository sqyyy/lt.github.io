$(function () {
    $('.lt_search input').val('');
    render();
    $('.lt_search a').on('tap', function () {
        var key = $.trim($('input').val());
        if (!key) {
            mui.toast('请输入搜索内容',
                {duration: 'short', type: 'div'});
            return false;
        }
        addSearchData(key);

        location.href = 'searchlist.html?key=' + key;
        return false;
    });
    $('.lt_history').on('tap','.icon_clear',function () {
        localStorage.setItem('leTaoSearchHistory','[]');
        render();
    });
    $('.lt_history').on('tap','.icon_delete',function () {
        removeSearchData($(this).siblings('[data-key]').data('key'));
       render();
    });
    $('.lt_history').on('tap','[data-key]',function () {
        location.href = 'searchlist.html?key=' + $(this).attr('data-key');
    });
});
var getSearchData=function () {
    return JSON.parse(localStorage.getItem('leTaoSearchHistory')||'[]');
};
var addSearchData=function (key) {
    var lists=getSearchData();
   lists.forEach(function (item,i) {
       if (item==key) {
           lists.splice(i,1);
       }
   });
   lists.push(key);
   if (lists.length>10){
       lists.splice(0,lists.length-10);
   }
   localStorage.setItem('leTaoSearchHistory',JSON.stringify(lists));
};
var removeSearchData=function (key) {
    var lists=getSearchData();
    lists.forEach(function (item,i) {
        if (item==key) {
            lists.splice(i,1);
        }
    });
    localStorage.setItem('leTaoSearchHistory',JSON.stringify(lists));
};
var render=function () {
    var lists=getSearchData();
    $('.lt_history').html(template('searchList', {list: lists}));
};
