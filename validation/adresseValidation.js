import { check } from "express-validator";

const ValidateRegisterAdresse=[
    check("telephone1","Telephone est obligatoire").notEmpty(),
    check("email","email est obligatoire").notEmpty(),
    check('pays','Pays est obligatoire').notEmpty()
];
export default {
    ValidateRegisterAdresse
}