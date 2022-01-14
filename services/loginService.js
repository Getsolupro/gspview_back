///import Connection from "../config/connectDB";
import Connection from "../config/connectDB.js";
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt"
import passport from "passport";
import { response } from "express";


const LoginUser = (req, res, user) => {

    try {
        Connection.query(
            "SELECT * FROM users where email=? "
            , user.email,
            function (error, result) {
                if (error) {
                    reject(error);
                    console.log(error);
                }
                if (result.length > 0) {
                    bcryptjs.compare(user.password,
                        result[0].password,
                        (error, response) => {
                            if (response) {
                                req.session.user = result;
                                Connection.query(
                                    "SELECT DISTINCT code FROM profile INNER JOIN user_profile_privilege ON profile.id = user_profile_privilege.profile_id ",
                                    (error, result2)=>{
                                        if(error){
                                            console.log(error);
                                        }
                                       let data={};
                                       if(result){
                                            data.profile=result2[0].code;
                                            data.email=user.email;
                                            
                                       }
                                        const accessToken = Jwt.sign(result[0], process.env.ACCES_TOKEN_SECRET, { expiresIn: '1800s' });
                                        const refreshToken = Jwt.sign(result[0], process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
                                        return res.send({ "status": 200, "data":data, accessToken,refreshToken });
                                    }
                                )
                            }
                            else {
                                return res.send({ "status": 401, "erreur": " Mot de passe incorrects" });
                            }
                        }
                    );
                }
                else {
                    return res.send({ "status": 401, "erreur": " Mot de passe ou email incorrects " });
                }
            }
        )
    } catch (error) {
        reject(error);
        console.log("erreur");
    }
}

const RefreshToken=(req, res, user)=>{
    const authHeaders=req.headers["authorization"];
    const token=authHeaders && authHeaders.split(' ')[1];
    if(!token){
       return res.sendStatus(401);
    }
    Jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user)=>{
        if(error){
            return res.sendStatus(401);
        }
        delete user.iat;
        delete user.exp;
        // Verifier en bd que le user existe toujours et qu'il a toujours les droits 
        const refreshToken = Jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: '1800s' });
        return res.send({
            "statut":200,
            accessToken:refreshToken
        });                     
    })
}

export default {
    LoginUser,
    RefreshToken
}