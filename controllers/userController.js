import { validationResult } from "express-validator";
import usersService from "../services/usersService.js";
import Connection from "../config/connectDB.js";


const readById=async (req, res)=>{
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
         let id={
             id:req.body.id
         };
        await usersService.readById(id, res);
     } catch (error) {
         
     }
}

const readByEmail=()=>{

}

const updateById=()=>{

}

const updateByEmail=()=>{

}

const deleteById=()=>{

}

const deleteByEmail=()=>{

}

export default {
    readById,
    readByEmail,
    updateById,
    updateByEmail,
    deleteById,
    deleteByEmail
}