import {BaseApi, MethodType} from "@/apis/BaseApi";
import type {BaseResponse} from "@/models/BaseResponse";

/**
 * # 授权登录
 * 用作用户登录授权，用户执行该接口进行用户的登陆操作
 *
 * @returns Promise<BaseResponse<AuthEntity>> 登录信息
 */
function AuthLoginAPI(getData: AuthLoginDTO): Promise<BaseResponse<AuthEntity>> {
    return BaseApi<AuthEntity>(MethodType.GET, "/api/v1/auth/login", null, getData, null, null);
}

export {AuthLoginAPI}
