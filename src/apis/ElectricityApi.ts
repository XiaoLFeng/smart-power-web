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
    )
}

export {ElectricityAllAPI, ElectricityGetRateAPI}
