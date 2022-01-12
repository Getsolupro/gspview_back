
import Connection from "../config/connectDB.js";
import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt"


const CreateNewUser=(user)=>{
  return new Promise( async (resolve, reject)=>{
        try {
            let check=await checkEmailUser(user.email);
           console.log(check);
           if(check){
            reject(` Cet email " ${user.email}" existe deja `)
           }else{
                // Crypter le mot de passe
                let salt=bcryptjs.genSaltSync(10);
                let data={
                    email:user.email,
                    password:bcryptjs.hashSync(user.password,salt)
                };
                Connection.query(
                    "INSERT INTO users set ?", data, function(errors, row){
                        if(errors){
                            reject(errors);
                        }
                        resolve("Nouveau utilisateur crée vaec succès");
                    }
                )
           }
        } catch (error) {
            reject(error);
        }
  });
}

let checkEmailUser=(email)=>{
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
    CreateNewUser
}