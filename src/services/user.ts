import { IVerifyResult } from '@/types/request';
import { ICaptchaReq, ICaptchaRes, ILoginReq, ILoginRes, IRegisterReq, IRegisterRes,ICaptChaCheckReq, ICaptChaCheckRes, ICaptChaMegRes} from '@/types/user';
import { Axios, AxiosPromise } from 'axios';
import request from './request';

export const ApiUser = {
    login(data: ILoginReq): AxiosPromise<ILoginRes> {
        return request('/login/Login', {data})
    },
    register(data: IRegisterReq): AxiosPromise<IRegisterRes> {
        return request('/user/register', {data})
    },
    captchaGet(data : ICaptchaReq): AxiosPromise<ICaptchaRes> {
        return request('/captcha/get', {data})
    },
    captchaCheck(data : ICaptChaCheckReq): AxiosPromise<ICaptChaCheckRes> {
        return request('/captcha/check', {data})
    },
    captchaSendMeg(params: ICaptchaReq): AxiosPromise<ICaptChaCheckRes>{
        return request('captcha/sendMsg', {params, headers: {ContentType: 'application/x-www-form-urlencoded;charset=UTF-8'}})
    },
    //如果Request Header是form data形式，需要 定义headers 的contentType；如果是 json形式，则不用设置，默认为json
}