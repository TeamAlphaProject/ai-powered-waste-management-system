const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const route = require("./src/routes/auth_routes.js");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const session = require("express-session");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", route);

app.use("/css", express.static(path.join(__dirname, "../frontend/css")));

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/index.html"));
});

app.get("/login_page", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});

app.get("/register_page", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/register.html"));
});

app.get("/user_dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/user_dashboard.html"));
});

app.get("/report_waste", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/report_waste.html"));
});

app.get("/admin_dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/admin_dashboard.html"));
});

mongoose.connect("mongodb+srv://artofank_db_user:PaJ7Gb9Fo2hnk6p3@cluster0.np01urw.mongodb.net/ecotrack?appName=Cluster0")
.then(() => {
    app.listen(process.env.PORT, () =>{
        console.log("--- Server started ---");
    })
})

// http://localhost:3001/index