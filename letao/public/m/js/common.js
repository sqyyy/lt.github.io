window.LT={};
LT.getParamsUrl = function () {
    var params={};
    var search=location.search;
    if (search){
        search=search.replace('?','');
        var arr=search.split('&');
        arr.forEach(function (item,i) {
            var itemArr=item.split('=');
            params[itemArr[0]]=itemArr[1];
        });
    }
    return params;
};
LT.loginUrl='/m/user/login.html';
LT.cartUrl='/m/user/cart.html';
LT.loginAjax=function (params) {
    $.ajax({
        type:params.type||'get',
        url:params.url||'#',
        data:params.data||'',
        dataType:params.dataType||'json',
        success:function (data) {
            if (data.error==400){
                location.href=LT.loginUrl+'?returnUrl='+location.href;
                return false;
            }else {
                params.success&&params.success(data);
            }
        },
        error:function () {
            mui.toast('服务器繁忙');
        }
    })
};
