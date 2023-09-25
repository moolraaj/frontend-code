import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
function PrivateComponent() {
    const user=localStorage.getItem('users')
  return (
     <>
    {user?<Outlet/>:<Navigate to='/sign-up'/>}
     </>
  )
}

export default PrivateComponent
