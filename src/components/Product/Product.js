import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt="" />
            </div>

            <div className="product-details">
                <h4 className="product-name"><Link to={"/product/" + key}>{name}</Link></h4>
                <br />
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>{stock} left in stock !!</small></p>
                {props.showAddToCart && <button
                    className="main-button"
                    onClick={() => props.handleAddProduct(props.product)}
                ><FontAwesomeIcon icon={faCartPlus} /> Add to Cart</button>}
            </div>

        </div>
    );
};

export default Product;