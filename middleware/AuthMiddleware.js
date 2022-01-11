import  Jwt  from "jsonwebtoken";

const AuthenficateToken=(req, res, next)=>{
    const authHeaders=req.headers["authorization"];
    const token=authHeaders && authHeaders.split(' ')[1];
    if(!token){
       return res.sendStatus(401);
    }
    Jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user)=>{
        if(error){
            return res.sendStatus(401);
        }
        req.user=user;
        next();
    })
}

export default {
    AuthenficateToken
};

