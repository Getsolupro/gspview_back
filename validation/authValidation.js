import { check } from "express-validator";


const ValidateRegister=[
    check("email","Invalid email").isEmail().trim(),
    check("password", "Mot de passe invalide, le mot de passe doit etre superieur à 4 caractères").isLength({min:4}),
    check("passwordConfirmation","Mot de password de confirmation doit etre egal au mot de passe")
    .custom(
        (value, {req})=>{
            return value===req.body.password
        }
    ),
    check("nom","Nom est obligatoire").notEmpty(),
    check("prenom","Prenom est obligatoire").notEmpty(),
    check("photo","Photo est obligatoire").notEmpty(),
    check("profile","Profile est obligatoire ").notEmpty(),
    check('privilege',"Privileg est obligatoie").notEmpty(),
    check("adresse","Adresse est obligatoire ").notEmpty()
];

const ValidateAuthentification=[
    check("email","Invalid email").isEmail().trim(),
    check("password", "Mot de passe invalide, le mot de passe doit etre superieur à 8 caractères").isLength({min:4}),
];

export default {
    ValidateRegister, 
    ValidateAuthentification
}