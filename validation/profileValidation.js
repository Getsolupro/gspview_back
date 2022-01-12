import { check } from "express-validator";

const ValidateRegisterProfile=[
    check("libelle","Libelle est obligatoire").notEmpty(),
    check("code","Code est obligatoire").notEmpty()
];
export default {
    ValidateRegisterProfile
}