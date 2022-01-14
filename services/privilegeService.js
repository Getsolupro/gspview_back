import Connection from "../config/connectDB.js";
import moment from "moment";

const CreatePrivilege = (privilege, res) => {
    try {
        Connection.query(
            "SELECT * FROM privilege where code=? "
            , privilege.code,
            function (error, result) {
                if (result.length>0) {
                    return res.send(
                        {
                            "statut":401, "erreur":"Ce privilege existe existe dejà"
                        }
                    )
                }

                else{
                    let data={
                        libelle:privilege.libelle,
                        description:privilege.description,
                        code:privilege.code,
                        active:true,
                        date_update:moment().format().toString(),
                    };
                    Connection.query(
                        "INSERT INTO privilege set ?", data, function(errors, row){
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

const read=(req, res)=>{
    try {
        Connection.query(
            "SELECT * FROM privilege where active=? ",true, function(errors,result){
                if(errors){
                    return res.send(
                        {
                            "statut":504, "erreurServeur":"Le serveur n'a pas repondu"       
                        }
                    )
                }
                return res.send(
                    {
                        "statut":200,
                        "data":result
                    }
                )
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
    CreatePrivilege, 
    read
}