import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';


export default function BasicButtons() {

    const handleClick = async () => {
        const usersColection = collection(db, 'form_register')
        await addDoc(usersColection, { test1: "123", test2: "rvr", test3: "crcrc" })

    }






    return (
        <>
            <Stack spacing={2} direction="row">
                <Button variant="text" onClick={handleClick}>Send</Button>


            </Stack>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic1" label="Outlined" variant="outlined" />
                <TextField id="filled-basic2" label="outlined" variant="outlined" />
                <TextField id="standard-basic3" label="outlined" variant="outlined" />
            </Box>
        </>
    );
}