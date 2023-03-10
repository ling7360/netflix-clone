import React from 'react';
import "./ProfileScreen.css";
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from '../../firebase';
import PlanScreen from '../PlanScreen/PlanScreen';
import { logout } from "../../features/userSlice";
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = e => {
        e.preventDefault();
        dispatch(logout({
        }))
        auth.signOut();
        navigate("/start")
    }

    const goHomeHandler = () => {
        navigate("/")
    }

    return (
        <div className='profileScreen'>
            <div className='profileScreen_body'>
                <h1>Edit Profile</h1>
                <div className='profileScreen_info'>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                        alt='' />
                    <div className='profileScreen_details'>
                        <h2>{user.email}</h2>
                        {/* <h2>{user.expireTime}</h2> */}
                        {/* <h2>{user.token}</h2> */}
                        <div className='profileScreen_plans'>
                            <h3>Plans</h3>
                            <PlanScreen />
                            <button
                                onClick={signOut}
                                className='profileScreen_signOut'>
                                Sign Out
                            </button>
                            <button
                                onClick={goHomeHandler}
                                className='profileScreen_goHome'>
                                Go to Homepage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;
