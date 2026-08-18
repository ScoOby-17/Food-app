import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//placeing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: true  // ← seedha true kar do — no payment gateway
    })

    await newOrder.save()
    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({
      success: true,
      message: "Order Placed Successfully"
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: "Error in placeOrder controller"
    })
  }
}

//user orders for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error);
        
        res.json({
            success:false,
            message:"Error in userORders controller"
        })
    }
}


//Listig orders for amin panel
const listOrders  = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error in listOrders controller"
        })
    }
}

//api for updating order status
const updateStatus = async(req,res)=>{
    try {
        const {orderId , status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId , {status})
        return res.json({
            success:true,
            message:"Order status updated"
        })
    } catch (error) {
        console.log(error);
        
        return res.json({
            success:false,
            message:"error in updateStatus controller"
        })
    }
}


export {placeOrder , userOrders , listOrders , updateStatus}