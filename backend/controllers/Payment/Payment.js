const express = require("express");
const Stripe = require("stripe");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env

const app = express(); // Server

// Enable CORS to allow cross-origin requests from the frontend
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

const stripe = Stripe(
  "sk_test_51QpZvlBSsNFuZuxGxTx69Exqb3wvGGWrwwoMP4ZJX3qrkCZW8ydmUxYxagK4wRON4G8zYGVtxlcwGWsBm3qdZE2D00vfUdRAyt"
);

// Create a route to handle the checkout session
const CreateCheckout = async (req, res) => {
  const { products, currency, success_url, cancel_url } = req.body;

  try {
    const line_items = products.map((product) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100, // Stripe expects the amount in the smallest currency unit (cents)
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "subscription", // Make sure it's set to "subscription" for recurring payments
      success_url: success_url,
      cancel_url: cancel_url,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Session Creation Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a route to verify payment (for after the payment)
const VerifyPayment = async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    console.error("Session ID is missing");
    return res.status(400).json({ error: "Session ID is missing" });
  }

  try {
    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      console.error(`Session with ID ${sessionId} not found`);
      return res.status(404).json({ error: "Session not found" });
    }

    const orderStatus =
      session.payment_status === "paid" ? "Successful" : "Failed";

    console.log(`Order Status for Session ID ${sessionId}: ${orderStatus}`);

    // Simulating storing order details, in a production environment this should be stored in a database
    const order = {
      sessionId: sessionId,
      success: orderStatus === "Successful",
      timestamp: new Date().toISOString(),
    };

    // Log the order details to check the status
    console.log("Order details:", order);

    // Normally, you would save the order to a database here
    // For example:
    // await saveOrderToDatabase(order);

    // Send a JSON response with order status instead of redirecting (for debugging)
    res.status(200).json({ sessionId, status: orderStatus, order });
  } catch (error) {
    console.error("Error verifying payment:", error.message);

    // Send proper error response with message
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = { CreateCheckout, VerifyPayment };
