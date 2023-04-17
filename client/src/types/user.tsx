export interface IUser {
    id: string,
    name: string,
    email: string, 
    cpf: string,
	phone: string,
	description: string,
    birth_date: string,
}

export interface Props {
    user: IUser
}