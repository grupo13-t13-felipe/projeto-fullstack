import * as yup from "yup";

export const userLoginSchema = yup.object().shape({
    email: yup.string().email("Deve ser um email valido").required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória")
});

export const createUserSchema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Deve ser um email valido").required("O email é obrigatório"),
    cpf: yup.string().length(11, "O CPF deve conter 11 números").matches(new RegExp("^[0-9]{11}$"), "O CPF deve conter apenas números.").required("O CPF é obrigatório"),
    phone: yup.string().length(11, "O telefone deve conter 11 números").matches(new RegExp("^[0-9]{11}$"), "O telefone deve conter apenas números").required("O telefone é obrigatório"),
    description: yup.string().required("A sua descrição é obrigatória"),
    is_seller: yup.boolean().required("O tipo de conta é obrigatório"),
    birth_date: yup.string().required("A data de nascimento é obrigatório"),
    cep: yup.string().length(8, "O CEP deve conter 8 números").matches(new RegExp("^[0-9]{8}$"), "O CEP deve conter apenas números").required("O CEP é obrigatório"),
    state: yup.string().required("O estado é obrigatório"),
    city: yup.string().required("A rua é obrigatório"),
    number: yup.string().required("O número é obrigatório"),
    complement: yup.string().required("O complemento é obrigatório"),
    password: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("A senha é obrigatória"),
    confirm_password: yup.string().oneOf([yup.ref("password")], "As senhas devem ser iguais")
});