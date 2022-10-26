const express = require("express");
const app = express();
const cookieParser = require ("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const cors = require ("cors")

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method : ["GET","POST"],
        credentials: true,
    })
);



app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());

// Route Import
const user = require('./routes/userRoutes');

app.use('/api/v2',user);


//MiddlewRware for Errors
app.use(errorMiddleware);



module.exports = app;