import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";



export const CheckoutForm = ({ amount }) => {

    const [isDisable, setIsDisable] = useState(false)
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            setIsDisable(true)
            if (!stripe || !elements) {
                alert("server error")
                return;
            }

            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'https://localhost:3000'
                }, redirect: "if_required"

            })
            if (result.error) {
                console.log(result.error)
                setIsDisable(false)
                alert(result.error.message)
            } else {
                console.log(result)
                alert(result.paymentIntent.status)
                navigate("/")
            }
        }


        catch (error) {
            console.log("CheckoutForm.js 28 | ", error);
        }
    };

    return (
        <div>
            <h2 style={{ backgroundColor: "#2278e6", padding: "20px", textAlign: "center", borderRadius: "20px 20px 0px 0px ", margin: "8px 0px", color: "#393939" }}>Stripe Payment</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#2278e6", padding: "50px", borderRadius: "0px 0px 20px 20px" }}>
                <PaymentElement />
                <button disabled={!stripe || isDisable} style={{ backgroundColor: "#fbe452", outline: "none", border: "none", borderRadius: "5px", fontSize: "16px", padding: "12px", cursor: "pointer", fontWeight: 550, color: "#393939" }}>
                    {!isDisable ? `PAY ${amount} rs` : "Loading..."}
                </button>
            </form>
        </div>
    );
};