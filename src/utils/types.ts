import { Exclude } from "@nestjs/class-transformer"

export class createUserParams
{
    username: string
    password: string
    createdAt: Date

}

export class SerializedUser
{
    username: string

    @Exclude()
    password: string
    static this: any

    constructor (partial: Partial<SerializedUser>)
    {
        Object.assign(this, partial)
    }
}
export class updateUserParams
{
    username: string
    password: string
}

export class createUserProfilParams
{
    username: string
    lastName: string
    age: number
    
}

export class createUserPostParams
{
    title: string
    caption: string
    
}
