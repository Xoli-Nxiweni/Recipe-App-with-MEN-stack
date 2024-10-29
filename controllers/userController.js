import bcrypt from "bcrypt"
import User from "../models/user.js";
import generateToken from "../utils/index.js";

const registerUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const userExists = await User.findOne({email})
        userExists ? res.status(400).json({
            error: "User already exists"
        }) : undefined;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user  = await User.create({
            email,
            password: hashedPassword,
            role: 'user'
        })

        res.status(200).json({
            _id: user._id,
            email: user.email
        })
    } catch (error) {
       if(error.name === "ValidationError"){
        res.status(400).json({error: error.message})
       } else{
        res.status(500).json({ error: error.mesage})
       }
}};

// const loginUser = async (req, res) =>{
//     try {
//         const {email, password} = req.body;
//         const user = await User.findOne({email})

//         if(!user || !(await user.matchPasswords(password))){
//             return res.status(401).json({
//                 error: "Invalid Login Credentials"
//             });
//         }

//         const token = await generateToken(user._id)
//         res.status(200).json({
//             _id: user._id,
//             email: user.email,
//             role: user.role,
//             token,
//         })
//     } catch (error) {
//         return res.status(500).json({error: "Internal server error!"})
//     }
// }

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if the user exists and if the password matches
        if (!user || !(await user.matchPasswords(password))) {
            return res.status(401).json({
                error: "Invalid Login Credentials"
            });
        }

        // Generate a token for the user
        const token = await generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token,
        });
        // getId(user._id)
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        return res.status(500).json({ error: error.message || "Internal server error!" });
    }
};



export default {
    registerUser,
    loginUser
}