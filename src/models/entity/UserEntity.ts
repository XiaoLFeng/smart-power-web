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

/**
 * # 所有用户实体
 * 用作获取所有用户信息, 用于管理员查看
 */
type UserAllEntity = {
    list: UserCurrentEntity[]
}
