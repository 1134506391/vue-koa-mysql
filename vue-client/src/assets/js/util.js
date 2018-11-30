const test1 = () => {
    // 请求拦截（配置发送请求的信息）
    axios.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        console.log("请求前")
        $("#loading").show()
        return config;
    }, function(error) {
        // 对请求错误做些什么
        console.log("请求失败")
        return Promise.reject(error);
    });
    // 响应拦截（配置请求回来的信息）
    axios.interceptors.response.use(function(response) {
        // 处理响应数据
        console.log("响应成功")
        $("#loading").hide()
        return response;
    }, function(error) {
        // 处理响应失败
        console.log("响应失败")
        $("#loading").hide()
        return Promise.reject(error);
    });
}

module.exports = {
    test1: test1
}