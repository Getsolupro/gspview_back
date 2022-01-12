import paysService from "../services/paysService.js";
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
     // Creation d'un nouveau pays
     try {
         let newPays={
             code: req.body.code,
             libelle:req.body.libelle
         };
          
         await paysService.CreatePays(newPays, res);
         //return res.send({"status":200,"data":req.body});
     } catch (error) {
         
     }
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
    readById,
    readByCode,
    updateById,
    updateByCode,
    deleteById,
    deleteByCode
}