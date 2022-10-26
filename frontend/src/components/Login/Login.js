import React, { Fragment, useEffect, useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Link,useNavigate} from "react-router-dom"
import {Typography} from '@mui/material';
import {toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from '../../Redux/actions/userAction';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { error, isAuthenticated ,message,user} = useSelector((state) => state.user);
    const [visible, setVisible] = useState(false);
    const togglePassword=()=>{
        setVisible(!visible)
       
    }
    const registerHandler =()=>{
        navigate('/user/register')
    }
    const Icon = visible ? VisibilityOffIcon : RemoveRedEyeIcon;
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
     if(isAuthenticated){
        toast.success(message)
        if(user&&user.role === 'admin'){
            navigate('/admin')
        }else{
            navigate('/user/success')
        }
       
     }
     if(error){
        toast.error(error.message);
        dispatch(clearErrors());
     }
    }, [dispatch,isAuthenticated,message,error,navigate,user])
    
    
    
    const loginSubmit =async (e)=>{
        e.preventDefault();
        dispatch(login({email,password}))
       
    };


  return (
   
    <Fragment>
        <div className="loginContainer" >
            <div className="loginBox" >
                <Typography component={'h4'}>Sign-in</Typography>
                <form action="" className="loginForm" onSubmit={loginSubmit}>
                    
                    <div className='loginEmail'>
                        <MailOutlineIcon/>
                        <input type="email" 
                         placeholder='Email'
                         value={email}
                         onChange={(e)=> setEmail(e.target.value)}
                          />

                    </div>
                    <div className='loginPawword'>
                        <LockOpenIcon/>
                        <input type={visible ? "text" : "password"} placeholder='Password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                       <span className='password-Togle-Icon' hidden onClick={togglePassword}><Icon style={{display: password === "" ? "none" : "block"}} /></span> 
                    </div>
                  
                    <Link to="/user/register" >New user? <b onClick={registerHandler}>Register</b></Link>
                <input type="submit" value="Login" className="loginBtn"  />
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default Login