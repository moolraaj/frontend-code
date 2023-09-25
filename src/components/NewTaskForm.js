import React, { useState } from 'react'

function NewTaskForm() {
    const [data, setData] = useState({
        name:'',
        email:'',
        password:''
    })
    const [subjects,setSubjects]=useState([])



const getInputValues=(e)=>{
    setData({...data,[e.target.name]:e.target.value})

}

const getCheckboxValue=(subject)=>{
    const updatedSubjects=[...subjects]
    if(updatedSubjects.includes(subject)){
        updatedSubjects.splice(updatedSubjects.indexOf(subject),1)
    }else{
        updatedSubjects.push(subject) 
    }

    setSubjects(updatedSubjects)

}
    const storedData=async()=>{

        let response=await fetch('http://localhost:1500/data',{
            method:'POST',
            body:JSON.stringify({...data,subjects}),
            headers:{
                "Content-Type":"application/json"

            }

        })
        try {
            let result=await response.json()
            if(result){
                console.log(result)
                setSubjects([])
                setData({
                    name:'',
                    email:'',
                    password:''
                })
            }else{
                console.log('no result stored')
            }
        } catch (error) {
            alert('no data stoed into data bbase')
            
        }
        
    }
    const getValue=(subject)=>{
        return subjects.includes(subject)?subject:''


    }

  return (


    
    <>
    <div className=''>
        <input type='text' name='name' value={data.name} placeholder='enter your name' onChange={getInputValues}/> 
        <input type='email' name='email' value={data.email} placeholder='enter your email' onChange={getInputValues}/> 
        <input type='password' name='password' value={data.password} placeholder='enter your password' onChange={getInputValues}/> 
        <h3>select languages</h3>
    <label htmlFor='node js'>node js
    <input type='checkbox' name='node-js' value={getValue('node-js')} checked={subjects.includes('node-js')}  onChange={()=>getCheckboxValue('node-js')}/></label>

    <label htmlFor='node js'>react js
    <input type='checkbox' name='react-js' value={getValue('react-js')} checked={subjects.includes('react-js')}  onChange={()=>getCheckboxValue('react-js')}/></label>

    <label htmlFor='node js'>vue js
    <input type='checkbox' name='vue-js'value={getValue('vue-js')} checked={subjects.includes('vue-js')}  onChange={()=>getCheckboxValue('vue-js')}/></label>

    <label htmlFor='node js'>next js
    <input type='checkbox' name='next-js' value={getValue('next-js')} checked={subjects.includes('next-js')}  onChange={()=>getCheckboxValue('next-js')}/></label>
    <button type='sumbit' onClick={storedData}>add data</button>
    </div>
    
    </>
  )
}

export default NewTaskForm
