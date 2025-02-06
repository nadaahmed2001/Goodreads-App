import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51QpZvlBSsNFuZuxGQW6OnaaywnqX7cyzgN4bISMPgs0RAhpiDlRYZgM0AP11zsazd4CjMDjhgJMEP9MpKIDXuIFP00guzWXrqA");

const CheckoutPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default CheckoutPage;
