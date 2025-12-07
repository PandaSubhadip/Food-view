const express = require('express');
  require('dotenv').config();
    const app = express();
    
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Import Routes
    const authRoute = require('./routes/authRoute');

    // Route Middlewares
    app.use('/api/v1', authRoute);
    // Print userAuth available routes
    console.log(`http://localhost:3000/api/v1/register`);
    console.log(`http://localhost:3000/api/v1/login`);
    console.log(`http://localhost:3000/api/v1/logout`);


    app.get('/',(req,res)=>{
        res.send("API is running...");
    })




    module.exports = app;

