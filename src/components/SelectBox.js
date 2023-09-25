import React, { useState } from 'react'

function SelectBox() {
    const [selectLanguage, setSelectLanguage] = useState('')
    const [gender, setGender] = useState('male')
    const getValues=(e)=>{
        setSelectLanguage(e.target.value)
        
    }
    const getRadioValues=(e)=>{
        setGender(e.target.value)
    }

    const saveSelectBox=async ()=>{
         
        let data=await fetch('http://localhost:1500/language',{
            method:'POST',
            body:JSON.stringify({name:selectLanguage,gender}),
            headers:{
                'Content-Type':'application/json'
            }

        })
        data=await data.json()
        console.log(data)
      

    }
  return (
    <>
    <h1>select language here</h1>
    <select value={selectLanguage} onChange={getValues}>
        <option value=''>select language</option>
        <option value='node-js'>node-js</option>
        <option value='react-js'>react-js</option>
        <option value='nuxt-js'>nuxt-js</option>
        <option value='next-js'>next-js</option>
        <option value='three-js'>three-js</option>
        <option value='angular-js'>angular-js</option>
    </select>
    <label htmlFor='gender'>selct gender</label>
    <input type='radio' name='gender' value='male' onChange={getRadioValues} defaultChecked/>
    <input type='radio' name='gender' value='female' onChange={getRadioValues}/>
    <input type='radio' name='gender' value='others' onChange={getRadioValues}/>
    <button type='submit' onClick={saveSelectBox}>save</button>
    </>
  )
}

export default SelectBox