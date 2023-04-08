import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyLocation } from "../MapPage/mapSlice";
import { getFakeLocation } from './FAKE_LOCATION';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';
import { proceedWithLogin } from '../store/actions/loginPageActions';

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

    const myLocation = useSelector(state => state.map.myLocation);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        proceedWithLogin({
            username: username,
            coords:{
                lng: myLocation.lng,
                lat: myLocation.lat,
            }
        });
        navigate('/map');
    }

    const onSuccess = (position) => {
        // console.log(position);
        dispatch(
            setMyLocation({
                lat:position.coords.latitude,
                lng:position.coords.longitude,
            })
        );
    };

    const onError = (error) => {
        console.log("Error occurred when trying to get location");
        console.log(error);
        setLocationErrorOccured(true);
    }

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(
        //     onSuccess,
        //     onError,
        //     locationOptions);
        onSuccess(getFakeLocation());
    }, []);

    useEffect(()=>{
        if (myLocation) {
            connectWithSocketIOServer();
        }
    },[myLocation]);

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