import { React, useRef, useState } from 'react';
import './RegScreen.css';
import { auth } from '../../firebase';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login, logout } from "../../features/userSlice";
import LoginLayout from '../LoginLayout/LoginLayout';

const RegScreen = (props) => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goLoginHandler = () => {
        navigate("/login")
    }

    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(authUser => {
            dispatch(login({
                isLogged: true,
                email: authUser.user.email
            }))
            navigate("/profile")
        }).catch(error => alert(error.message));
    }


    return (
        <LoginLayout>
            <div className='regScreen'>
                <form>
                    <h2>Sign Up Now</h2>
                    <input ref={emailRef} placeholder="Email" type="email" />
                    <input ref={passwordRef} placeholder="Password" type="password" />
                    <button type='submit' className='regScreen_link' onClick={register}>
                        Register
                    </button>
                    <button type='submit' className='regScreen_back' onClick={goLoginHandler}>
                        Go Back to Login
                    </button>
                </form>
            </div>
        </LoginLayout>
    )
}

export default RegScreen;
