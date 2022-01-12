import adresseService from "../services/adresseService.js";
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
     // Creation d'une nouvelle adresse
     try {
         let newAdresse={
             code_postale: req.body.code_postale,
             telephone1:req.body.telephone1,
             telephone2:req.body.telephone2,
             email:req.body.email,
             ville:req.body.ville,
             pays_id:req.body.pays.id
         };
          console.log(newAdresse);
          await adresseService.CreateAdresse(newAdresse, res);
         //await paysService.CreatePays(newAdresse, res);
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