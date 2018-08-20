$(function () {
    var productId = LT.getParamsUrl().productId;
    getProductData(productId, function (data) {
        $('.load').remove();
        console.log(data);
        $('.mui-scroll').html(template('detail', data));
        mui('.mui-slider').slider({
            interval: 2000
        });
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });
        $('.btn_size').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now');
        });
        $('.p_number').on('tap', 'span', function () {
            $input = $(this).siblings('input');
            var cuNum = parseInt($input.val());
            var maxNum = $input.data('max');
            if ($(this).hasClass('jian')) {
                if (cuNum == 0) return false;
                cuNum--;
            } else {
                if (cuNum >= maxNum) {
                    mui.toast('库存不足');
                    return false;
                }
                cuNum++;
            }
            $input.val(cuNum);
            $(this).siblings('i').html(maxNum - cuNum);
        });
        $('.btn_addCart').on('tap', function () {
            var $size = $('.btn_size.now');
            if (!$size.length) {
                mui.toast('请选择尺码');
                return false;
            }
            var num = $('.p_number input').val();
            if (num <= 0) {
                mui.toast('请选择数量');
                return false;
            }
            LT.loginAjax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: productId,
                    num: num,
                    size: $size.html()
                },
                dataType: 'json',
                success: function (data) {
                    if (data.success==true){
                        mui.confirm('添加成功去购物车看看？', '温馨提示', ['是', '否'],
                            function (e) {
                                if (e.index == 0) {
                                    location.href = LT.cartUrl;
                                } else {

                                }
                            })
                    }
                }
            })
        })
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