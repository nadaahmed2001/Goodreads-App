import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        console.log("Session ID:", sessionId); // Debugging log

        if (sessionId) {
            fetch(`http://localhost:5000/verify-payment?session_id=${sessionId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Order Data:", data); // Debugging log
                    setOrder(data);
                })
                .catch(error => console.error('Error fetching order:', error));
        } else {
            console.error("No session_id found in URL");
        }
    }, []);

    if (!order) {
        return <div className="loading">Processing Payment...</div>;
    }


    return (
        <div className="success-container">
            <div className="success-card">
                <h1>✅ Payment Successful!</h1>
                <p className="success-message">Thank you for your purchase.</p>
                <p className="order-details">Order Details: <strong>Premium Subscription</strong></p>
                <button onClick={() => { navigate('/'), window.location.reload() }} className="home-button">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
