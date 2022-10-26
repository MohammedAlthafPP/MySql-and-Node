import React from 'react'
import DangerousIcon from '@mui/icons-material/Dangerous';
import "./Errorpage.css"
import { useNavigate } from 'react-router-dom';
function ErrorPage() {
  const navigate = useNavigate();
  const homeHandler =()=>{
    navigate('/')
  }
  return (
    <div className='notFoundcontainer'>
      <div className="notFoundSection">
        <DangerousIcon/>
        <h4>404</h4>
        <button onClick={homeHandler}>Back to Home</button>
      </div>
      
    </div>
  )
}

export default ErrorPage