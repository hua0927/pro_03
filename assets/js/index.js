$(function() {
    getUserInfo();

    // 退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function(e) {
        e.preventDefault();
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something

            // 删除本地存储中的token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
});

// 获取用户信息,后面也要用到
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            renderAvatar(res.data);
        },
        // 无论成功或者失败都会触发complete方法
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }
    });
}

// 渲染用户
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('#text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('#text-avatar').html(first).show();
    }
}