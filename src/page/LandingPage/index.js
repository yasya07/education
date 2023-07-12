import React, {Fragment, useEffect, useState} from 'react';
import LandingNav from "./LandingNav";
import {Grid, Rating} from "@mui/material";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import Box from "@mui/material/Box";
import Main from "./Main";
import Location from "./Location";
import Teacher from "./Teacher";
import Loader from "../../component/Loader/Loader";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // height: '200px',
    marginBottom: '1rem',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function Index() {

    const [data, setData] = useState(JSON.parse(localStorage.getItem('education')));
    const [page, setPage] = useState(localStorage.getItem('page'))

    const [loading, setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    }, 3000)

    useEffect(() => {
        if (!localStorage.getItem('page')) {
            localStorage.setItem('page', '1')
        }
    }, [])

    useEffect(() => {
        setPage(localStorage.getItem('page'))
    }, [localStorage.getItem('page')])

    return (
        <div style={{position: 'relative'}}>
            <LandingNav data={data} setPage={setPage}/>
            {<Fragment>
                <div style={{minHeight: 500}}>
                    {page === '1' ? <Main data={data}/> : page === '2' ? <Teacher data={data.teachers}/> :
                        <Location data={data} loader={loading}/>}
                </div>

                <Box style={{width: '100%'}}>
                    <Grid container spacing={1}
                          style={{padding: '1rem', textAlign: 'center', backgroundColor: '#008060'}}>
                        <Grid item xs={12}>
                            <Item style={{
                                backgroundColor: '#008060',
                                color: 'white'
                            }}>
                                <h3 style={{
                                    alignItems: 'center',
                                    color: 'white',
                                    fontSize: '22px',
                                    marginBottom: '8px'
                                }}>
                                    Biz haqimizda</h3>
                                <p style={{fontSize: '14px'}}>{data.description}</p>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <h3 style={{alignItems: 'center', color: 'white', fontSize: '22px', marginBottom: '8px'}}>
                                Biz bilan aloqa</h3>
                            <Item style={{backgroundColor: '#008060', display: 'flex', justifyContent: 'center'}}>
                                <a href={data.network.instagram} className={'networkIcon'}>
                                    <InstagramIcon/>
                                </a>
                                <a href={data.network.telegram} className={'networkIcon'}>
                                    <TelegramIcon/>
                                </a>
                                <a href={data.network.web} className={'networkIcon'}>
                                    <LanguageIcon/>
                                </a>

                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Fragment>}


        </div>
    );
}

export default Index;
