import {BaseApi, MethodType} from "@/apis/BaseApi";
import type {BaseResponse} from "@/models/BaseResponse";

/**
 * # 授权登录
 * 用作用户登录授权，用户执行该接口进行用户的登陆操作
 *
 * @param getData 用户登陆实体类
 * @returns Promise<BaseResponse<AuthEntity>> 登录信息
 */
function AuthLoginAPI(getData: AuthLoginDTO): Promise<BaseResponse<AuthEntity>> {
    return BaseApi<AuthEntity>(MethodType.GET, "/api/v1/auth/login", null, getData, null, null);
}

/**
 * # 授权注册
 * 用作用户注册授权，用户执行该接口进行用户的注册操作
 *
 * @param getData 用户注册实体类
 * @returns Promise<BaseResponse<null>> 注册信息
 */
function AuthRegisterAPI(getData: AuthRegisterDTO): Promise<BaseResponse<null>> {
    return BaseApi<null>(MethodType.POST, "/api/v1/auth/register", getData, null, null, null);
}

export {AuthLoginAPI, AuthRegisterAPI}
