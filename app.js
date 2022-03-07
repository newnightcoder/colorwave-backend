import cors from "cors";
import "dotenv/config";
import express from "express";
import { customAlphabet } from "nanoid";
import * as path from "path";
import stripe from "stripe";
const __dirname = path.resolve();

const app = express();
const stripeConnexion = stripe(`${process.env.STRIPE_SECRET_KEY}`);

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const PORT = process.env.PORT || 4242;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// frontend is now deployed on netlify so no need to serve front from backend app:

// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

app.get("/stripe", (req, res, next) => {
  console.log("stripe key request");
  res.json({ key: process.env.STRIPE_PUBLIC_KEY });
});

app.get("/commerce", (req, res, next) => {
  console.log("commerce key request");
  res.json({ key: process.env.REACT_APP_CHEC_KEY });
});
app.get("/success", (req, res, next) => {
  console.log("success page");
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

app.post("/payment-intent-secret", async (req, res) => {
  //PAYMENT INTENT CREATION
  const paymentIntent = await stripeConnexion.paymentIntents.create({
    amount: 2000,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log("request received!");
  res.json({ clientSecret: paymentIntent.client_secret });
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

// switch (process.env.NODE_ENV) {
//   case "production":
//     {
//       app.use(express.static(path.resolve(__dirname, "./client/build")));
//       app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
//       });
//     }

//     break;
//   case "development": {
//     app.use(express.static(path.resolve(__dirname, "./client/public")));
//     app.get("/", (req, res) => {
//       res.sendFile(path.resolve(__dirname, "./client/public", "index.html"));
//     });
//   }

//   default:
//     break;
// }
