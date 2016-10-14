/**
 * Created by Administrator on 2016/10/14 0014.
 */
$(function () {
    //上传传头像
    $('form').submit(function (ev) {
        ev.preventDefault();
        //判断是否登陆
        if ($.cookie('name')) {
            //已登录提交上传的图片
            var data = new FormData(this);
            console.log(data);
            $.ajax({
                type: 'POST',
                url: "/user/photo",
                data: data,
                contentType: false,
                processData: false,
                success: function (res, statusTXt, xhr) {
                    if (res.code == "success") {
                        $.popup(res.content, function () {
                            location.href = 'index.html';
                        });
                    } else {
                        $.popup(res.content);
                    }
                }
            })
        }else {
            //未登录跳转登陆
            $.popup('请您先登录！',function () {
                location.href = 'login.html';
            })
        }

    });
});