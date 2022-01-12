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
    check("nom","Nom est obligatoire").trim().isEmpty(),
    check("nom","Prenom est obligatoire").trim().isEmpty(),
    check("image_name","Photo est obligatoire").trim().isEmpty(),
    check("image_path","Url de l'image est obligatoire").trim().isEmpty(),
    check("active","active est obligatoire").trim().isEmpty(),
    check("date_inscription","Date d'inscription est obligatoire ").trim().isEmpty(),
    check("date_update","Date de mise à jour est obligatoire ").trim().isEmpty(),
    check("date_delete","Date de suppression est obligatoire ").trim().isEmpty(),
    check("profile_id","Profile est obligatoire ").trim().isEmpty(),
    check("adresse_id","Adresse est obligatoire ").trim().isEmpty(),
];