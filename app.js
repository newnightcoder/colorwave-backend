import cors from "cors";
import "dotenv/config";
import express from "express";
import { customAlphabet } from "nanoid";
import * as path from "path";
import stripe from "stripe";
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 4242;
//test
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

const stripeConnexion = stripe(`${process.env.STRIPE_SECRET_KEY}`);

app.get("/stripe", (req, res, next) => {
  res.send({ key: process.env.STRIPE_PUBLIC_KEY });
});

app.post("/payment-intent-secret", async (req, res) => {
  //PAYMENT INTENT CREATION
  const paymentIntent = await stripeConnexion.paymentIntents.create({
    amount: 2000,
    currency: "eur",
    // payment_method_types: ["card", "apple_pay"],
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log("request received!");
  res.send({ clientSecret: paymentIntent.client_secret });
});

app.post("/user-order", (req, res, next) => {
  const order = req.body;
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const orderId = nanoid();
  res.json({ ...order, orderId });
});

app.listen(PORT, (err) => {
  if (err) return console.log(`oops! problem: ${err.message}`);
  console.log(`listening on port ${PORT}`);
});
