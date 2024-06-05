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

/**
 * # 用户信息修改
 * 用作修改当前用户的信息, 用户执行该接口修改当前用户的信息
 *
 * @param data UserEditDTO 用户信息
 * @returns Promise<BaseResponse<null>> 修改结果
 */
function UserEditAPI(data: UserEditDTO): Promise<BaseResponse<null>> {
    return BaseApi<null>(
        MethodType.PUT,
        "/api/v1/user/profile",
        data,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    )
}

/**
 * # 用户公司信息修改
 * 用作修改当前用户的公司信息, 用户执行该接口修改当前用户的公司信息
 *
 * @param data UserCompanyEditDTO 公司信息
 * @returns Promise<BaseResponse<null>> 修改结果
 */
function UserCompanyEditAPI(data: UserCompanyEditDTO): Promise<BaseResponse<null>> {
    return BaseApi<null>(
        MethodType.PUT,
        "/api/v1/user/company",
        data,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    )
}

export {UserCurrentAPI, UserEditAPI, UserCompanyEditAPI}
