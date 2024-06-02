/**
 * # 用户登陆实体类
 * 用于传输数据给后端接口，用户登陆
 */
type AuthLoginDTO = {
    user: string
    password: string
}

/**
 * # 用户注册实体类
 * 用于传输数据给后端接口，用户注册
 */
type AuthRegisterDTO = {
    username: string,
    email: string,
    phone: string,
    password: string,
    company: string,
    company_cods: string,
    company_address: string,
    representative: string
}
