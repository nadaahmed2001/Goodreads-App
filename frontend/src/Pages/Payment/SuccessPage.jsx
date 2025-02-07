import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get('session_id');

        if (sessionId) {
            fetch(`http://localhost:5000/verify-payment?session_id=${sessionId}`)
                .then(response => response.json())
                .then(data => setOrder(data))
                .catch(error => console.error('Error:', error));
        }
    }, []);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Payment Status: {order.status}</h1>
            <p>Order Details: {JSON.stringify(order)}</p>
        </div>
    );
};

export default SuccessPage;
