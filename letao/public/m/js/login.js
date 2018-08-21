$(function () {
    // var data=$('.form_box').serializeArray();转化数组
    $('#submit').on('tap',function () {
        var data=$('.form_box').serialize();
        var dataObj=LT.serialize2obj(data);
        console.log(dataObj);
        if (!dataObj.username){
            mui.toast('请输入用户名');
            return false;
        }
        if (!dataObj.password){
            mui.toast('请输入密码');
            return false;
        }
        $.ajax({
            url: ' /user/login',
            type: 'post',
            data: dataObj,
            dataType:'json',
            success:function (data) {
                if (data.success==true){
                    var returnUrl=location.search.replace('?returnUrl=','');
                    if (returnUrl){
                        location.href=returnUrl;
                    } else {
                        location.href=LT.userUrl;
                    }
                }else {
                    mui.toast(data.message);
                }
            }
        });
    });
});