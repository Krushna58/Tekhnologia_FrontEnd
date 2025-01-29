import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:8080/cart')
            .then(response => {
                console.log("Cart Data:", response.data);
                setCartItems(response.data);
            })
            .catch(error => console.error('Error fetching cart items:', error));
    }, []);

    const handleRemoveFromCart = (id) => {
        axios.delete(`http://localhost:8080/cart/${id}`)
            .then(() => {
                setCartItems(cartItems.filter(item => item.id !== id));
                alert('Item removed from cart');
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
                alert('Failed to remove item from cart');
            });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => 
            total + ((item.appDTO?.price) * (item.quantity || 1)), 0
        ).toFixed(2);
    };

    const handlePlaceOrder = () => {
        navigate('/order', { state: { cartItems, total: calculateTotal() } });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="alert alert-warning text-center">
                    Your cart is empty.
                </div>
            ) : (
                <div className="row">
                    {cartItems.map(item => (
                        <div key={item.id} className="col-md-6">
                            <div className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title">{item.appDTO?.title}</h3>
                                    <p className="card-text">{item.appDTO?.description }</p>
                                    <p className="fw-bold">Price: ${item.appDTO?.price }</p>
                                    <p>Total: ${(item.appDTO?.price) * (item.quantity || 1)}</p>
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="text-end mt-4">
                    <h2 className="fw-bold">Total: ${calculateTotal()}</h2>
                    <button className="btn btn-primary" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
