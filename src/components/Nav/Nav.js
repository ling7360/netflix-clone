import { React, useEffect, useState } from 'react';
import './Nav.css';

const Nav = () => {

    const [show, setShow] = useState(false);

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
        // <div className="nav nav_black">
        // Only render the navbar if the show state is true
        <div className={`nav ${show && 'nav_black'} `}>
            <div className='nav_content'>
                <img
                    className='nav_logo'
                    src='https://about.netflix.com/images/logo.png'
                    alt=''
                />
                <img
                    className='nav_avatar'
                    src='https://cdn-icons-png.flaticon.com/128/2202/2202112.png'
                    alt=''
                />
            </div>
        </div>
    )
}

export default Nav;