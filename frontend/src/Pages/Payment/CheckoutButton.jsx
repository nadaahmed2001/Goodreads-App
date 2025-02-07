// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import Button from "react-bootstrap/Button";

// // Load Stripe.js
// const stripePromise = loadStripe("pk_test_51QpZvlBSsNFuZuxGQW6OnaaywnqX7cyzgN4bISMPgs0RAhpiDlRYZgM0AP11zsazd4CjMDjhgJMEP9MpKIDXuIFP00guzWXrqA");

// const CheckoutButton = () => {
//     const handleClick = async () => {
//         try {
//             const stripe = await stripePromise;
//             if (!stripe) {
//                 console.error("Stripe failed to initialize.");
//                 return;
//             }

//             // Call backend to create a Checkout session for subscription
//             const { data } = await axios.post(
//                 "http://localhost:5000/create-checkout-session",
//                 {
//                     products: [{ title: "Subscription", price: 100, quantity: 1 }],
//                     currency: "USD",
//                     success_url: "http://localhost:3000/success",  // Ensure this URL is correct
//                     cancel_url: "http://localhost:3000/cancel",    // Ensure this URL is correct
//                 }
//             ).catch(error => {
//                 console.error("Backend Error:", error.response?.data || error.message);
//             });

//             if (!data || !data.id) {
//                 console.error("Invalid session data:", data);
//                 return;
//             }

//             // Redirect to Stripe Checkout
//             const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

//             if (error) {
//                 console.error("Stripe Checkout error:", error);
//             }
//         } catch (error) {
//             console.error("Error creating checkout session:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <Button className="button-85" role="button" onClick={handleClick}>
//             Subscribe
//         </Button>
//     );
// };

// export default CheckoutButton;
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
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

            // Hardcoded session ID for testing
            const sessionId = "cs_test_a1ycvwuFapMvqRZwID"; // Replace with a valid test session ID if available

            // Redirect to Stripe Checkout with the session ID
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error("Stripe Checkout error:", error);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return <Button className="button-85" role="button" onClick={handleClick}> Subscribe</Button>;
};

export default CheckoutButton;
