import {BaseApi, GetAuthorizationToken, MethodType} from "@/apis/BaseApi";
import type {BaseResponse} from "@/models/BaseResponse";

/**
 * # 电费查询
 * 用作用户查询电费信息，用户执行该接口进行电费查询操作
 *
 * @returns Promise<BaseResponse<ElectricityAllEntity>> 电费信息
 */
function ElectricityAllAPI(): Promise<BaseResponse<ElectricityAllEntity>> {
    return BaseApi<ElectricityAllEntity>(
        MethodType.GET,
        "/api/v1/electric/all",
        null,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 * # 电费费率查询
 * 用作用户查询电费费率信息，用户执行该接口进行电费费率查询操作
 *
 * @returns Promise<BaseResponse<RateDataEntity>> 电费费率信息
 */
function ElectricityGetRateAPI(): Promise<BaseResponse<RateDataEntity>> {
    return BaseApi<RateDataEntity>(
        MethodType.GET,
        "/api/v1/electric/rate",
        null,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 * # 电费单条查询
 * 用作用户查询单条电费信息，用户执行该接口进行单条电费查询操作
 *
 * @param ceUUID 电费主键 UUID
 * @param timePicker 时间选择器
 * @returns Promise<BaseResponse<ElectricitySingleEntity>> 单条电费信息
 */
function ElectricityGetSingleAPI(ceUUID: string, timePicker: string): Promise<BaseResponse<ElectricitySingleEntity>> {
    return BaseApi<ElectricitySingleEntity>(
        MethodType.GET,
        "/api/v1/electric",
        null,
        {ce_uuid: ceUUID, time_picker: timePicker},
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 * # 电费编辑
 * 用作用户编辑电费信息，用户执行该接口进行电费编辑操作
 *
 * @param getData 电费编辑数据
 * @returns Promise<BaseResponse<null>> 电费编辑结果
 */
function ElectricityEditAPI(getData: ElectricEditDTO): Promise<BaseResponse<null>> {
    return BaseApi<null>(
        MethodType.PUT,
        "/api/v1/electric",
        getData,
        null,
        null,
        {Authorization: GetAuthorizationToken()}
    );
}

/**
 * # 电费删除
 * 用作用户删除电费信息，用户执行该接口进行电费删除操作
 *
 * @param ceUUID 电费主键 UUID
 * @returns Promise<BaseResponse<null>> 电费删除结果
 */
function ElectricityDeleteAPI(ceUUID: string): Promise<BaseResponse<null>> {
    return BaseApi<null>(
        MethodType.DELETE,
        "/api/v1/electric",
        null,
        {ce_uuid: ceUUID},
        null,
        {Authorization: GetAuthorizationToken()}
    );

}

export {ElectricityAllAPI, ElectricityGetRateAPI, ElectricityGetSingleAPI, ElectricityEditAPI, ElectricityDeleteAPI}
