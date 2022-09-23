import axios from 'axios'
import { APICode, APIVerifyCode } from '@/types/enums'
import { IResult } from '@/types/request'

//将基础配置用create配置基础配置，后面调用request可以覆盖 
//api 代理的表示
const request = axios.create({
    baseURL: '/api',
    timeout: 15 * 1000,
    method: 'post'
})

request.interceptors.request.use((config) => {
    console.log(config);
    // 往config.headers 添加token 和 phone 两个字
    const token = localStorage.getItem('token')
    const phone = localStorage.getItem('phone')

    if (config.headers) { 
       token && (config.headers.token = token)
       phone && (config.headers.phone = phone)
    }

    return config
}, err => Promise.reject(err))

request.interceptors.response.use((response) => {
    // 解析请求结果 根据code来提前抛出错误
    const res  = response.data

    if ('repCode' in res && res.reqCode !== APIVerifyCode.Success) {
        throw new Error(res.repCode)
    }

    if ('code' in res && res.code !== APICode.Success) {
        throw new Error(res.msg)
    }

    return response
}, err => Promise.reject(err))

export default request