import {BaseApi, GetAuthorizationToken, MethodType} from "@/apis/BaseApi";
import type {BaseResponse} from "@/models/BaseResponse";

/**
 * # 用户当前信息
 * 用作获取当前用户的信息, 用户执行该接口获取当前用户的信息
 *
 * @returns Promise<BaseResponse<UserCurrentEntity>> 用户信息
 */
function UserCurrentAPI(): Promise<BaseResponse<UserCurrentEntity>> {
    return BaseApi<UserCurrentEntity>(
        MethodType.GET,
        "/api/v1/user/current",
        null,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    )
}

export {UserCurrentAPI}
