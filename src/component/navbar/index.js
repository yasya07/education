import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';

import React, {Fragment, useState} from "react";
import {Link} from 'react-router-dom'
import logo from '../../img/Logo.jpg'
import {ButtonGroup} from "@mui/material";
import Modal from "../../page/main/Modal";

const pages = ['Home', 'About', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Index({submit, search}) {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [modal, setModal] = useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = () => {
        localStorage.removeItem('user')
    }

    return (
        <Fragment>
            <AppBar id={'nav'} style={{backgroundColor: 'orange'}} position="sticky">
                <Container maxWidth="xl" style={{paddingLeft: '0 1rem'}}>
                    <Toolbar disableGutters>
                        <img src={'data:image/jpeg;base64,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'} alt="Logo" width={60} height={60} style={{marginRight: 15, borderRadius: '50%'}}/>

                        <Link to={'/'} style={{color: 'white', textDecoration: 'none'}}>
                            <Typography
                                variant="h6" noWrap component="a" href="/"
                                sx={{
                                    mr: 2, display: {xs: 'none', md: 'flex'}, fontFamily: 'monospace', fontWeight: 700,
                                    letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                                }}
                            >
                                My_ <br/>
                                Education
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
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
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
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'end'}}>
                            {pages.map((page) => (
                                <>
                                    {/*<span className={'nav-button'} />*/}
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block', margin: '2px 0'}}
                                        className={'nav-button'}
                                    >
                                        {page}
                                    </Button>

                                </>
                            ))}
                            <Button onClick={() => setModal(p => !p)}
                                    style={{backgroundColor: 'transparent'}} startIcon={<SearchIcon/>}
                                    sx={{
                                        my: 2,
                                        width: '150px',
                                        borderRadius: '10px',
                                        color: 'white',
                                        margin: '2px 0',
                                        display: 'flex'
                                    }}>
                                Search...
                            </Button>
                            {localStorage.getItem('user') && <Fragment>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt={JSON.parse(localStorage.getItem('user'))?.firstName}
                                                src="/static/images/avatar/2.jpg"/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography onClick={logOut} textAlign="center">{'Tizimdan Chiqish'}</Typography>
                                    </MenuItem>
                                </Menu>
                            </Fragment>}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {modal && <Modal submit={submit} search={search} modal={modal} setModal={setModal}/>}
        </Fragment>
    );
}

export default Index;