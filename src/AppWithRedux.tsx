import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from "./TodolistsList";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {Route, Routes, useNavigate} from "react-router-dom";
import {LoginPage} from "./components/Login/LoginPage";
import {initialiseAppTC} from "./state/appReducer/appReducer";
import {logoutTC} from "./state/authReducer/authReducer";


export const AppWithRedux = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const appStatus = useAppSelector(state => state.app.appStatus)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitalised = useAppSelector(state => state.app.isInitialised)

    const handleLogout = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    useEffect(() => {
        dispatch(initialiseAppTC())
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [])

    if (!isInitalised) {
        return (
            <div style={{position: "fixed", top: "45%", textAlign: "center", width: "100%"}}>
                <CircularProgress/>
            </div>
        )
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Log Out</Button>}
                </Toolbar>
            </AppBar>
            {
                appStatus === "loading" && <LinearProgress color="secondary"/>
            }
            <ErrorSnackbar/>
            <Container fixed>
                <Routes>
                    <Route path={"login"} element={<LoginPage/>}/>
                    <Route path={"/"} element={<TodolistsList/>}/>
                </Routes>
            </Container>
        </div>
    );
}



