import privilegeService from "../services/privilegeService.js";
import { ValidationError } from "express-validation";
import { validationResult } from "express-validator";

const create=async (req, res)=>{
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
     // Creation d'un nouveau profile
     try {
         let newPrivilege={
             code: req.body.code,
             libelle:req.body.libelle,
             description:req.body.description
         };
        await privilegeService.CreatePrivilege(newPrivilege, res);
     } catch (error) {
         
     }
}

const read=async (req, res)=>{
    await privilegeService.read(req,res);
}

const readById=()=>{

}

const readByCode=()=>{

}

const updateById=()=>{

}

const updateByCode=()=>{

}

const deleteById=()=>{

}

const deleteByCode=()=>{

}

export default {
    create,
    read,
    readById,
    readByCode,
    updateById,
    updateByCode,
    deleteById,
    deleteByCode
}