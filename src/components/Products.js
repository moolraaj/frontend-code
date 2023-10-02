import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
 
function Products() {
  const [products, setProducts] = useState([])
 
 
  
  
  
  useEffect(()=>{
    loadAllProducts()
  },[])
  const loadAllProducts=async()=>{
    let data=await fetch(' http://localhost:1500/product/get-product')
    let result=await data.json()
    setProducts(result)
    console.log(result)
  
    
   

  }
  const deleteProduct=async (id)=>{
    console.log(id)
    if(window.confirm('Are you sure you  want to delete this product')){
      let data=await fetch(`http://localhost:1500/product/delete-product/${id}`,{
        method:'DELETE'
      })
      let result=await data.json()
      if(result){
        console.log('record delete')
      }
      loadAllProducts()
      toast.success('product deleted successfully')
    
  
    
    }else{
      toast.error('no more product deleted')
    }
  }
const handlerSearch=async (e)=>{
  e.preventDefault()
  const key=e.target.value
 
   
  if(key){
    try {
      let data=await fetch(`http://localhost:1500/product/search-product/${key}`)
      let result=await data.json()
      if(result){
        setProducts(result)
        
      }else{
        loadAllProducts()
      }
    } catch (error) {
      console.error('some issue', error);
    }
  }else{
    loadAllProducts()
  }
   
}

 



 

 

 


 

  
 
  return (
    <>
<Toaster
  position="top-right"
  reverseOrder={false}
/>
 <div className='container'>
  <div className='row'>
    <div className='col-md-2 my-4'>
 
    </div>

    <div className='col-md-10 my-4'>
    <form className="d-flex my-6" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handlerSearch} />
        
      </form> 
      <div className='d-flex flex-wrap '>
       { products.length!==0 ? products.map((items,index)=>{ 
       return <div className='col-md-4 my-3' key={index}>
        <div className="card" >
  
  <div className="card-body">
  
  <img src={items.productImageUrl} className="card-img-top" alt={items.productImageName}/>
    <h6 className="card-title"><b>product name</b>  {items.productname}</h6>
    <h6 className="card-text"><b>product price</b>  {items.price}</h6>
    <h6 className="card-text"><b>product category</b>   {items.category}</h6>
    <h6 className="card-text"><b>product company</b>  {items.company}</h6>
    <h6 className="card-text"><b>product export cities</b>  {items.exportproduct}</h6> 
    <div className="d-flex justify-content-between">
    <button type="button" className="btn btn-danger my-3" onClick={()=>deleteProduct(items._id)}>delete</button>
    <button type="button" className="btn btn-primary my-3"><NavLink className='update-link' to={`/update-products/${items._id}`}  >update</NavLink></button>
    </div>
 
    
     
  </div>
</div>
        </div>
       
       
      
      }):<div className="alert alert-danger my-4" role="alert">
     No result found try once again
    </div>}

    </div>
 
   
    </div>
  </div>
 </div>





    
    </>
  )
}

export default Products