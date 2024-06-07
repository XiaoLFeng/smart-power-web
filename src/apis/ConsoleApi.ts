import {BaseApi, GetAuthorizationToken, MethodType} from "@/apis/BaseApi";
import type {BaseResponse} from "@/models/BaseResponse";

/**
 * # 获取用户列表
 * 作为管理员获取用户列表，管理员执行该接口进行用户列表获取操作
 *
 * @returns Promise<BaseResponse<UserAllEntity>> 用户列表
 */
function ConsoleGetUserList(): Promise<BaseResponse<UserAllEntity>> {
    return BaseApi<UserAllEntity>(
        MethodType.GET,
        '/api/v1/console/user',
        null,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 * # 添加用户
 * 作为管理员添加用户，管理员执行该接口进行用户添加操作
 *
 * @param data 添加用户信息
 * @returns Promise<BaseResponse<AddUserReturnEntity>> 添加用户返回信息
 */
function ConsoleUserAddAPI(data: ConsoleUserAddDTO): Promise<BaseResponse<AddUserReturnEntity>> {
    return BaseApi<AddUserReturnEntity>(
        MethodType.POST,
        '/api/v1/console/user',
        null,
        data,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

export {ConsoleGetUserList, ConsoleUserAddAPI}
