import Connection from "../config/connectDB.js";
import passport from "passport";
import { response } from "express";
import moment from "moment";


const CreateAdresse = (adresse, res) => {
    try {
        Connection.query(
            "SELECT * FROM adresse where telephone1=? "
            , adresse.telephone1,
            function (error, result) {
                if (result.length>0) {
                    return res.send(
                        {
                            "statut":401, "erreur":"Cette adresse existe existe dejà"
                        }
                    )
                }
                else{
                    let data={
                        code_postale:adresse.code_postale,
                        telephone1:adresse.telephone1,
                        telephone2:adresse.telephone2,
                        email:adresse.email,
                        ville:adresse.ville,
                        date_update:moment().format().toString(),
                        active:true,
                        pays_id:adresse.pays_id
                    };
                    Connection.query(
                        "INSERT INTO adresse set ?", data, function(errors, row){
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
    CreateAdresse
}