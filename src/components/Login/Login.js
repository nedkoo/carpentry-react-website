import {useNavigate} from 'react-router-dom';

import * as authService from '../../services/authService'

import { useAuthContext } from '../../contexts/AuthContex';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import './Login.css'

const Login = () => {
    const { loginContex } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();
    // const [errors, setErrors] = useState({name:false})

    const onLoginSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        
        authService.login(email, password)
            .then((resAuth) => { 
                loginContex(resAuth);
                addNotification('You logged in successfully', types.info);
                // console.log(res)
                navigate('/')
            })
            .catch (err => {
                // setErrors(state => ({...state, name: `${err.message}`}));
                // console.log(err.message)
                addNotification('Password or email does not match', types.error);
             });
    }

    const nameHandler = (event) => {
        const name = event.target.value;

        if (!name) {
            addNotification('It\'s required', types.info);
        }
    }

    return (
        <form className="login" onSubmit={onLoginSubmit} method="POST">
        <fieldset>
            <legend>Login</legend>
            <p className="field-icon">
                <input type="email" name="email" id="email" placeholder="nedko@abv.bg" onBlur={nameHandler}/>
                <label htmlFor="email"><span>Email</span></label>
            </p>
            <p className="field-icon">
                <input type="password" name="password" id="password" onBlur={nameHandler}/>
                <label htmlFor="password"><span>Password</span></label>
            </p>
            <p>
                <input className="field-icon" type="submit" value="Login!"/>
            </p>
        </fieldset>
    </form>
    );
};


export default Login;