/**
 * # 用户登陆数据模型
 * 用于用户登陆时的数据传输，登陆成功后返回的数据传输内容
 */
type AuthEntity = {
    user: {
        uuid: string,
        username: string,
        email: string,
        phone: number,
        role: string,
    },
    token: string
}
