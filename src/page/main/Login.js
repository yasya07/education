import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {saveUser} from "../../store/auth/auth";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Login({open, setLogin, data}) {

    const dispatch = useDispatch()

    const [a, setA] = useState(false)
    const [reg, setReg] = useState(false)

    const handleClose = () => {
        setLogin(false);
    };

    function onSearch(e) {
        e.preventDefault()
        if (reg) {
            let values = {
                firstName: e.target[0].value,
                fullName: e.target[1].value,
                mobileEmail: e.target[2].value,
                password: e.target[3].value,
            }
            console.log(values)
            if (values.mobileEmail === '' || values.fullName === '' || values.firstName === '' || values.password === '') {
                toast.error('введите данные полностью')
            } else {
                localStorage.setItem('user', JSON.stringify(values))
                dispatch(saveUser(values))
                setLogin(false)
            }

        } else {
            console.log(e.target[0].value,e.target[1].value)
            let res = data.some(item => {
                if (item.mobileEmail === e.target[0].value && item.password === e.target[1].value) {
                    localStorage.setItem('user', JSON.stringify(item))
                    setA(true)
                    return true
                }
            })
            if (!res) toast.error('Afsus bunday foyalanvchi bizning tizimda topilmadi iltimos tekshirib qaytatdan urinib koring')
            else {
                toast.success(`My_Education tizimiga hush kelibsiz hurmatli ${JSON.parse(localStorage.getItem('user')).firstName}`)
                setLogin(false)
            }
        }

    }

    const child1 = <>

        <TextField
            id="filled-password-input"
            label="Email yoki raqamingizni kiriting"
            type="text"
            autoComplete="current-password"
            variant="filled"
        />
        <TextField
            id="filled-password-input"
            label="Parolingizni kiriting"
            type="password"
            autoComplete="current-password"
            variant="filled"
        />

        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button variant="contained" form={'search'} type={'submit'}>Kirish</Button>
            <Button variant="outlined" onClick={() => setReg(true)}>Ro'yxatdan o'tish</Button>
        </div>
    </>
    const child2 = <>

        <TextField
            id="filled-password-input"
            label="Ismingizni kiriting"
            type="text"
            autoComplete="current-password"
            variant="filled"
        />
        <TextField
            id="filled-password-input"
            label="Familiyangizni kiriting"
            type="password"
            autoComplete="current-password"
            variant="filled"
        />
        <TextField
            id="filled-password-input"
            label="Email yoki raqamingizni kiriting"
            type="password"
            autoComplete="current-password"
            variant="filled"
        />
        <TextField
            id="filled-password-input"
            label="Parolingizni kiriting"
            type="password"
            autoComplete="current-password"
            variant="filled"
        />

        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button variant="contained" form={'search'} type={'submit'}>Kirish</Button>
            <Button variant="outlined" onClick={() => setReg(false)}>Login</Button>
        </div>
    </>

    return (
        <div style={{width: '1200px'}}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-title">
                    Royxatdan o'tish
                </DialogTitle>
                <Box
                    id={'search'}
                    component="form"
                    onSubmit={onSearch}
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '95%'},
                        width: '500px', padding: '0 1rem 1rem 1rem'
                    }}
                    noValidate
                    autoComplete="off">

                    {reg ? child2 : child1}

                </Box>
            </Dialog>
        </div>
    );
}

export default Login;