import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CancelPage.css'; // Ensure you create this CSS file

const CancelPage = () => {
    const navigate = useNavigate();

    return (
        <div className="cancel-container">
            <div className="cancel-card">
                <h1>❌ Payment Cancelled</h1>
                <p>Your payment was not completed. Please try again later.</p>
                <button onClick={() => navigate('/')} className="cancel-button">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default CancelPage;
