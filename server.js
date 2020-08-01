const express= require('express');
const morgan=require("morgan");
const cors=require('cors');
const connectToMongoose=require("./config/db");
const colors=require('colors');
const app=express();

require("dotenv").config({path:'./config/config.env'});

connectToMongoose(); // connect to mongodb

const PORT = process.env.PORT || 8000;

const transactionRoutes=require("./routes/transactions");

app.use(express.json());

if (process.env.NODE_ENV == "development") {
    app.use(cors({ origin: `http://localhost:3000` }));
    app.use(morgan("dev"));
}

app.use("/api/transactions",transactionRoutes);

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server started at ${PORT}`.yellow.bold);
});