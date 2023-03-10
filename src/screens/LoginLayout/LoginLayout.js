import './LoginLayout.css';

const LoginLayout = (props) => {
    return (
        <div className='loginScreen'>
            <div className='loginScreen_gradient'>
                {props.children}
            </div>
        </div>
    )
}

export default LoginLayout
