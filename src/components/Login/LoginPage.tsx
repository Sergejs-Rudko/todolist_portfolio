import React, {useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {loginTC} from "../../state/authReducer/authReducer";
import {useNavigate} from "react-router-dom";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
export const LoginPage = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn])


    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate(values) {
            if (!values.email) {
                return ({email: "Email is required"})
            }
            if (!values.password) {
                return ({password: "Password is required"})
            }
        },
        onSubmit: async (values: FormValuesType, formikHelpers) => {
            const resp = await dispatch(loginTC(values));
            if (resp.type === loginTC.rejected.type) {
                debugger
                formikHelpers.setFieldError("email", "error for test")
            }
        },
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit()
                }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...formik.getFieldProps("email")}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...formik.getFieldProps("password")}
                    />
                    <FormControlLabel
                        control={<Checkbox  {...formik.getFieldProps("rememberMe")} color="primary"
                                            checked={formik.values.rememberMe}/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </Container>
    )
}