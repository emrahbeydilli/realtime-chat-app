import React from 'react';
import './LoginPage.css'

const Logo = () => {
    return ( 
        <p className='logo'>GeoCall</p>
     );
}

const LoginInput = () => {
    return ( 
        <input className='l_page_input'/>
    );
}

const LoginButton = () => {
    return ( 
        <button className='l_page_login_button'>Login</button>
    );
} 

const LoginPage = () => {
    return (
        <div className='l_page_main_container'>
            <div className='l_page_box'>
                <Logo/>
                <LoginInput/>
                <LoginButton/>
            </div>
        </div>
    );
}
 
export default LoginPage;