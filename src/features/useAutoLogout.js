import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./userSlice";

const useAutoLogout = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = user.expireTime - Date.now();
        if (timeout < 6000) {
            dispatch(logout());
            return;
        }
        const timer = setTimeout(() => {
            dispatch(logout());
        }, timeout)
        return () => {
            clearTimeout(timer);
        }
    }, [user]);
}

export default useAutoLogout;