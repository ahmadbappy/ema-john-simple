import React from 'react';
import './Review.css'
import { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const placeOrder = () => {
        // console.log('place Order');
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }

    const removeProduct = (productKey) => {
        // console.log('Remove clicked', productKey);
        const newcart = cart.filter(pd => pd.key !== productKey)
        setCart(newcart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart()
        const productkeys = Object.keys(savedCart)
        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key]
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts)
    }, [])

    let thankYou
    if (orderPlaced)
        thankYou = <img src={happyImage} alt="" />

    return (
        <div className="review-container">
            {/* <h2>Cart Items: {cart.length} </h2> */}
            <div className="product-container">
                {
                    cart.map(pd =>
                        <ReviewItem
                            key={pd.key}
                            removeProduct={removeProduct}
                            product={pd}>
                        </ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button
                        className="main-button"
                        onClick={placeOrder}
                    >Place Order</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;