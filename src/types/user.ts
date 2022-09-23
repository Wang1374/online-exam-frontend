import { IResultWithDate, IVerifyResult } from './request';

export interface ILoginReq {
    phone: string;
    password: string;
}
export interface ILoginRes extends IResultWithDate<string> {}

export interface IRegisterReq {
    address: string;
    age: string;
    code: string;
    name: string;
    nickName: string;
    password: string;
    phone: string;
    sex: string;
}

export interface IRegisterRes extends IResultWithDate<null> {}

export interface ICaptchaReq {
    captchaType: string;
}

//用到 json to ts 的插件， 对json 对象全选拷贝之后，shift control option v
interface ICaptchaData {
    captchaId?: any;
    projectCode?: any;
    captchaType?: any;
    captchaOriginalPath?: any;
    captchaFontType?: any;
    captchaFontSize?: any;
    secretKey: string;
    originalImageBase64: string;
    point?: any;
    jigsawImageBase64: string;
    wordList?: any;
    pointList?: any;
    pointJson?: any;
    token: string;
    result: boolean;
    captchaVerification?: any;
    clientUid?: any;
    ts?: any;
    browserInfo?: any;
}

export interface ICaptchaRes extends IVerifyResult<ICaptchaData> {}

export interface ICaptChaCheckReq {
    captchaType: string;
    pointJson: string;
    token: string;
}

export interface ICaptChaCheckRes extends IVerifyResult<ICaptchaData> {}

export interface ICaptChaMegReq {
    captchaVerification: string;
    phone: string;
}

export interface ICaptChaMegRes extends IResultWithDate<string> {}
