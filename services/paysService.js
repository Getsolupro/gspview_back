import Connection from "../config/connectDB.js";
import passport from "passport";
import { response } from "express";
import moment from "moment";


const CreatePays = (pays, res) => {
    try {
        Connection.query(
            "SELECT * FROM pays where code=? "
            , pays.code,
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
                        code:pays.code,
                        libelle:pays.libelle,
                        date_update:moment().format().toString(),
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