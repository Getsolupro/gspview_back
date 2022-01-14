import { validationResult } from "express-validator";
import registerService from "../services/registerService.js";
import Connection from "../config/connectDB.js";

//import createNewUser from "../services/registerService";

const RegisterUser=(req, res)=>{
    return res.send("enregistrer");
}

const TestUser=(req, res)=>{

}

const CreateUser= async (req, res)=>{
    // Validation des données envoyées
    let errorsArr=[];
    let validationErrors=validationResult(req);
    if(!validationErrors.isEmpty()){
        let errors=Object.values(validationErrors.mapped());
        errors.forEach((item)=>{
            errorsArr.push(item.msg);
        });
        return res.send({"status":404,"erreurs":errorsArr});
    }
    // Creation d'un nouvel utilisateur
    try {
        let newUser={
            email: req.body.email,
            password:req.body.password,
            nom:req.body.nom,
            prenom:req.body.prenom,
            photo:req.body.photo,
            profile:req.body.profile,
            code_postale:req.body.code_postale,
            telephone1:req.body.telephone1,
            telephone2:req.body.telephone2,
            ville:req.body.ville,
            pays:req.body.pays,
            privilege:req.body.privilege
        };
        await registerService.Create(newUser, res);
    } catch (error) {
        
    }
}

export default {
    RegisterUser,
    CreateUser
}