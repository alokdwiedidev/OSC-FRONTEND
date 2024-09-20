import React from 'react'
import "./CartPrice.css"

const CartPrice = (props) => {
    const {totalCartPrice, increasedValue, cart} = props
  return (
    <div className='cart-price-root'>
        <h4>Amount Details</h4>
        <div className='cart-price-data'>
            <p>Price ({cart.length} items)</p>
            <p>₹ {totalCartPrice}</p>
        </div>
        <div className='cart-price-data'>
            <p>Discount</p>
            <p className='discount'>-₹{parseInt(increasedValue - totalCartPrice)}</p>
        </div>
        <div className='cart-price-data'>
            <p>Delivery Charges</p>
            <p className='free-text-style'>Free</p>
        </div>
        <div className='cart-price-data'>
            <p className='total'>Total</p>
            <p className='total-cart-price'>{totalCartPrice}</p>
        </div>
    </div>
  )
}

export default CartPrice