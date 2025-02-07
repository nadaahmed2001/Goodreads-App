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

            // Call the backend to create a Stripe Checkout session
            const { data } = await axios.post("http://localhost:5000/create-checkout-session", {
                subscription: { title: "Premium Subscription", price: 100 }, // Fix the object format
                currency: "USD",
                success_url: `${window.location.origin}/SuccessPage?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${window.location.origin}/CancelPage`,
            });

            if (!data?.id) {
                console.error("Invalid session data:", data);
                return;
            }

            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

            if (error) {
                console.error("Stripe Checkout error:", error);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error.response?.data || error.message);
        }
    };

    return (
        <Button className="button-85" role="button" onClick={handleClick}>
            Subscribe
        </Button>
    );
};

export default CheckoutButton;
