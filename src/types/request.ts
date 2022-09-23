export interface IResult {
    code: string
    msg: string
}

export interface IResultWithDate<T> extends IResult {
    date: T 
}

export interface IVerifyResult<T>{
    repCode : string
    repData : T
    repMsg  : string | null
    success : boolean
}
