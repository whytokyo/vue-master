import axios from 'axios'
import {ElMessage} from "element-plus";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '/api',
    // 超时
    timeout: 5000
})

// TODO request和response拦截器
// // 添加请求拦截器
// service.interceptors.request.use(
//     (config) => {
//         const token = Session.get('token')
//         // console.log("请求拦截器", token)
//         // 在发送请求之前做些什么 token
//         if (token) {
//             config.headers.common['Authorization'] = token;
//         }
//         return config;
//     },
//     (error) => {
//         // 对请求错误做些什么
//         console.log("请求拦截器错误", error)
//         return Promise.reject(error);
//     }
// );

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        if (response.data.code != 200) {
            ElMessage.error(response.data.code + response.data.message);
            return Promise.reject(service.interceptors.response);
        }
        return response;
    }
)



export default service
