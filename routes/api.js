import express from "express";
import GetLogin from "../controllers/loginController.js";
//import RegisterUser from "../controllers/registerController.js";

import registerController from "../controllers/registerController.js";
import authValidation from "../validation/authValidation.js";
//import authValidation from "../valiation/authValidation.js";
import loginController from "../controllers/loginController.js";
import passport from "passport";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import paysService from "../services/paysService.js";
import paysValidation from "../validation/paysValidation.js";
import paysControler from "../controllers/paysControler.js";
import adresseValidation from "../validation/adresseValidation.js";
import adresseController from "../controllers/adresseController.js";
import profileValidation from "../validation/profileValidation.js";
import profileControler from "../controllers/profileControler.js";
import privilegeValidation from "../validation/privilegeValidation.js";
import privilegeController from "../controllers/privilegeController.js";
import userController from "../controllers/userController.js";
import userValidation from "../validation/userValidation.js";
//import AuthenficateToken from "../middleware/AuthMiddleware.js";


const router = express.Router();

const InitWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("homepage")
    });
  
    router.get("/getUsers", registerController.RegisterUser);
    // routes users
    router.post("/createUser", authValidation.ValidateRegister, registerController.CreateUser);
    router.get("/readById", userValidation.ValidateReadUser, userController.readById);
    
    router.post("/login",authValidation.ValidateAuthentification, loginController.LoginUser);
   // router.post("/refreshToken", AuthMiddleware.AuthenficateToken,loginController.RefreshToken);
   router.post("/refreshToken",loginController.RefreshToken);

   // routes pays
   router.post("/creerPays",paysValidation.ValidateRegisterPays, paysControler.create);

   // routes adresse 
   router.post("/creerAdresse",adresseValidation.ValidateRegisterAdresse,adresseController.create)

   // route profile
  router.post("/creerProfile", profileValidation.ValidateRegisterProfile, profileControler.create)

  // route privilege
  router.post("/creerPrivilege",privilegeValidation.ValidateRegisterPrivilege,privilegeController.create);
  router.get("/privileges",privilegeController.read);

    return app.use("/", router);
    
};

export default InitWebRoutes;
