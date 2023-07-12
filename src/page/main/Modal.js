import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import {region, area, educationsName} from "../../json/db";
import Button from "@mui/material/Button";
import {DialogTitle} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Modal({modal, setModal, submit, search}) {

    const [selectRegion, setSelectRegion] = useState('')
    const [selectArea, setSelectArea] = useState('')
    const [name, setName] = useState('')

    const handleClose = () => {
        setModal(false);
    };

    const handleChangeRegion = (event) => {
        console.log(event)
        setSelectRegion(event.target.value)
    };
    const handleChangeArea = (event) => {
        setSelectArea(event.target.value)
    };
    const handleChangeName = (event) => {
        setName(event.target.value)
    };

    function onSearch(e) {
        e.preventDefault()
        submit({region: selectRegion, area: selectArea, name})
        setModal(false)
    }

    console.log(selectRegion)
    return (
        <div style={{width: '1200px'}}>
            <Dialog
                open={modal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-title">
                    Respublika Bo'yicha o'quv qidiruvi
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
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Viloyatni tanlang"
                            value={selectRegion}
                            defaultValue={selectRegion}
                            onChange={handleChangeRegion}
                            required size={'small'}>
                            {region.map((option, index) => (
                                <MenuItem key={index}  value={option.value}>
                                    {option.city}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Hududni tanlang"
                            value={selectArea}
                            onChange={handleChangeArea}
                            required size={'small'}>
                            {area[selectRegion]?.map((option, index) => (
                                <MenuItem key={index} value={option === "Barcha" ? "All" : option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Yo'nalishni tanlang"
                            value={name}
                            onChange={handleChangeName}
                            required size={'small'}>
                            {educationsName.map((option, index) => (
                                <MenuItem key={index} value={option === "Barcha" ? "All" : option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div style={{display: 'flex', justifyContent: 'end', marginRight: '15px'}}>
                            <Button variant="outlined" form={'search'} type={'submit'}>Qidirish</Button>
                            <Button variant="outlined" color="error" onClick={()=>setModal(false)}>Chiqish</Button>
                        </div>
                    </div>
                </Box>
            </Dialog>
        </div>
    );
}

export default Modal;