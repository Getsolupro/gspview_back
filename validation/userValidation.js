import { check } from "express-validator";

const ValidateRegisterUser=[
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
    check("image_name","Photo est obligatoire").notEmpty(),
    check("profile","Profile est obligatoire ").notEmpty(),
    check("adresse","Adresse est obligatoire ").notEmpty(),
];

const ValidateReadUser=[
    check('id',"Id est obligatoire").notEmpty()
]

export default {
    ValidateReadUser,
    ValidateRegisterUser
}