import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import SplashCursor from '../Profile/SplashCursor'
import axios from "axios";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
                amount: 5000, // Amount in cents ($50.00)
                currency: "usd",
            });

            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });

            if (error) {
                setMessage(error.message);
            } else {
                setMessage(`Payment Successful! Status: ${paymentIntent.status}`);
            }
        } catch (err) {
            setMessage("Payment failed. Please try again.");
        }

        setLoading(false);
    };

    return (
        <>
            {/* <SplashCursor /> */}
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe || loading}>
                    {loading ? "Processing..." : "Pay Now"}
                </button>
                {message && <p>{message}</p>}
            </form>
        </>
    );
};

export default CheckoutForm;
