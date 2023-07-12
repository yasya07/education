import React, {Fragment, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../img/Logo.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";

const pages = ["Asosiy Bo'lim" ,"Oqituvchilar", 'Manzil'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function LandingNav({data, setPage}) {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (index) => {
        setPage(index.toString())
        localStorage.setItem('page', index.toString())
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar id={'nav'} style={{backgroundColor: '#008060FF'}} position="sticky">
            <Container maxWidth="xl" style={{paddingLeft: 0}}>
                <Toolbar disableGutters>
                    <img src={data.logo} alt="Logo" width={60} height={60} style={{marginRight: 15, borderRadius: '50%'}}/>
                    <Link to={'/'} style={{color: 'white', textDecoration: 'none'}}>
                        <Typography
                            variant="h6" noWrap component="a" href="/"
                            sx={{
                                mr: 2, display: {xs: 'none', md: 'flex'}, fontFamily: 'monospace', fontWeight: 700,
                                letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                            }}
                        >
                            {data.name}
                        </Typography>
                    </Link>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            // onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page,index) => (
                                <MenuItem key={page} onClick={()=>handleCloseNavMenu(index+1)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'space-around'}}>
                        {pages.map((page,index) => (
                            <Button
                                key={page}
                                onClick={()=>handleCloseNavMenu(index+1)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        {localStorage.getItem('user') && <Fragment>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={JSON.parse(localStorage.getItem('user'))?.firstName}
                                            src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>

                        </Fragment>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default LandingNav;