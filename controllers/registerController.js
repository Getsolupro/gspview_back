import { validationResult } from "express-validator";
import registerService from "../services/registerService.js";

//import createNewUser from "../services/registerService";

const RegisterUser=(req, res)=>{
    return res.send("enregistrer");
}

const CreateUser= async (req, res)=>{
    // Validation des données envoyées
    console.log(req.body);
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
            password:req.body.password
        };
        await registerService.CreateNewUser(newUser);
        return res.send({"status":200,"data":req.body});
    } catch (error) {
        
    }
}

export default {
    RegisterUser,
    CreateUser
}