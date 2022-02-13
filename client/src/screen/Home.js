import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MultiActionAreaCard from '../component/card'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Home = () => {
    const [products, setProducts] = useState()

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8000/products")
            console.log(res)
            setProducts(res.data)
            console.log(products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])



    return (
        <>
            <Item sx={{ flexGrow: 1, backgroundColor: "#cfd8e4" }}>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products && products.map(elem => {
                        return (
                            <Grid item xs={4} sm={4} md={3} key={elem.id}>
                                <MultiActionAreaCard id={elem.id} name={elem.name} price={elem.price} description={elem.description} img={elem.img} />
                            </Grid>
                        )
                    })}


                </Grid>

            </Item>

        </>
    )
}

export default Home

