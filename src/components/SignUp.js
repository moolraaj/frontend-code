import React, { useEffect, useState } from 'react'
import {useNavigate}from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import openEye from '../components/images/view.png'
import closeEye from '../components/images/hide.png'
 
function SignUp() {
  const [show, setShow] = useState('')


  const hideAndseekPasssword=(e)=>{
    e.preventDefault()
    setShow(!show)
  }
   

 
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    const [error, setError] = useState(false)
    let navigate=useNavigate()
    
    const getUserData=(e)=>{
        setUser({...user,
            [e.target.name]:e.target.value})
             
            
    
    }

    useEffect(()=>{
      const user=localStorage.getItem('users')
      if(user){
        navigate('/')
      }
    })
    
    const submitHandler=async(e)=>{
        e.preventDefault()
        if(!user.name||!user.email||!user.password){
          setError(true)
          return false
        }else{
          setUser({
            name:'',email:'',password:''
            })
            let data=await fetch('http://localhost:1500/user/register',{
              method:"POST",
              body:JSON.stringify({...user}),
              headers:{
                "Content-Type":"application/json"
              }
              
            })
    
            let result=await data.json()
            console.log(result)
            localStorage.setItem('users',JSON.stringify(result))
    
            if(result){
              navigate('/')
            }
            console.log(user.name,user.email,user.password)
        }
        toast.success('user successfylly sign up')
   
    
    }
  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={true}
/>
   <div className='container my-4 sign-up-page'>
    
    <form>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"> Name</label>
    <input type="text" className="form-control" name='name' value={user.name} onChange={getUserData} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    {error&&!user.name&&<span className='error'>enter valid name</span>}
     
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
    <input type="email" className="form-control" name='email' value={user.email} onChange={getUserData} id="exampleInputEmail2" aria-describedby="emailHelp"/>
    {error&&!user.email&&<span className='error'>enter valid email</span>}
     
  </div>
  <div className="mb-3 show-hide">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input  type={show?'text':'password'} className="form-control" name='password' value={user.password} onChange={getUserData} id="exampleInputPassword3" autoComplete='off' />
    {error&&!user.password&&<span className='error'>enter valid password</span>}
    <button className='toggle-Class' onClick={hideAndseekPasssword}>{show?<img src={openEye} alt='view'/>:<img src={closeEye} alt='close'/>}</button>
    
   
  </div>
   
  <button type="submit" className="btn btn-primary" onClick={submitHandler} >sign up</button>
</form>
    </div> 
    </>

   )
}

export default SignUp