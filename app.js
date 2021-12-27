import cors from "cors";
import "dotenv/config";
import express from "express";
import stripe from "stripe";

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stripeConnexion = stripe(`${process.env.STRIPE_SECRET_KEY}`);

app.post("/payment-intent-secret", async (req, res) => {
  const paymentIntent = await stripeConnexion.paymentIntents.create({
    amount: 2000,
    currency: "eur",
    payment_method_types: ["card", "sepa_debit"],
    // automatic_payment_methods: {
    //   enabled: true,
    // },
  });
  console.log("request received!");
  res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(PORT, (err) => {
  if (err) return console.log(`oops! problem: ${err.message}`);
  console.log(`listening on port ${PORT}`);
});
