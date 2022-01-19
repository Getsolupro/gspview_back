import dotenv from "dotenv"
if(process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import cors from "cors";
import InitWebRoutes from "./routes/api.js";
//import ConfigViewEngine from "./config/viewEngine.js";
//import Connection from "./config/connectDB.js";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import http from "http";
import fs from "fs";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use(fs())
app.use(cors());
//ConfigViewEngine(app);

// Utilisation de cookie parser
app.use(cookieParser("secret"));

//Configuration de la session cookie
app.use(session({
    key:"userId",
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
       maxAge:1000*60*60*24 // 1 jour
    }
}));

//Activer le message flash
app.use(flash());

InitWebRoutes(app);

const port=process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serveur demarré  sur le port ${port}`)
});