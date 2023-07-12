import React from 'react';
import CarouselSlider from "react-carousel-slider";
import Box from "@mui/material/Box";
import {Grid, Rating} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {styled} from "@mui/material";
import {Paper} from "@mui/material";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    height: '100%',
    marginBottom: '1rem',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Main({data}) {
    const data2 = data.img.map(item => {
        return {imgSrc: item}
    })

    let sliderBoxStyle = {
        height: "250px",
        width: "100%",
        background: "tranparent"
    };

    let manner = {
        autoSliding: {interval: "2s"},
        duration: "0.3s"
    };

    return (
        <div className={'bg-img'}>
            <CarouselSlider slideItems={data2} sliderBoxStyle={sliderBoxStyle} manner={manner}/>
            <Box sx={{flexGrow: 1}}>
                <h3 style={{textAlign: 'center', textDecoration: 'underline'}}>{data.name}</h3>
                <Grid container spacing={1} style={{padding: '1rem', textAlign: 'center',}}>
                    <Grid item xs={3}>
                        <Item>
                            <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <SchoolIcon style={{color: '#c78d28'}}/> Kurslar ro'yxati</h3>
                            {data.coursesList.map(item => <p>
                                {item}
                            </p>)}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <CallIcon style={{color: '#c78d28'}}/> Telefon raqamlar</h3>
                            {data.phone.map(item => <a style={{display: 'block'}} target={'_parent'}>
                                {item}
                            </a>)}
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <LocationOnIcon style={{color: '#c78d28'}}/> Manzil</h3>
                            <p>{data.address.area} / {data.address.region}</p>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <h3 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <TrendingUpIcon style={{color: '#c78d28'}}/> Reyting</h3>
                            <Rating name="half-rating" defaultValue={parseInt(data.rating)} readOnly/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Main;