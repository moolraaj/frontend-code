import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import openEye from '../components/images/view.png'
import closeEye from '../components/images/hide.png'
function LoingUser() {
    const [show, setShow] = useState('')

    const hideAndseekPasssword=()=>{
        setShow(!show)
    }
    const navigate=useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)

    const getLoginUser = (e) => {
        setUser({...user,[e.target.name]:e.target.value})

    }
    useEffect(()=>{
       const user= localStorage.getItem('users')
        if(user){
            navigate('/')
        }
      
    })

    const handelLoginUser = async () => {
        

        if(!user.email||!user.password){
            setError(true)
            return false
        }else{
            setUser({
                email: '',
                password: ''
            })
            let data=await fetch('http://localhost:1500/user/login',{
                method:'POST',
                body:JSON.stringify({...user}),
                headers:{
                    "Content-Type":"application/json"
    
                }
    
            })
            let result=await data.json()
    
            if(result.email){
                localStorage.setItem('users',JSON.stringify(result))
                navigate('/')
                console.log(user.email, user.password)
                toast.success(`user successfully logged in`);


            }else{
               alert('no email or password found please enter valid email and password')
               toast.error('incorrect email and password')
    
            }
        }
        
      
        
        
    }
    return (
        <>
        <Toaster
        position='top-right'
        reverseOrder={true}
        />

            <div className='container my-4'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' value={user.email} className="form-control" id="exampleInputEmail1" onChange={getLoginUser} aria-describedby="emailHelp" />
                    {error && !user.email && <span className='error'>enter valid email address</span>}

                </div>
                <div className="mb-3 show-hide">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type={show?"text":"password"} name='password' value={user.password} className="form-control" onChange={getLoginUser} id="exampleInputPassword1" />
                    {error && !user.password&& <span className='error'>enter valid password</span>}
                    <button className='toggle-Class' onClick={hideAndseekPasssword}>{show?<img src={openEye} alt='view'/>:<img src={closeEye} alt='close'/>}</button>
                </div>

                <button type="submit" onClick={handelLoginUser} className="btn btn-primary">login</button>
            </div>
        </>

        
    )
}

export default LoingUser