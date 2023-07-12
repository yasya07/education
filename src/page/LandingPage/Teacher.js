import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {Rating} from "@mui/material";
import Container from "@mui/material/Container";
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    display: 'flex',
    height: '200px',
    marginBottom: '.2rem',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Teacher({data}) {
    return (

        <Container>
            <Box>
                <Grid container spacing={1}>
                    {data.map(item => <Grid item xs={6} style={{position: 'relative', padding: '1rem'}}>
                        <Item>
                            <div style={{width: '35%'}}>
                                <img src={item.img} width={'100%'} height={'100%'} alt="rasm yoq"/>
                            </div>
                            <div style={{width: '65%'}}>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <h4>{item.fullName} - {item.specialty}</h4>
                                    <Rating style={{fontSize: '16px'}} name="half-rating"
                                            defaultValue={parseInt(item.rating)} readOnly/>
                                </div>
                                <p style={{padding: '0 .5rem'}}>{item.bio}</p>
                                <span style={{display: 'flex', justifyContent: 'center'}}>
                                    <a href={item.network.instagram}>
                                        <InstagramIcon/>
                                    </a>
                                    <a href={item.network.telegram}>
                                        <TelegramIcon/>
                                    </a>
                                    <a href={item.network.youtube}>
                                        <YouTubeIcon/>
                                    </a>
                                </span>
                            </div>
                        </Item>
                    </Grid>)}
                </Grid>
            </Box>
        </Container>

    );
}

export default Teacher;