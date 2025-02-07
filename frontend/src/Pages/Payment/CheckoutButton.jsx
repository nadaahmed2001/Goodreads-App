import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Button from "react-bootstrap/Button";

// Load Stripe.js
const stripePromise = loadStripe("pk_test_51QpZvlBSsNFuZuxGQW6OnaaywnqX7cyzgN4bISMPgs0RAhpiDlRYZgM0AP11zsazd4CjMDjhgJMEP9MpKIDXuIFP00guzWXrqA");

const CheckoutButton = () => {
    const handleClick = async () => {
        try {
            const stripe = await stripePromise;
            if (!stripe) {
                console.error("Stripe failed to initialize.");
                return;
            }

            // Call backend to create a Checkout session
            const { data } = await axios.post(
                "http://localhost:5000/create-checkout-session",
                {
                    products: [{ title: "Subscription", price: 100, quantity: 1 }],
                    currency: "USD",
                    success_url: "http://localhost:3000/success",
                    cancel_url: "http://localhost:3000/cancel",
                }
            );

            // Redirect to Stripe Checkout
            stripe.redirectToCheckout({ sessionId: data.id }).then((result) => {
                if (result.error) {
                    console.error("Stripe Checkout error:", result.error);
                }
            });
        } catch (error) {
            console.error("Error creating checkout session:", error.response?.data || error.message);
        }
    };

    return <Button onClick={handleClick}>Pay Now</Button>;
};

export default CheckoutButton;
