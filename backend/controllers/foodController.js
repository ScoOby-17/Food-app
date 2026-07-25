import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res)=>{
    let image_fileName = `${req.file.filename}`
    const {name , description , price , image , category} = req.body

    const food = new foodModel({
        name:name,
        description:description,
        price:price,
        image: image_fileName,
        category:category
    })

    try{
        await food.save();
        console.log("Food added")
        res.json({
            success:true,
            message:"Food added"
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Error in addFood controler function"
        })
    }
}

// all food list
const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({
            success:true,
            data:foods
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error in listFood controler function"
        })
    }
}

//remove food item
const removeFood = async (req,res)=>{
    try {
        const {id} = req.body
        const food = await foodModel.findById(id)
        fs.unlink(`uploads${food.image}` , ()=>{})
        await foodModel.findByIdAndDelete(id)
        res.json({
            success:true,
            message:"Food removed",
            deleted_Data:food
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error in removeFood controller funcation"
        })
    }
}

export {addFood , listFood , removeFood}
