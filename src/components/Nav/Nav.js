import { React, useEffect, useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    // console.log(user.isLogged);

    const transNavBar = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", transNavBar);
        return () => window.removeEventListener("scroll", transNavBar)
    }, [])

    return (
        < div className={`nav ${show && 'nav_black'} `} >
            <ul className='nav_content'>
                <img
                    onClick={() => navigate("/")}
                    className='nav_logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
                    alt=''
                />
                {
                    !user.isLogged &&
                    <button
                        onClick={() => navigate("/login")}
                        className='nav_button'>
                        Sign In
                    </button>
                }
                {
                    user.isLogged &&
                    <img
                        onClick={() => navigate("/profile")}
                        className='nav_avatar'
                        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                        alt='avatar'
                    />
                }
            </ul>
        </div >
    )
}

export default Nav;