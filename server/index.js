 //Express
 const express = require('express');
 const app = express();
 const morgan = require('morgan'); 
 const bcrypt = require('bcryptjs');
 const cors = require('cors'); 
 // ENV
 require('dotenv').config();
 // CORS
 const corsOptions = {
     origin: "*"
 };
 
 // Middlewares
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());
 app.use(cors(corsOptions));
 app.use(morgan('dev'));

// Routes
 
 /* Generate migration
 const createTables = false;
 db.sequelize.sync({createTables: forzar}).then(async () => {
     try {
         if(createTables){
         }
         console.log("DATABASE CONNECTED...");
     } catch(error){
         console.log(error);
     }
 });*/
 
 app.listen(3001, (err) => {
     if(err){
         console.log(err);
         process.exit(1);
     }
     console.log(process.env.DB_PASS);
     console.log('Server running');
 });
 