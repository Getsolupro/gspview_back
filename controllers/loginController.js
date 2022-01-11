import loginService from "../services/loginService.js";
import { validationResult } from "express-validator";
import Jwt from "jsonwebtoken";

const LoginUser=async (req, res)=>{

    let errorsArr=[];
    let validationErrors=validationResult(req);
    if(!validationErrors.isEmpty()){
        let errors=Object.values(validationErrors.mapped());
        errors.forEach((item)=>{
            errorsArr.push(item.msg);
        });
        req.flash("errors",errorsArr);
        return res.send({"status":404,"erreurs":errorsArr});
    }

    try {
        let user={
            email: req.body.email,
            password:req.body.password
        };
        await loginService.LoginUser(req, res, user);
      // return res.send({"status":200,"data":loginService.LoginUser(req, res, user)});
    } catch (error) {
        
    }
};

const GetLogion=(req, res)=>{
    if(req.session.user){
        res.send({
        logginIn:true,
        user:req.session.user
        })
    }else{
        res.send({
            logginIn:false
        })
    }
}

const RefreshToken=(req, res)=>{
    loginService.RefreshToken(req, res, req.user);
}

export default {
    LoginUser,
    RefreshToken
} 
