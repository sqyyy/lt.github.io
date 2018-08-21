$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    var that = {};
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                auto: true,
                callback: function () {
                    that = this;
                    setTimeout(function () {
                        getCartData(function (data) {
                            $('.mui-table-view').html(template('cart', data));
                            that.endPulldownToRefresh();
                        });
                    }, 1000)
                }
            }
        }
    });
    $('.fa-refresh').on('tap', function () {
        // that.pulldownLoading();
        mui("#refreshContainer").pullRefresh().pulldownLoading();
    });
    $('body').on('tap', '.btn_size', function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
    $('body').on('tap', '.p_number span', function () {
        $input = $(this).siblings('input');
        var cuNum = parseInt($input.val());
        var maxNum = $input.data('max');
        if ($(this).hasClass('jian')) {
            if (cuNum <= 1) {
                mui.toast('最少一件');
                return false;
            }
            cuNum--;
        } else {
            if (cuNum >= maxNum) {
                mui.toast('库存不足');
                return false;
            }
            cuNum++;
        }
        $input.val(cuNum);
    });
    $('.mui-table-view').on('tap', '.mui-icon-compose', function () {
        var li = this.parentNode.parentNode;
        var $obj=$(this).parent();
        var id = $obj.attr('data-id');
        var item = LT.getItemById(window.cartData.data, id);
        var html = template('edit', item);
        mui.confirm(html.replace(/\n/g, ''), '商品编辑', ['确认', '取消'],
            function (e) {
                if (e.index == 0) {
                    var size = $('.btn_size.now').html();
                    var num = $('.p_number input').val();
                    LT.loginAjax({
                        url: '/cart/updateCart',
                        type: 'post',
                        data: {
                            id: id,
                            size: size,
                            num: num
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.success == true) {
                                mui.swipeoutClose(li);
                                mui.toast('编辑成功');
                                item.size=size;
                                item.num=num;
                                $obj.parent().find('.number')
                                    .html('x'+num+'双');
                                $obj.parent().find('.size')
                                    .html('鞋码：'+size);
                                setAmount();
                            }
                        }
                    });
                } else {
                    mui.swipeoutClose(li);
                }
            })
    });
    $('.mui-table-view').on('tap', '.mui-icon-trash', function () {
        var $this = $(this);
        var li = this.parentNode.parentNode;
        var id = $this.parent().attr('data-id');
        mui.confirm('确定删除该商品吗?', '商品删除', ['确认', '取消'],
            function (e) {
                if (e.index == 0) {
                    LT.loginAjax({
                        url: '/cart/deleteCart',
                        type: 'get',
                        data: {
                            id: id,
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.success == true) {
                                $this.parent().parent().remove();
                                setAmount();
                            }
                        }
                    });
                } else {
                    mui.swipeoutClose(li);
                }
            })
    });
    $('.mui-table-view').on('change', '[type=checkbox]', function () {
        setAmount();
    })
});
var setAmount = function () {
    var $checkedBox = $('[type=checkbox]:checked');
    var amountSum = 0;
    $checkedBox.each(function (i, e) {
        var id = $(this).data('id');
        var item = LT.getItemById(window.cartData.data, id);
        var num = item.num;
        var price = item.price;
        var amount = num * price;
        amountSum += amount;
    });
    if (Math.floor(amountSum * 100) % 10) {
        amountSum = Math.floor(amountSum * 100) / 100;
    } else {
        if (Math.floor(amountSum * 100) % 100) {
            amountSum = Math.floor(amountSum * 100) / 100;
            amountSum = amountSum.toString() + '0';
        } else {
            amountSum = Math.floor(amountSum * 100) / 100;
            amountSum = amountSum.toString() + '.00';
        }
    }
    $('#cartAmount').html(amountSum);
};
var getCartData = function (callback) {
    LT.loginAjax({
        url: '/cart/queryCartPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (data) {
            window.cartData = data;
            callback && callback(data);
        }
    });
};