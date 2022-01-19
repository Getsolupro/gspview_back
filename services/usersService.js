import Connection from "../config/connectDB.js";
import moment from "moment";

const CreateUser = (user, res) => {
    try {
        Connection.query(
            "SELECT * FROM users where email=? "
            , adresse.email,
            function (error, result) {
                if (result.length>0) {
                    return res.send(
                        {
                            "statut":401, "erreur":"Cette utilisateur existe existe dejà"
                        }
                    )
                }
                else{
                    let data={
                        email:user.email,
                        
                        date_update:moment().format().toString(),
                        active:true,
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

const ReadById=(id, res)=>{
    try {
        Connection.query("SELECT * FROM users WHERE id=?", id, 
            function(err, result){
                if(err){
                    console.log(err);
                    return
                }
                return res.send(
                    {
                        "statut":200,
                        "data":result[0],
                        success:true
                    }
                )

            }
        )
    } catch (error) {
        
    }
}

export default {
    CreateUser
}