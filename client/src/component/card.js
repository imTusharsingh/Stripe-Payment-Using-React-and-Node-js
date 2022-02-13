import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({ name, id, description, price, img, btn }) {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={btn ? "300" : "140"}
                    image={img}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {price}rs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {!btn &&
                    <Link to={`/payment/${id}`} style={{ textDecoration: "none" }}>
                        <Button variant='outlined' size="small" color='warning'>
                            Buy Now
                        </Button>
                    </Link>
                }
            </CardActions>
        </Card>
    );
}