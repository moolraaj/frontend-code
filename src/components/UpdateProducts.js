import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateProducts() {
  const params=useParams()
  const navigate=useNavigate()
  
  
  const [product, setProduct] = useState({
    name:'',
    price:'',
    category:'',
    company:''
  })

  const changeHandler=(e)=>{
    setProduct({...product,[e.target.name]:e.target.value})
  }
  
  useEffect(()=>{
    const findSingleUser=async()=>{
      let data=await fetch(`http://localhost:1500/product/single-product/${params.id}`)
      let result=await data.json()
      setProduct(result)
       
    }
    
findSingleUser()
  },[params])


const updateHandler=async(e)=>{
  e.preventDefault()
  console.log(product.name,product.price,product.category,product.company)
  let data=await fetch(`http://localhost:1500/product/single-product/${params.id}`,{
    method:'PUT',
    body:JSON.stringify({...product}),
    headers:{
      "Content-Type":"application/json"
    }

  })
  let result=await data.json()
  console.log(result)
  if(result){
    navigate('/')
    toast.success('record updated successfully')
  }else{
    toast.error('record not updated successfully')
  }
 

   }

   
 

  return (
    <>
    <Toaster
    position='top-right'
    reverseOrder={false}
    />
     <div className='container my-4'>
      <div className='row'>
      <form>
  <div className="mb-3">
    <label htmlFor="product-name" className="form-label">product name</label>
    <input type="text" name='name' className="form-control" value={product.name} onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="product-price" className="form-label">product price</label>
    <input type="text" name='price' className="form-control" value={product.price} onChange={changeHandler} id="exampleInputPassword1"/>
  </div>

  <div className="mb-3">
    <label htmlFor="product-category" className="form-label">product category</label>
    <input type="text" name='category' className="form-control" value={product.category} onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="product-company" className="form-label">product company</label>
    <input type="text" name='company' className="form-control" value={product.company} onChange={changeHandler} id="exampleInputPassword1"/>
  </div>
   
  <button type="submit" className="btn btn-primary" onClick={updateHandler}>update product</button>
</form>
      </div>
     
     </div>
    </>
  )
}

export default UpdateProducts


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function UpdateProducts() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     category: '',
//     company: '',
//   });

//   const changeHandler = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const findSingleProduct = async () => {
//     try {
//       const response = await fetch(`http://localhost:1500/product/single-product/${params.id}`);
//       if (response.ok) {
//         const result = await response.json();
//         setProduct(result);
//       } else {
//         // Handle error when product is not found
//       }
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//     }
//   };

//   useEffect(() => {
//     findSingleProduct();
//   }, []); // Empty dependency array to run only on mount

//   const updateProduct = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch(`http://localhost:1500/product/single-product/${params.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(product),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         navigate('/'); // Redirect to the home page after successful update
//       } else {
//         // Handle error response
//         console.error('Error updating product:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   return (
//     <div className="container my-4">
//       <div className="row">
//         <form  >
//           <div className="mb-3">
//             <label htmlFor="product-name" className="form-label">
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               value={product.name}
//               onChange={changeHandler}
//               id="product-name"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="product-price" className="form-label">
//               Product Price
//             </label>
//             <input
//               type="text"
//               name="price"
//               className="form-control"
//               value={product.price}
//               onChange={changeHandler}
//               id="product-price"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="product-category" className="form-label">
//               Product Category
//             </label>
//             <input
//               type="text"
//               name="category"
//               className="form-control"
//               value={product.category}
//               onChange={changeHandler}
//               id="product-category"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="product-company" className="form-label">
//               Product Company
//             </label>
//             <input
//               type="text"
//               name="company"
//               className="form-control"
//               value={product.company}
//               onChange={changeHandler}
//               id="product-company"
//             />
//           </div>

//           <button type="submit" className="btn btn-primary" onClick={updateProduct}>
//             Update Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UpdateProducts;
