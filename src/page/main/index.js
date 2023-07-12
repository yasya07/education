import React, {Fragment, useEffect, useMemo, useState} from 'react';
import Navbar from '../../component/navbar'
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useTransition, animated} from "react-spring";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {educations} from "../../json/db";
import ImgList from "./ImgList";
import {shuffle} from "lodash";
import Button from "@mui/material/Button";
import Login from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/auth/auth";
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import Ticker from "react-ticker";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // height: '200px',
    marginBottom: '1rem',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0
}));


function Index() {

    const dispatch = useDispatch()
    const {data, status, loading} = useSelector(state => state.auth)


    const [page, setPage] = useState(1)
    const [imgList, setImgList] = useState([])
    const [imgHover, setImgHover] = useState(false)
    const [login, setLogin] = useState(false)
    const [name, setName] = useState('')
    const [search, setSearch] = useState(null)
    const [boo, setBoo] = useState([])

    const [rows, set] = useState(educations);
    const height = 64.5;
    const transitions = useTransition(
        rows.map((data, i) => ({...data, y: i * height})),
        d => d.name,
        {
            from: {opacity: 0, position: 'absolute', width: '100%'},
            leave: {height: 0, opacity: 0},
            enter: ({y}) => ({y, opacity: 1}),
            update: ({y}) => ({y})
        }
    );

    useEffect(() => {
        localStorage.setItem('page', '1')
    }, [])

    useEffect(() => {
        dispatch(getUser())
    }, [status])

    function handleChange(event, value) {
        setPage(value)
    }

    function hoverImg(item) {
        setImgList([...item])
        setImgHover(true)
    }

    function pushItem(item) {
        localStorage.setItem('education', JSON.stringify(item))
        window.open("/landing-page", '_blank')
    }

    useMemo(() => {
        setInterval(() => {
            set(shuffle(rows))
        }, 5000)
    }, [])

    useEffect(() => {
        educations.forEach(item => {
            boo.push(false)
        })
        setBoo([...boo])
    }, [])

    function Boo(i) {
        boo.splice(i, 1, !boo[i])
        setBoo([...boo])
    }

    useEffect(() => {
        setName(educations.reduce((res, item) => item.name + " * " + res, ''))
    }, [])

    function submit(data) {
        if (data.region === 'ToshkentShahr') {
            setSearch({...data, region: data.region.slice(0, -5)})
        } else {
            setSearch({...data, region: data.region.slice(0, -7)})
        }
        setPage(1)
    }


    function filterData() {
        return educations
            .filter(item => {
                if (search === null) return item
                else if (
                    item.address.region.includes(search.region) && item.address.area.includes(search.area === "All" ? "" : search.area)
                    && item.specialty.some(course => course.includes(search.name === "All" ? "" : search.name))
                ) {
                    return item
                }
            })
    }

    console.log(filterData())


    return (
        <Fragment>
            <Navbar submit={submit} search={search}/>
            <Fragment>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 1rem',
                    margin: '1rem 0',
                    alignItems: 'center'
                }}>
                    <h3>{JSON.parse(localStorage.getItem('user'))?.firstName}</h3>
                    <Button onClick={() => setLogin(true)} variant={'outlined'} color={'primary'}>Login</Button>
                </div>

                <Box sx={{flexGrow: 1}} style={{height: '600px', position: 'relative'}}>
                    <Grid container spacing={3}>
                        <Grid item xs style={{overflow: 'auto', height: '495px',}}>
                            <Item style={{padding: '1rem'}}>
                                {educations.map((item, index) => <Item
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '18.75px !important'
                                    }}>
                                    <div>
                                        <h6>{item.name} -</h6>
                                        <h5 style={{textDecoration: 'underline'}}>{item.coursesList[0]}</h5>
                                    </div>
                                    <h6 onClick={() => Boo(index)} className={`${boo[index] ? 'boo1' : 'boo'}`}>
                                        {!boo[index] ? "Ro'yxatdan o'tish" : "Bekor qilish"}
                                    </h6>
                                </Item>)}
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            {
                                filterData().length > 0 ? filterData()
                                    .filter((item, index) => index >= (page - 1) * 2 && index < page * 2)
                                    .map((item, index) => <div>
                                        <Item key={item.id}
                                              style={{
                                                  height: '200px',
                                                  display: 'flex',
                                                  overflow: 'hidden',
                                                  position: 'relative'
                                              }}>
                                            <div style={{width: '40%', height: '100%', cursor: 'pointer'}}
                                                 onClick={() => hoverImg(item.img)}>
                                                <img src={item.img[0]} alt="img" width={250} height={'100%'}/>
                                            </div>
                                            <div style={{padding: '0 1rem'}}>
                                                <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                    <h3 style={{display: 'inline'}}>{item.name} -</h3>
                                                    <p style={{fontSize: '10px'}}>{item.address.region} / {item.address.area}</p>
                                                </div>
                                                <p>{item.description.substring(0, 400)}...</p>
                                            </div>
                                            <a onClick={() => pushItem(item)}
                                               style={{
                                                   position: 'absolute',
                                                   color: 'blue',
                                                   right: '2%',
                                                   bottom: '4%',
                                                   cursor: 'pointer'
                                               }}>Batafsil
                                            </a>
                                        </Item>
                                        {index % 2 !== 1 && <marquee style={{
                                            marginBottom: '.5rem',
                                            backgroundColor: 'orange',
                                            color: 'white',
                                            padding: '8px 2px'
                                        }}>{name.toLocaleLowerCase()}</marquee>}
                                    </div>) : <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 50, textAlign: 'center'}}>
                                    <FolderOpenOutlinedIcon />
                                    <p style={{fontSize: 16}}>Afsus hech narsa topilmadi</p>
                                </div>
                            }
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: '10%',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}>
                                <Stack spacing={2}>
                                    <Pagination onChange={handleChange} page={page}
                                                count={Math.ceil(filterData().length / 2)}
                                                variant="outlined" style={{color: 'orange'}}/>
                                </Stack>
                            </div>
                        </Grid>
                        <Grid item xs>
                            <Item style={{height: '461px', overflow: 'auto'}}>
                                <List dense sx={{width: '100%', maxWidth: 360}}>
                                    {transitions.map(({item, props: {y, ...rest}, key}, index) => (
                                        <animated.div
                                            key={key}
                                            style={{
                                                transform: y.interpolate(y => `translate3d(0,${y - 10}px,0)`),
                                                ...rest,
                                            }}
                                        >
                                            <Item sx={{marginBottom: '1.5rem'}}>
                                                <ListItem key={item.id} disablePadding>
                                                    <ListItemButton>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                alt={`Avatar n°${item.id + 1}`}
                                                                src={item.img[0]}
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText id={`checkbox-list-secondary-label-${item.id}`}
                                                                      primary={item.name}/>
                                                    </ListItemButton>
                                                </ListItem>
                                            </Item>
                                        </animated.div>
                                    ))}
                                </List>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Fragment>
            <Box style={{width: '100%'}}>
                <Grid container spacing={1}
                      style={{padding: '1rem', textAlign: 'center', backgroundColor: 'orange'}}>
                    <Grid item xs={12}>
                        <Item style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            boxShadow: '0 0 0 0'
                        }}>
                            <h3 style={{
                                alignItems: 'center',
                                color: 'white',
                                fontSize: '22px',
                                marginBottom: '8px'
                            }}>
                                Biz haqimizda</h3>
                            <p style={{fontSize: '14px'}}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, aliquid aspernatur autem
                                beatae, blanditiis dolore eos eum expedita facilis ipsa minus necessitatibus nisi nobis
                                non, optio provident suscipit tempora voluptatum? A quos, ratione! Aut earum
                                exercitationem facilis labore, maiores, minima nobis nostrum quasi reprehenderit sint
                                sit ut, voluptatum! Aperiam cumque cupiditate deleniti dolor doloremque eligendi eos et
                                facere id ipsam nemo praesentium, provident quos veritatis voluptates? Adipisci aliquam
                                delectus dolore ea facilis id libero molestias mollitia natus rerum! Aliquid, nisi,
                                nobis? Ad adipisci aliquam, animi, deserunt dignissimos enim hic iure molestiae nemo
                                nesciunt odit, provident quae rem sint voluptates? Aliquam aliquid atque aut consequatur
                                dicta eum facilis fuga libero maxime modi omnis pariatur perspiciatis, quam sequi sint
                                unde voluptatum. Aliquam aperiam autem cum cumque deserunt dolor dolore ea, enim eveniet
                                exercitationem explicabo facere fugit in iure minus mollitia numquam quae quam quod
                                reprehenderit rerum sit ullam vero voluptate, voluptatem? Aspernatur atque aut corporis
                                dicta dignissimos, ex fugiat hic libero magnam maiores necessitatibus neque nostrum odio
                                optio pariatur perspiciatis placeat, praesentium quaerat quam quidem quis rerum sit
                                temporibus vel voluptatum! Cupiditate deleniti est, exercitationem fugiat fugit iste
                                neque nobis numquam officia tenetur. Incidunt ipsum molestias numquam officiis omnis
                                voluptas voluptates voluptatibus?
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 style={{alignItems: 'center', color: 'white', fontSize: '22px', marginBottom: '8px'}}>
                            Biz bilan aloqa</h3>
                        <Item style={{
                            backgroundColor: 'orange', boxShadow: '0 0 0 0',
                            display: 'flex', justifyContent: 'center',
                        }}>
                            <a href={'https://www.instagram.com/abrorbatirovic_/'} className={'networkIcon'}>
                                <InstagramIcon/>
                            </a>
                            <a href={'https://t.me/abrorbatirovic'} className={'networkIcon'}>
                                <TelegramIcon/>
                            </a>
                            <a href={'https://batirovic-portfolio.netlify.app/'} className={'networkIcon'}>
                                <LanguageIcon/>
                            </a>

                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <ImgList boolean={imgHover} imgList={imgList} setBoolean={setImgHover}/>
            {login && <Login data={data} open={login} setLogin={setLogin}/>}
        </Fragment>
    );
}

export default Index;