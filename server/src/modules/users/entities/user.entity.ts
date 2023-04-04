import { Exclude } from "class-transformer";
import { randomUUID } from "node:crypto";

export class User {
    readonly id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    description: string;
    is_admin: boolean;
    is_seller: boolean;
    birth_date: Date;
    created_at: Date;
    updated_at: Date;
    
    @Exclude()
    password: string;
    
    constructor() {
        this.id = randomUUID();
    }
}
