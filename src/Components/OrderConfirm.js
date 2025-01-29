import React from 'react';
import { useLocation } from 'react-router-dom';

function OrderConfirm() {
    const location = useLocation();
    const { cartItems, total } = location.state || { cartItems: [], total: 0 };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h1 className="text-center text-primary">Order Confirmation</h1>

                {cartItems.length === 0 ? (
                    <p className="text-center text-danger">Your order is empty.</p>
                ) : (
                    <div>
                        <h2 className="mt-4">Order Details:</h2>
                        <div className="list-group">
                            {cartItems.map(item => (
                                <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{item.appDTO.title}</h5>
                                        <p className="mb-0">Quantity: <strong>{item.quantity}</strong></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-success">Order Total: ${total}</h3>
                            <p className="lead text-muted">Thank you for your purchase!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderConfirm;
