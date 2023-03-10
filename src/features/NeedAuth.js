import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import LoginLayout from "../screens/LoginLayout/LoginLayout";
import { login, logout, selectUser } from './userSlice';

const NeedAuth = props => {

  const user = useSelector(state => state.user);
  // console.log(user);
  const location = useLocation();

  return user.isLogged ?
    props.children :
    <Navigate
      to={"/start"}
      replace
      state={{ prevLocation: location }}
    />

}

export default NeedAuth;