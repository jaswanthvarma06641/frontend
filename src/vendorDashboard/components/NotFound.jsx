import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <>
        <div className='errorSection'>
        <h1>404</h1>
            Page not Found
            <Link to="/" style={{fontSize:'1.5rem', color:'darkblue'}}>
   <p> Go back</p>
    </Link>
    </div>
    </>
    
  )
}

export default NotFound
