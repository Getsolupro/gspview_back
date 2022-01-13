import { check } from "express-validator";

const ValidateRegisterPrivilege=[
    check("libelle","Libelle est obligatoire").notEmpty(),
    check("code","Code est obligatoire").notEmpty()
];
export default {
    ValidateRegisterPrivilege
}