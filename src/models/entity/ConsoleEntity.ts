type AddUserReturnEntity = {
    user: {
        uuid: string,
        username: string,
        email: string,
        phone: string,
        role: string
    },
    password: string
}
