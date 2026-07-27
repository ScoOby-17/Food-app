import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login controller
const loginUser = async(req , res)=>{
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                success:false,
                message : "User dosen't exists"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.json({
                success : false,
                message : "Wrong password"
            })
        }

        const token = crateToken(user._id)
        return res.json({
            success : true,
            token,
            message : "Login successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message: "erro occure in loginUser Controller function"
        })
    }
}

// create JWT token
const crateToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRRT)
}

//register controller
const registerUser = async(req,res)=>{
    const {name , email , password} = req.body
    
    try {
        // checking is user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({
                success:false,
                message:"User already registerd by this email"
            })
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter valid email"
            })
        }

        if(password.length < 8){
            return res.json({
                success:false,
                message:"Please enter strong password"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        })

        const user = await newUser.save()
        const token = crateToken(user._id)
        res.json({
            success:true,
            token
        })

    } catch (error) {
        return res.json({
            success:false,
            message:"Error in reqister user controller"
        })
    }
}

export {loginUser , registerUser}