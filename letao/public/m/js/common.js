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