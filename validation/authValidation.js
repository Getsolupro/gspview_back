import { check } from "express-validator";


const ValidateRegister=[
    check("email","Invalid email").isEmail().trim(),
    check("password", "Mot de passe invalide, le mot de passe doit etre superieur à 4 caractères").isLength({min:4}),
    check("passwordConfirmation","Mot de password de confirmation doit etre egal au mot de passe")
    .custom(
        (value, {req})=>{
            return value===req.body.password
        }
    )
];

const ValidateAuthentification=[
    check("email","Invalid email").isEmail().trim(),
    check("password", "Mot de passe invalide, le mot de passe doit etre superieur à 8 caractères").isLength({min:8}),
];

export default {
    ValidateRegister, 
    ValidateAuthentification
}