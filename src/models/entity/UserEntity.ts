/**
 * # 当前用户实体
 * 用作获取当前用户信息
 */
type UserCurrentEntity = {
    user: {
        uuid: string,
        username: string,
        email: string,
        phone: number,
        role: string
    },
    company: {
        cods: string,
        name: string,
        address: string,
        representative: string
    }
}
