import userModel from "../models/userModel.js"


//item add to cart
const addToCart = async(req , res)=>{
    try {
        const {userId} = req.body
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId , { cartData })
        return res.json({
            success:true,
            message:"Added to Cart"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in addToCar controller"
        })
    }
}


//remove from cart
const removeFromCart = async(req,res)=>{
    try {
        const {userId , itemId} = req.body
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if(cartData[itemId] > 0){
            cartData[itemId] -= 1
            if(cartData[itemId] == 0){
                delete cartData[itemId]
            }
        }else{
            return res.json({
                success:false,
                message:"item quantity is alreay 0"
            })
        }

        await userModel.findByIdAndUpdate(userId , {cartData})
        return res.json({
            success:true,
            message:"Removed form cart"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"Errro is removeFromCart controller"
        })
    }
}

//fetch user cart data
const getCart = async(req,res)=>{
    try {
        const {userId} = req.body
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        return res.json({
            success:true,
            cartData
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"Error in getCart controller"
        })
    }
}

export {addToCart , removeFromCart , getCart}