import React from 'react'

function Profile() {
  const user=localStorage.getItem('users')
  return (
     <>
     <div className='container my-4'>
      <div className="row">
      <h1><b>welcome {JSON.parse(user).name}</b></h1>

      </div>


     </div>

    
     </>
  )
}

export default Profile