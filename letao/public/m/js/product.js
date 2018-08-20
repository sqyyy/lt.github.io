$(function () {
    var productId = LT.getParamsUrl().productId;
    getProductData(productId,function (data) {
        $('.load').remove();
        console.log(data);
        $('.mui-scroll').html(template('detail',data));
        mui('.mui-slider').slider({
            interval:2000
        });
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });
    });
});
var getProductData = function (productId, callback) {
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {id: productId},
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};