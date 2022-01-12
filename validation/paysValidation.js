import { check } from "express-validator";

const ValidateRegisterPays=[
    check("code","Code est obligatoire").notEmpty(),
    check("libelle","Libelle est obligatoire").notEmpty()
];

export default {
    ValidateRegisterPays
}