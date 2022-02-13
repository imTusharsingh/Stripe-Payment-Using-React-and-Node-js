import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "../Stripe/CheckoutForm";
import axios from "axios";
import { useParams } from 'react-router-dom';
import MultiActionAreaCard from '../component/card';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';



const stripeTestPromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY);




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Payment = () => {
    const [clientSecret, setClientSecret] = useState()
    const [cardAmount, setCardAmount] = useState()
    const [product, setProduct] = useState()
    const params = useParams()
    const id = parseInt(params.id)

    useEffect(() => {
        axios.post("http://localhost:8000/stripe/charge", { id: id })
            .then(res => {
                setClientSecret(res.data.clientSecret)
                setCardAmount(res.data.amount)
                setProduct(res.data.product)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const appearance = {
        variables: {
            colorPrimary: '#0570de',
            colorBackground: '#ffffff',
            colorText: 'black',
            colorDanger: '#df1b41',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            spacingUnit: '2px',
            borderRadius: '4px',
        },
        rules: {
            '.Label': {
                color: "black",
                fontWeight: "bold",
                padding: "5px 0px"
            }
        }
    };

    return (
        <>

            {product &&

                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ height: "100vh", backgroundColor: "#cfd8e4" }}
                >
                    <Grid sx={{ margin: "8px 12px" }} >
                        <MultiActionAreaCard id={product.id} name={product.name} price={cardAmount} img={product.img} btn={"not"} />
                    </Grid>

                    <Grid sx={{ margin: "8px 12px" }}  >
                        {(clientSecret) &&
                            <>
                                <Elements stripe={stripeTestPromise} options={{ clientSecret, appearance }}  >
                                    <CheckoutForm amount={cardAmount} />
                                </Elements>
                            </>
                        }

                    </Grid>

                </Grid>
            }
        </>

    )
}

export default Payment