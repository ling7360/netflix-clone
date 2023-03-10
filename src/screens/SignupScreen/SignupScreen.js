import { React, useRef, useState } from 'react';
import { auth } from '../../firebase';
import './SignupScreen.css';
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { useNavigate } from 'react-router-dom';
import LoginLayout from '../LoginLayout/LoginLayout';

const SignupScreen = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(authUser => {
            dispatch(login({
                isLogged: true,
                email: authUser.user.email,
                token: authUser.user._delegate.accessToken,
                expireTime: authUser.user.metadata.lastLoginAt + (1000 * 60 * 60 * 24 * 7) + ''
            }))
            // console.log(authUser.user)
            console.log(authUser.user.expireTime)
            console.log(authUser.user.metadata.lastLoginAt)
            navigate("/profile")
        }).catch(error => alert(error.message));
    }

    const goRegHandler = () => {
        navigate("/register")
    }

    return (
        <LoginLayout>
            <div className='signupScreen'>
                <form>
                    <h2>Have an account ?</h2>
                    <input ref={emailRef} placeholder="Email" type="email" autoComplete="on" />
                    <input ref={passwordRef} placeholder="Password" type="password" autoComplete="on" />
                    <button type='submit' className='signupScreen_login' onClick={signIn}>
                        Log In
                    </button>
                    <h4>
                        <span className='signupScreen_gray'>New to Netflix?</span>
                        <span className='signupScreen_link' onClick={goRegHandler} /* autoComplete="on" */>
                            Sign up now.
                        </span>
                    </h4>
                </form>
            </div>
        </LoginLayout>
    )
}


export default SignupScreen;