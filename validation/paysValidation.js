import { check } from "express-validator";

const ValidateRegisterPays=[
    check("code","Code est obligatoire").trim().isEmpty(),
    check("libelle","Libelle est obligatoire").trim().isEmpty(),
    check("date_update","Date de mise à jour est obligatoire ").trim().isEmpty(),
];

export default {
    ValidateRegisterPays
}