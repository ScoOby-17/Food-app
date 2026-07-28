import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placeing user order from frontend
const placeOrder = async(req,res)=>{

    const frontend_url = "http://localhost:5173"

    try {
        const {userId , items , amount , address} = req.body
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId , {cartData:{}})

        const line_items = items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100 * 95 //95 is 1 doller into indian ruppees
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*95  //95 is 1 doller into indian ruppees
            },
            quantity:1
        })
        

        //if payment successful redirest or success_url else redirect to cancel_url
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({
            success:true,
            session_url:session.url
        })

    } catch (error) {

        return res.json({
            success:false,
            message:"Error in placeOrder controller"
        })
        
    }
}


export {placeOrder}