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
        data,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 * # 重置用户密码
 * 作为管理员重置用户密码，管理员执行该接口进行用户密码重置操作
 *
 * @param uuid 用户uuid
 * @returns Promise<BaseResponse<AddUserReturnEntity>> 重置用户密码返回信息
 */
function ConsoleUserResetPasswordAPI(uuid: string): Promise<BaseResponse<AddUserReturnEntity>> {
    return BaseApi<AddUserReturnEntity>(
        MethodType.POST,
        '/api/v1/console/password/reset',
        {uuid: uuid},
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 * # 删除用户
 * 作为管理员删除用户，管理员执行该接口进行用户删除操作
 *
 * @param uuid 用户uuid
 * @returns Promise<BaseResponse<null>> 删除用户返回信息
 */
function ConsoleUserDeleteAPI(uuid: string): Promise<BaseResponse<null>> {
    return BaseApi<null>(
        MethodType.DELETE,
        '/api/v1/console/user',
        {uuid: uuid},
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 *  # 编辑用户
 *  作为管理员编辑用户，管理员执行该接口进行用户编辑操作
 *
 * @param data 用户编辑信息
 * @returns Promise<BaseResponse<null>> 编辑用户返回信息
 */
function ConsoleUserEditAPI(data: ConsoleUserEditDTO): Promise<BaseResponse<null>> {
    return BaseApi<null>(
        MethodType.PUT,
        '/api/v1/console/user',
        data,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

export {ConsoleGetUserList, ConsoleUserAddAPI, ConsoleUserResetPasswordAPI, ConsoleUserDeleteAPI, ConsoleUserEditAPI}
