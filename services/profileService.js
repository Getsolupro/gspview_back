import Connection from "../config/connectDB.js";
import passport from "passport";
import { response } from "express";
import moment from "moment";


const CreateProfile = (profile, res) => {
    try {
        Connection.query(
            "SELECT * FROM profile where code=? "
            , profile.code,
            function (error, result) {
                if (result.length>0) {
                    return res.send(
                        {
                            "statut":401, "erreur":"Ce profile existe existe dejà"
                        }
                    )
                }

                else{
                    let data={
                        libelle:profile.libelle,
                        description:profile.description,
                        code:profile.code,
                        active:true,
                        date_update:moment().format().toString(),
                    };
                    Connection.query(
                        "INSERT INTO profile set ?", data, function(errors, row){
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
    CreateProfile
}