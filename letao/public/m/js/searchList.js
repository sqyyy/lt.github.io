$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    var urlParams = LT.getParamsUrl();
    var $input = $("input").val(urlParams.key || '');
    getSearchData({
        page: 1,
        pageSize: 4,
        proName: urlParams.key
    }, function (data) {
        $('.lt_product').html(template('list', data));
    });
    $(".lt_search a").on('tap', function () {
        var key = $.trim($input.val());
        if (!key) {
            mui.toast('请输入搜索内容',
                {duration: 'short', type: 'div'});
            return false;
        }
        getSearchData({
            page: 1,
            pageSize: 4,
            proName: key
        }, function (data) {
            $('.lt_product').html(template('list', data));
        });
    });
  var that={};
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                // color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                // height:'50px',//可选,默认50px.下拉刷新控件的高度,
                // range:'100px', //可选 默认100px,控件可下拉拖拽的范围
                // offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                     that = this;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入搜索内容',
                            {duration: 'short', type: 'div'});
                        return false;
                    }
                    $('.lt_orders a').removeClass('now').find('span')
                        .removeClass('fa-angle-up').addClass('fa-angle-down');
                    getSearchData({
                        page: 1,
                        pageSize: 4,
                        proName: key
                    }, function (data) {
                        setTimeout(function () {
                            $('.lt_product').html(template('list', data));
                            that.endPulldownToRefresh();
                            mui('#refreshContainer').pullRefresh().refresh(true);
                        }, 500);
                    });
                }
            },
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                // auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    window.page++;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入搜索内容',
                            {duration: 'short', type: 'div'});
                        return false;
                    }
                    var order = $('.lt_orders a.now').data('order');
                    var orderVal = $('.lt_orders a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
                    var params = {
                        page: window.page,
                        pageSize: 4,
                        proName: key,
                    };
                    params[order] = orderVal;
                    getSearchData(params, function (data) {
                        setTimeout(function () {
                            $('.lt_product').append(template('list', data));
                            if (data.data.length) {
                                that.endPullupToRefresh();
                            } else {
                                that.endPullupToRefresh(true);
                            }
                        }, 500);
                    });

                }
            }
        }
    });

    $('.lt_orders a').on('tap', function () {
        if ($(this).hasClass('now')) {
            $(this).find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }
        $(this).addClass('now').siblings().removeClass('now')
            .find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        var order = $(this).data('order');
        var orderVal = $(this).find('span').hasClass('fa-angle-up') ? 1 : 2;
        var params = {
            page: 1,
            pageSize: 4,
            proName: $.trim($input.val()),
        };
        params[order] = orderVal;
        getSearchData(params, function (data) {
            $('.lt_product').html(template('list', data));
            mui('#refreshContainer').pullRefresh().refresh(true);
        });
    });
});
var getSearchData = function (params, callback) {
    $.ajax({
        url: ' /product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            window.page = data.page;
            callback && callback(data);
        }
    });
};