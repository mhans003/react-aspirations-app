//Create Express App.
require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Set up Cookie Parser.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Configure Mongoose.
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/aspirations-mh", 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

//Include Routes
const userRouter = require("./routes/User");
app.use("/user", userRouter);

//Start Server
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}!`);
});