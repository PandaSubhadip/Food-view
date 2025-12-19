const express = require('express');
  require('dotenv').config();
    const app = express();
    const cookieParser = require('cookie-parser');
    
    
    app.use(cookieParser());
    
   app.use(express.json());
app.use(express.urlencoded({ extended: true }));


    // Import Routes
    const authRoute = require('./routes/authRoute');
    const foodRoute = require('./routes/foodRoute');

    // Route auth Middlewares
    app.use('/api/v1', authRoute);
    // Print userAuth available routes
    console.log(`http://localhost:3000/api/v1/register`);
    console.log(`http://localhost:3000/api/v1/login`);
    console.log(`http://localhost:3000/api/v1/logout`);
    console.log(`http://localhost:3000/api/v1/foodlogin`);
    // Route food Middlewares
    app.use('/api/v1/food', foodRoute);
    console.log(`http://localhost:3000/api/v1/food/upload`);
    console.log(`http://localhost:3000/api/v1/food/videos`);


    app.get('/',(req,res)=>{
        res.send("API is running...");
    })




    module.exports = app;

