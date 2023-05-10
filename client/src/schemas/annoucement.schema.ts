import * as yup from "yup";

export const createAnnouncementSchema = yup.object().shape({
    model: yup.string().required("O modelo é obrigatório"),
    brand: yup.string().required("A marca é obrigatória"),
    year: yup.string().required("O ano é obrigatório"),
    fuel: yup.string().required("O combustivel é obrigatório"),
    km: yup.string().required("A quilometragem é obrigatória"),
    color: yup.string().required("A cor é obrigatória"),
    fip_price: yup.string().required("O preço FIP é obrigatório"),
    price: yup.string().required("O preço é obrigatório"),
    description: yup.string().required("A descrição é obrigatória"),
    cover_image: yup.string().required("A imagem de capa é obrigatória"),
    gallery_image: yup.array().of(
        yup.string().notRequired()
    ).notRequired()
});

export const editAnnouncementSchema = yup.object().shape({
    model: yup.string().notRequired(),
    brand: yup.string().notRequired(),
    year: yup.string().notRequired(),
    fuel: yup.string().notRequired(),
    km: yup.string().notRequired(),
    color: yup.string().notRequired(),
    fip_price: yup.string().notRequired(),
    price: yup.string().notRequired(),
    description: yup.string().notRequired(),
    cover_image: yup.string().notRequired(),
    // gallery_images: yup.array().of(
    //     yup.string().notRequired()
    // ).notRequired()
});