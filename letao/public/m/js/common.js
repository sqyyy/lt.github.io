window.LT = {};
LT.getParamsUrl = function () {
    var params = {};
    var search = location.search;
    if (search) {
        search = search.replace('?', '');
        var arr = search.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];
        });
    }
    return params;
};
LT.serialize2obj = function (data) {
    var obj = {};
    if (data) {
        var arr = data.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');
            obj[itemArr[0]] = itemArr[1];
        })
    }
    return obj;
};
LT.loginUrl = '/m/user/login.html';
LT.cartUrl = '/m/user/cart.html';
LT.userUrl = '/m/user/index.html';
LT.loginAjax = function (params) {
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success: function (data) {
            if (data.error == 400) {
                location.href = LT.loginUrl + '?returnUrl=' + location.href;
                return false;
            } else {
                params.success && params.success(data);
            }
        },
        error: function () {
            mui.toast('服务器繁忙');
        }
    })
};
LT.getItemById = function (arr, id) {
    var item=null;
    arr.forEach(function (itemi, i) {
        if (itemi.id == id){
            item=itemi;
        }
    });
    return item;
};
