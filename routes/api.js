import express from "express";
import GetLogin from "../controllers/loginController.js";
//import RegisterUser from "../controllers/registerController.js";

import registerController from "../controllers/registerController.js";
import authValidation from "../valiation/authValidation.js";
import loginController from "../controllers/loginController.js";
import passport from "passport";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
//import AuthenficateToken from "../middleware/AuthMiddleware.js";


const router = express.Router();

const InitWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("homepage")
    });
  
    router.get("/getUsers", registerController.RegisterUser);
    router.post("/createUser", authValidation.ValidateRegister, registerController.CreateUser);
    router.post("/loginUser",authValidation.ValidateAuthentification, loginController.LoginUser);
   // router.post("/refreshToken", AuthMiddleware.AuthenficateToken,loginController.RefreshToken);
   router.post("/refreshToken",loginController.RefreshToken);
    return app.use("/", router);
    
};

export default InitWebRoutes;
