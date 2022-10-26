import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./Success.css"
function Success() {
  return (
    <div className='sucesscontainer'>
      <div className="SuccessSection">
        <CheckCircleIcon/>
        <h4>Hi, Welcome to this website! You're signed in</h4>

      </div>
      
    </div>
  )
}


export default Success