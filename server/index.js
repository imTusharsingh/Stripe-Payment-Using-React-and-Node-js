const express = require('express');

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv').config()
const storedProducts = require('./products')

const stripe = require('stripe')(process.env.SECERET_KEY)
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/products", (req, res) => {
    res.send(storedProducts)
})

app.post("/stripe/charge", async (req, res) => {
    let { id } = req.body;

    // console.log("stripe-routes.js 9 | route reached", req.body);

    console.log("stripe-routes.js 10 | amount and id", id);
    const product = storedProducts.find((product) => product.id === id)
    console.log(product)
    try {
        const { client_secret, amount } = await stripe.paymentIntents.create({
            amount: product.price * 100,
            currency: "INR",
            description: product.description,
            payment_method_types: ['card'],
        });

        res.json(
            { clientSecret: client_secret, amount: amount / 100, product }
        );
    } catch (error) {
        console.log("stripe-routes.js 17 | error", error);
        res.json({
            message: "Payment Failed",
            success: false,
        });
    }
});
console.log(process.env.SECERET_KEY)

app.listen(process.env.PORT || 8000, () => {
    console.log("Server started...");
});