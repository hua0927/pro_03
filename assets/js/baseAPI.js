var baseURL = 'http://ajax.frontend.itheima.net';
// 注意: 每次调用$.get()或$.post() 或 $.ajax() 的时候
// 会先调用ajaxPrefilter 这个函数
// 在这个函数中,可以拿到我们给ajax提供的配置对象

// 拦截所有ajax请求
$.ajaxPrefilter(function(params) {
    // 在发起真正的Ajax请求之前,统一拼接请求的根路径
    params.url = baseURL + params.url;

    // 对需要权限的接口配置头信息
    // 必须是以/my/开头
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数
    params.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html';
        }
    }
})