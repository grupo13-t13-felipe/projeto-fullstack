export interface IUser {
	id: string,
	name: string,
	email: string,
	cpf: string,
	phone: string,
	description: string,
	birth_date: string,
	is_seller?: boolean,
	address?: IAddress
}

export interface IAddress {
	id?: string;
	cep?: string;
	state?: string;
	city?: string;
	street?: string;
	number?: string;
	complement?: string;
}

export interface Props {
	user: IUser | null
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUserCreate {
	name: string;
	email: string;
	cpf: string;
	phone: string;
	password: string;
	confirm_password: string;
	description: string;
	is_seller: boolean;
	birth_date: string;
	cep: string;
	state: string;
	city: string;
	street: string;
	number: string;
	complement: string;
}

export interface ISendEmail {
	email: string
}

export interface IChangePassword {
	password: string
}

export interface IUserEdite {
	name?: string;
	email?: string;
	cpf?: string;
	phone?: string;
	description?: string;
	birth_date?: string;
}