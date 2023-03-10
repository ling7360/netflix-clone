import { React, useState } from 'react';
import './LoginScreen.css';
import LoginLayout from '../LoginLayout/LoginLayout';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {

    const navigate = useNavigate();
    const goSignup = () => {
        navigate("/login")
    }

    return (
        <LoginLayout>
            <div className='loginScreen_body'>
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                <div className='loginScreen_input'>
                    <form>
                        <input
                            type='email'
                            placeholder='Email Address'
                        // autoComplete="on"
                        />
                        <button
                            onClick={goSignup}
                            className='loginScreen_getStarted'
                        // autoComplete="on"
                        >
                            Get Started
                        </button>
                    </form>
                </div>
            </div>
        </LoginLayout>
    )
}

export default LoginScreen;
