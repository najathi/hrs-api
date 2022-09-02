// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const app = express();
// const authRoute = require("./routes/auth");
// const authUsers = require("./routes/users");
// const hotelsRoute = require("./routes/hotels");
// const authRooms = require("./routes/rooms");

import 'dotenv/config';

import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
})

app.get("/", (req, res) => {
    res.send("hello first request!")
});

// middlewares - to prevent too much code in index.js so separate route folder is created.
// creating middleware

// app.use(cors({ origin: "http://localhost:3000", method: "GET" }))
app.use(cors())

//to use json - sending by the user in post request
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//Error Handler Middleware 
app.use((err, req, res, next) => {

    const errorStatus = err.status || 500
    const errorMessage = err.errorMessage || "Something went wrong!"

    //handling error and responding to the client request. (sending error to client side)
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        messsage: errorMessage,
        stack: err.stack, //it will give more detail about stack
    });

    // next(); // next is callback function

});

app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected to Backend!")
})