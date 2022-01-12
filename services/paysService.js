import Connection from "../config/connectDB.js";
import passport from "passport";
import { response } from "express";


const CreateUser = (req, res) => {
    try {
        Connection.query(
            "SELECT * FROM pays where code=? "
            , req.code,
            function (error, result) {
                if (result.length>0) {
                    return res.send(
                        {
                            "statut":401, "erreur":"Ce pays existe dejà"
                        }
                    )
                }
                else{
                    let data={
                        code:req.body.code,
                        libelle:req.body.libelle,
                        date_update:req.body.date_update.parse(),
                        active:true
                    };
                    Connection.query(
                        "INSERT INTO pays set ?", data, function(errors, row){
                            if(errors){
                                return res.send(
                                    {
                                        "statut":504, "erreurServeur":"Le serveur n'a pas repondu"       
                                    }
                                )
                            }
                            return res.send(
                                {
                                    "statut":201,
                                    "data":data
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

export default {
    CreatePays
}