
import Connection from "../config/connectDB.js";
import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt"
import moment from "moment";
import { response } from "express";

// methode de creation d'un nouvel utilisateur
const Create = (user, res) => {
    try {
        Connection.query(
            "SELECT * FROM users where email=? "
            , user.email,
            function (error, result) {
                if (result.length>0) {
                    return res.send(
                        {
                            "statut":401, "erreur":"Cet utilisateur existe dejà"
                        }
                    )
                }
                else{
                    // Crypter le mot de passe
                    let salt=bcryptjs.genSaltSync(10);
                    let dataUser={
                        email:user.email,
                        password:bcryptjs.hashSync(user.password,salt),
                        nom:user.nom,
                        prenom:user.prenom,
                        image_name:user.photo,
                        image_path:"/images/",
                        active:true,
                        date_inscription: moment().format().toString(),
                        date_update: moment().format().toString(),
                        date_delete:null
                    };
                    // Enregistrement des donnnees de l'utilisateur
                    Connection.query(
                        "INSERT INTO users set ?", dataUser, function(errors, response){
                            if(errors){
                                console.log(errors);
                                return;
                            }
                            Connection.query(
                                "SELECT * FROM pays where code=? ", user.pays, function(errors, pays_id){
                                    if(errors){
                                        return res.send(
                                            {
                                                "statut":504, "erreurServeur":"Le serveur n'a pas repondu"       
                                            }
                                        )
                                    }
                                    if(pays_id.length>0){
                                        console.log(pays_id);
                                        // les donnees de l'adresse a enregistrer
                                        let dataAdresse={
                                            code_postale:user.code_postale,
                                            telephone1:user.telephone1,
                                            telephone2:user.telephone2,
                                            ville:user.ville,
                                            active:true,
                                            date_update: moment().format().toString(),
                                            pays_id:pays_id[0].id,
                                            user_id:response.insertId
                                            
                                        };
                                        Connection.query(
                                            "INSERT INTO adresse set ?", dataAdresse, function(errors, result){
                                                if(errors){
                                                    console.log(errors);
                                                    return;
                                                }
                                                // Enregistrement des donnees de User profile privilege
                                                 Connection.query(
                                                    "SELECT id FROM profile where code=? ", user.profile, (errors, profile_id)=>{
                                                        if(errors){
                                                            console.log(errors);
                                                            return;
                                                        }
                                                        if(profile_id.length>0){
                                                            let dataUserProfileprivilege={
                                                                profile_id:profile_id[0].id,
                                                                date_update:moment().format().toString(),
                                                                active:true,
                                                                user_id:response.insertId
                                                            }
                                                            Connection.query(
                                                                "INSERT INTO user_profile_privilege set ? ", dataUserProfileprivilege,(err, result)=>{
                                                                    if(err){
                                                                        console.log(err);
                                                                        return;
                                                                    }
                                                                    return res.send(
                                                                       {
                                                                        "statut":200,
                                                                        "data":dataUser
                                                                       } 
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    }  
                                                )
                                            }
                                        )  
                                    }
                                }
                            )
                        }
                    )
                }
            }
        )
    } catch (error) {
        return res.send(
            {
                "statut":500, "erreurServeur":"Erreur serveurs"       
            }
        )
    }
}


const CreateNewUser=(user, res)=>{

       //////////////////
        try {

            Connection.query(
                "SELECT * FROM users where email = ?",
                user.email ,
                function(error, row){
                    if(error){
                        return res.send(
                            {
                                "statut":504, "erreurServeur":"Le serveur n'a pas repondu"       
                            }
                        )
                    }
                    if(row.length>0){
                        return res.send(
                            {
                                "statut":401, "erreur":"Ce pays existe dejà"
                            }
                        )
                    }
                } 
            )
                
                // Crypter le mot de passe
                let salt=bcryptjs.genSaltSync(10);
                let dataUser={
                    email:user.email,
                    password:bcryptjs.hashSync(user.password,salt),
                    nom:user.nom,
                    prenom:user.prenom,
                    image_name:user.photo,
                    image_path:"/images/",
                    active:true,
                    date_inscription: moment().format().toString(),
                    date_update: moment().format().toString(),
                    date_delete:null
                };
                Connection.query(
                    "INSERT INTO users set ?", dataUser, function(errors, row){
                        if(errors){
                            return res.send(
                                {
                                    "statut":504, "erreurServeur":"Le serveur n'a pas repondu"       
                                }
                            )
                        }
                       
                        userCreer=true;
                        console.log(" Valeur 1 : "+userCreer);
                    }
                );

                /////////////////

        } catch (error) {
            return res.send(
                {
                    "statut":500, "erreurServeur":"Erreur serveurs"       
                }
            )
        }
}

let checkEmailUser= (email)=>{
    return new Promise(((resolve, reject)=>{
        try {
            Connection.query(
                "SELECT * FROM users users where email = ?",
                email ,
                function(error, row){
                    if(error){
                        reject(error);
                    }
                    if(row.length>0){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                } 
            )
        } catch (error) {
            reject(error);
        }
    }))
}

export default {
    Create
}