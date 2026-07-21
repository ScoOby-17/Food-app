import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {

  const {cartItme , food_list , removeFromCart} = useContext(StoreContext)
  return (
    <div>Cart</div>
  )
}

export default Cart