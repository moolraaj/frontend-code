import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function AddProducts() {
  const navigate=useNavigate()
  const [product, setProduct] = useState({
    name:'',
    price:'',
    category:'',
    company:''

  })
  const [error, setError] = useState(false)
  const getProductInfo=(e)=>{

setProduct({...product,[e.target.name]:e.target.value})


  }

  const addProductHandler = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.category || !product.company) {
      setError(true);
      return false;
    } else {
      setProduct({
        name:'',
        price:'',
        category:'',
        company:''
    
      })
        const userID = JSON.parse(localStorage.getItem('users'))._id;
        console.log(userID);
        let data = await fetch('http://localhost:1500/product/add-product', {
          method: 'POST',
          body: JSON.stringify({ ...product, userID }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        try {
          let result = await data.json();
          console.log(result);
          toast.success('product inserted successfully')
          navigate('/') 
        } catch (error) {
          toast.error('there is an error product not insert')
          navigate('/') 
          
        }
       
    }
  };
  
  return (
     <>

<Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className='container my-4'>
      <form>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">product name</label>
    <input type="text" className="form-control" name='name' onChange={getProductInfo} value={product.name} aria-describedby="emailHelp"/>
    {error&&!product.name&&<span className='error'>enter product name</span>}
    
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">product price</label>
    <input type="text" className="form-control"  name='price'onChange={getProductInfo} value={product.price} />
    {error&&!product.price&&<span className='error'>enter product price</span>}
  </div>

  <div className="mb-3">
    <label htmlFor="category" className="form-label">product category</label>
    <input type="text" className="form-control"  name='category' onChange={getProductInfo} value={product.category} aria-describedby="emailHelp"/>
    {error&&!product.category&&<span className='error'>enter product category</span>}
    
  </div>

  <div className="mb-3">
    <label htmlFor="company" className="form-label">product company</label>
    <input type="text" className="form-control" name='company' onChange={getProductInfo} value={product.company}  aria-describedby="emailHelp"/>
    {error&&!product.company&&<span className='error'>enter product company</span>}
    
  </div>
   
  <button type="submit" onClick={addProductHandler} className="btn btn-primary">add product</button>
</form>
      </div>
     </>
  )
}

export default AddProducts