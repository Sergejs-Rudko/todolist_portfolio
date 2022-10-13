import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from "./TodolistsList";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {useAppSelector} from "./state/hooks";
import {Routes, Route} from "react-router-dom";
import {LoginPage} from "./components/Login/LoginPage";


export const AppWithRedux = () => {

    const appStatus = useAppSelector(state => state.app.appStatus)
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
                    <Button color="inherit">Login</Button>
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



