 
import { Toaster, toast } from 'react-hot-toast'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
 
function Navbar() {
 
 
  
  const navigate=useNavigate()
  const user=localStorage.getItem('users')
const userLogout=()=>{
if(window.confirm(' Are you sure you want to logout?')){
  localStorage.clear()
  
  navigate('/sign-up')
  toast.success('user successfully logout')
}else{
  toast.error('user stay on the site')
}
  
}

 

  
    
  return (
    <>
 
<Toaster
position='top-right'
reverseOrder={false}
/>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
      {user?
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-products">add-products</Link>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link" to="/update-products">update-products</Link>
        </li> */}

        <li className="nav-item">
          <Link className="nav-link" to="/profile">profile</Link>
        </li>
     

          <li className="nav-item">
          <Link className="nav-link" to="/sign-up"id='confirmLogout' onClick={userLogout} >logout <span><b>welcome ({JSON.parse(user).name}) </b> </span></Link>
        </li></ul>
        
        :

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/sign-up">signup</Link>
        </li> 

        <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li>
        </ul>
        
        }
       
      
        
        
        

        

      
         
       
     
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar