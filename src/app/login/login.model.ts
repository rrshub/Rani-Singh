export class Login {
    
    username: string
    password: string
    clientid: string

      
}

export class loginSuccessModel {
    status: string
    data: {
        clientUserId: number
        EmailAddress: string
        clientPartnerID: number
        role: string
        firstname: string
        lastname: string
        UserToken: string
    }
    message: string
}