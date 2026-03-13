const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const registration = require("../models/register_models.js");
const otpGenerator = require("otp-generator");
const sendOTP = require("../utils/send_otp.js");

const Register = async(req, res) =>{
    const {name, surname, email, contact, password} = req.body;
    
    const newModel = new registration({
        name,
        surname,
        email,
        contact,
        password
    });

    try {
        const savedUser = await newModel.save();
        res.status(200).redirect("/login_page")
    } catch (error) {
        console.log(error)
        res.status(500).json({"message": "something went wrong while registering the user"})
    }
};

const generateAccessAndRefreshToken = async (userId) => {
    try {

        const accessToken = jwt.sign(
            { id: userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn:  process.env.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            { id: userId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        await registration.findByIdAndUpdate(
            userId,
            { refreshToken: refreshToken },
            { returnDocument: "after" }
        );

        return { accessToken, refreshToken };

    } catch (error) {
        throw new Error("Token generation failed");
    }
};

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const userExists = await registration.findOne({ email });

        if (!userExists) {
            return res.status(401).send("User does not exist");
        }

        if (userExists.password !== password) {
            return res.status(401).send("Invalid password");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userExists._id);

            await registration.findByIdAndUpdate(
                userExists._id,
                { $set: { refreshToken } },
                { returnDocument: "after" }
            );
        const options = {
            httpOnly: true,
            secure: true

        };

        return res
            .status(200)
            .cookie("accesstoken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "Login successful",
                user: userExists
            });

    } catch (error) {
        console.log("Something went wrong while login");
        res.status(500).send("Login failed");
    }
};

const forgotPassword = async (req,res)=>{
    
    const {email} = req.body

    const user = await registration.findOne({email})

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    const otp = otpGenerator.generate(6,{
        lowerCaseAlphabets: false, 
        upperCaseAlphabets: false, 
        specialChars: false,
        digits: true
    })

    user.otp = otp
    user.otpExpiry = Date.now() + 60*60*1000

    req.session.email = email;

    await user.save()

    await sendOTP(email, otp);

    res.json({message:"OTP sent to email"})
}

const verifyOTP = async (req, res) => {

    const { otp } = req.body

    const email = req.session.email   // get email from session

    if(!email){
        return res.status(400).json({message:"Session expired. Try again"})
    }

    const user = await registration.findOne({ email })

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    if(user.otp !== otp){
        return res.status(400).json({message:"Invalid OTP"})
    }

    if(user.otpExpiry < Date.now()){
        return res.status(400).json({message:"OTP expired"})
    }

    res.json({message:"OTP verified"})
}

const resetPassword = async (req, res) => {

    const { newPassword } = req.body

    const email = req.session.email

    if(!email){
        return res.status(400).json({ message: "Session expired. Try again" })
    }

    const user = await registration.findOne({ email })

    if(!user){
        return res.status(404).json({ message: "User not found" })
    }

    user.password = newPassword
    user.otp = null
    user.otpExpiry = null

    await user.save()

    res.status(200).json({ message: "Password updated" })

}

module.exports = { Register, userLogin, forgotPassword, verifyOTP, resetPassword};