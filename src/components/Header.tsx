import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Grid, useTheme, useMediaQuery, Box, Button, Toolbar, Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { authActions, isUserLoggedIn, signOutAction } from '../redux/actions/authActions';
import { RootState } from '../redux/reducers/rootreducer';
import { checkBalance } from '../redux/actions/balanceActions';
import LogoutIcon from '@mui/icons-material/Logout';



export default function Header() {
    const [inputFields, setInputFields] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({email: '', password: ''});

    let user = useSelector((state: RootState) => state.userDetails);
    let balance = useSelector((state: RootState) => state.currentBalance);
    // localStorage.setItem('balance', balance);
    console.log("user ", user);
    useEffect(()=>{
        if(!user.authenticated){
            dispatch(isUserLoggedIn());
            dispatch(checkBalance());
        }
    }, [])


    
    const [openModal, setOpenModal] = useState(false);
    const dispatch  = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpenModal = (): void => {
        setOpenModal(true);
    };

    const handleCloseModal = (): void => {
        setOpenModal(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void   => {
        const {name, value} = e.target
        setInputFields({...inputFields, [name]: value });
        const errs = {email: '', password: ''};
        setErrors(errs);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if(!signInFormValidation()){
            return;
        }
        e.preventDefault();
        dispatch(authActions({...inputFields}));
        handleCloseModal();
    }

    const handleSignOut = () => {
        dispatch(signOutAction());
        dispatch(checkBalance());
    }

    const signInFormValidation = () => {
        const { email, password } = inputFields
        const errs = {email: '', password: ''};
        let formValid = true;
        if(!email){
            errs.email= 'Can not be empty';
            formValid = false;
        }
        if(email && !RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email)){
            errs.email = 'Please enter a valid mail Id';
            formValid = false;
        }
        if(!password){
            errs.password = 'Can not be empty';
            formValid= false;
        }
        if(password && password.length < 4){
            errs.password = 'Minimum length 4';
            formValid = false;
        }
        setErrors(errs);
        return formValid;
    }

    const nonLoggedInUser = <>
    <Button disabled style={{ color: '#98FB98', fontWeight: 'bolder', fontSize: '1.2rem', marginRight: '1rem' }} > ${balance.toFixed(2)}</Button>
        <Button onClick={handleClickOpenModal} style={{ color: 'white' }} >Sign In</Button>
    </>

    const loggedInUser = <>
        <Button style={{ color: 'white', marginRight: '1rem' }} disabled>Welcome { user.name} !</Button>
        <Button disabled style={{ color: '#98FB98', fontWeight: 'bolder', fontSize: '1.2rem', marginRight: '1rem' }} > ${balance.toFixed(2)}</Button>
        <Button onClick={handleSignOut} style={{ color: 'white' }} ><LogoutIcon /></Button>
    </>

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography style={{ marginLeft: "1rem", fontWeight: 'bolder' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            CasinoRoyale  
                        </Typography>
                        {
                          user.authenticated ? loggedInUser : nonLoggedInUser
                        }
                    </Toolbar>
                </AppBar>
            </Box>

            <Dialog
                fullScreen={fullScreen}
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Sign in 
                </DialogTitle>
                <DialogContent style={{ paddingTop: '1rem' }}>
                    <DialogContentText>
                        {/* error = {inputFields.email ==='' && !isValid && submitStatus === 'SUBMITTED'} helperText = {submitStatus === 'SUBMITTED' && errors?.email} */}
                        <form onSubmit={handleSubmit} >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField sx={{width: '100%'}} error={ errors.email.length > 0 } helperText = {errors.email} type='email' label='Email' name='email' value={inputFields.email} onChange={handleChange} placeholder='Enter your email' />
                                    {/* <p> { touched.email ? 'please fill the field' : null } </p> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField sx={{width: '100%'}} error={ errors.password.length > 0 } helperText = {errors.password} type='password' label='Password' name='password' value={inputFields.password} onChange={handleChange} placeholder='Enter your password' />
                                    {/* <p> { touched.email ? 'please fill the field' : null } </p> */}
                                </Grid>
                            </Grid>
                        </form>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{marginRight: '0.9rem'}} variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}
