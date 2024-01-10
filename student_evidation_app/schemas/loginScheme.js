import * as Yup from "yup";

export const LoginScheme = Yup.object().shape({
    email: Yup.string()
        .required('Email je povinný údaj')
        .email('Špatný formát emailu'),

    password: Yup.string()
        .required('Heslo je povinný údaj')
        .min(6, 'Heslo musí být alespoň 6 znaků dlouhé')
        .max(60, 'Heslo je příliš dlouhé'),

});