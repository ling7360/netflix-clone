import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import NeedAuth from "./features/NeedAuth";
import Layout from './components/Layout/Layout';
import RegScreen from './screens/RegScreen/RegScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import useAutoLogout from './features/useAutoLogout';


const App = () => {

  // useAutoLogout();

  return (
    <Layout>
      <Routes>
        <Route path={"/start"} element={<LoginScreen />} />
        <Route path={"/profile"} element={<NeedAuth><ProfileScreen /></NeedAuth>} />
        <Route path={"/login"} element={<SignupScreen />} />
        <Route path={"/register"} element={<RegScreen />} />
        <Route path={"/"} element={<NeedAuth><HomeScreen /></NeedAuth>} />
      </Routes>
    </Layout>
  )
}

export default App;