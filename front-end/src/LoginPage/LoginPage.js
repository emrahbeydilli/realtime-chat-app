import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMyLocation } from "../MapPage/mapSlice";

import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import Logo from "./Logo";

import './LoginPage.css'

const isUsernameValid = (username) => {
    return username.length > 0 && username.length < 10 && !username.includes(' ');
}

const locationOptions = {
    enableHighAccurancy: true,
    timeout: 5000,
    maximumAge: 0,
};

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [locationErrorOccured, setLocationErrorOccured] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/map');
    }

    const onSuccess = (position) => {
        console.log(position.coords.latitude,position.coords.longitude);
        dispatch(
            setMyLocation({})
        );
    };

    const onError = (error) => {
        console.log("Error occurred when trying to get location");
        console.log(error);
        setLocationErrorOccured(true);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            onSuccess,
            onError,
            locationOptions);
    }, []);

    return (
        <div className='l_page_main_container'>
            <div className='l_page_box'>
                <Logo />
                <LoginInput
                    username={username}
                    setUsername={setUsername}
                />
                <LoginButton
                    disabled={!isUsernameValid(username) || locationErrorOccured}
                    onClickHandler={handleLogin}
                />
            </div>
        </div>
    );

}

export default LoginPage;