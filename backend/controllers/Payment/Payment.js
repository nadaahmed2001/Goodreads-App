const Stripe = require("stripe");
const dotenv = require("dotenv");
const UserModel = require("../../models/User");

dotenv.config(); // Load environment variables from .env

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variable

const CreateCheckout = async (req, res) => {
  const { subscription, currency, success_url, cancel_url, user_email } =
    req.body;

  try {
    // Ensure subscription is an array
    const line_items = Array.isArray(subscription)
      ? subscription.map((product) => ({
          price_data: {
            currency: currency || "usd",
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100, // Convert to cents
          },
          quantity: product.quantity || 1,
        }))
      : [
          {
            price_data: {
              currency: currency || "usd",
              product_data: {
                name: subscription.title,
              },
              unit_amount: subscription.price * 100, // Convert to cents
            },
            quantity: 1,
          },
        ];

    const mode = subscription.isRecurring ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: mode,
      customer_email: user_email, // ✅ Pass user email to identify them later
      success_url: success_url,
      cancel_url: cancel_url,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Session Creation Error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

const VerifyPayment = async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is missing" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const orderStatus =
      session.payment_status === "paid" ? "Successful" : "Failed";
    // console.log("Stripe Session Data:", session); // el session Fagr mot

    if (orderStatus === "Successful") {
      const userEmail = session.customer_details.email; // ✅ Get user email from Stripe
      // console.log("User Email from Stripe:", userEmail);

      if (userEmail) {
        const user = await UserModel.findOne({ email: userEmail });
        // console.log("User Found in DB:", user);
          
        if (user) {
          const updatedUser = await UserModel.findOneAndUpdate(
            { email: userEmail },
            { $set: { subscription: "Active" } },
            { new: true }
          );
          
          console.log("✅ User Subscription Updated:", updatedUser);
          res.status(200).json({ sessionId, status: orderStatus });
        } else {
          res.status(200).json({ sessionId, status: "Failed" });
          console.error("❌ User not found in DB!");
        }
      }
    }

    
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = { CreateCheckout, VerifyPayment };
