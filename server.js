const express= require('express');
const morgan=require("morgan");
const cors=require('cors');
const connectToMongoose=require("./config/db");
const colors=require('colors');
const path = require("path");
const compression = require("compression"); // compresses all our static files which are then unzipped by client browser
const enforce = require("express-sslify");


const app=express();

const transactionRoutes = require("./routes/transactions");

require("dotenv").config({path:'./config/config.env'});

connectToMongoose(); // connect to mongodb

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: `http://localhost:3000` }));
    app.use(morgan("dev"));
}
app.use(compression());  // compresses all our static files which are then unzipped by client browser
app.use(express.json());



app.use("/api/transactions", transactionRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true })); // if anyone makes http request automatically redirected to HTTPS
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}




app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server started at ${PORT}`.yellow.bold);
});