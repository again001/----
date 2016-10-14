// $.fn.extend({
//     popup:function (value) {
//         var html = "<div class=\"popup popup01\">"+"<div class=\"pop_close\">x</div>"+"<div class=\"pop_title\">提示信息</div>"+"<div class=\"pop_content\"></div>"+"</div>"+"<div class=\"mask\"></div>";
//         $('body').append(html);
//         $('.pop_content').html(value);
//         $('body').on('click','.pop_close',function () {
//             $(this).parents('.popup').fadeOut('fast',function () {
//                 this.remove();
//             });
//             $('.mask').fadeOut('fast',function () {
//                 this.remove();
//             });
//         })
//     }
// });
function formatTime(val) {
    if (!val) {
        return ''
    }
    var time = new Date(val);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    hour = hour > 9 ? hour : '0' + hour;
    minute = minute > 9 ? minute : '0' + minute;
    return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute)
}
function formatIp(val) {
    if (!val) {
        return ''
    }
    val = val == "::1" ? "192.168.0.1" : val;
    if (val.startsWith("::ffff:")) {
        val = val.substr(7);
    }
    return val;
}
function formatContent(val) {
    if (!val) {
        return ''
    }
    var str = val.replace(/</g, '&lt;');
    str = str.replace(/>/g, '%gt;');
    return str;
}
// console.log(formatTime(45645665));
// console.log(formatContent('<dk>'));

$(function () {
    //返回一步
    $('.back').click(function () {
        history.go(-1);
    });
    $('.home').click(function () {
        location.href = 'index.html'
    })
});