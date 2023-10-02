import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    price: '',
    company: '',
  });
  const [error, setError] = useState(false);
  const [productname, setProductname] = useState('');
  const [category, setCategory] = useState('mobile');
  const [image, setImage] = useState(null);
  const [exportproduct, setExportproduct] = useState([]); 

  const getProductInfo = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const getImageValue = (e) => {
    setImage(e.target.files[0]);
  };

  const getSelectBoxValue = (e) => {
    setProductname(e.target.value);
  };

  const getRadioBoxValue = (e) => {
    setCategory(e.target.value);
  };

  const productExportHandler=(exportcity)=>{
    const updateProductExport=[...exportproduct]
    if(updateProductExport.includes(exportcity)){
      updateProductExport.splice(updateProductExport.indexOf(exportcity),1)
    }else{
       updateProductExport.push(exportcity)
    }
    setExportproduct(updateProductExport)

}

const getProductValue=(exportcity)=>{
  return exportproduct.includes(exportcity)?exportcity:""

}



  const addProductHandler = async (e) => {
    e.preventDefault();

 

    if (!product.price || !product.company || !image || !productname || !category ||!exportproduct) {
      setError(true);
      return false;
    } else {
      setProduct({
        price: '',
        company: '',
      });
      const userID = JSON.parse(localStorage.getItem('users'))._id;
      const formData = new FormData();
      formData.append('price', product.price);
      formData.append('company', product.company);
      formData.append('upload', image);
      formData.append('productname', productname);
      formData.append('category', category);
      formData.append('userID', userID);
      formData.append('exportproduct', exportproduct);
      console.log(userID)

      

      try {
        let data = await fetch('http://localhost:1500/product/add-product', {
          method: 'POST',
          body: formData
        });

        let result = await data.json();
        console.log(result);
        toast.success('Product inserted successfully');
        navigate('/');
      } catch (error) {
        console.error(error);
        toast.error('There is an error, product not inserted');
        navigate('/');
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
        <input type="file"  id="" onChange={getImageValue}/>
      </div>
      <div className="mb-3">
      <label htmlFor="price" className="form-label">select product name</label>
  <select className="form-select" value={productname} onChange={getSelectBoxValue} aria-label="Default select example">
  <option value=''>select product name</option>
  <option value="infinix">infinix</option>
  <option value="samsung">samsung</option>
  <option value="nokia">nokia</option>
  <option value="redmi">redmi</option>
  <option value="vivo">vivo</option>
  <option value="poco">poco</option>
  <option value="moto">moto</option>
  <option value="realme">realme</option>
  <option value="i-phone-max-pro-14">1 phone max pro 14</option>
</select>
 </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">product price</label>
    <input type="text" className="form-control"  name='price'onChange={getProductInfo} value={product.price} />
    {error&&!product.price&&<span className='error'>enter product price</span>}
  </div>

   
  <div className="mb-3">
  <label htmlFor="category" className="form-label">select product category</label>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" value='mobile' onChange={getRadioBoxValue}  id="flexRadioDefault1" defaultChecked/>
  <label className="form-check-label" htmlFor="flexRadioDefault1">
   mobile
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" value='tablet' onChange={getRadioBoxValue} id="flexRadioDefault2" />
  <label className="form-check-label" htmlFor="flexRadioDefault2">
  tablet
  </label>
</div>
</div>
<div className="mb-3">
<label htmlFor="exportproducts" className="form-label">select product export city</label>
<div className="form-check">
 
  <input className="form-check-input" type="checkbox" value={getProductValue('shimla')} id="flexCheckDefault" checked={exportproduct.includes('shimla')}  onChange={()=>productExportHandler('shimla')}/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    shimla
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value={getProductValue('chandigarh')} id="flexCheckChecked" checked={exportproduct.includes('chandigarh')} onChange={()=>productExportHandler('chandigarh')}/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
   chandigarh
  </label>
</div>

<div className="form-check">
 
  <input className="form-check-input" type="checkbox" value={getProductValue('delhi')} id="flexCheckDefault" checked={exportproduct.includes('delhi')} onChange={()=>productExportHandler('delhi')}/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    delhi
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value={getProductValue('kullu')} id="flexCheckChecked" checked={exportproduct.includes('kullu')} onChange={()=>productExportHandler('kullu')}/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
   kullu
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value={getProductValue('anni')} id="flexCheckDefault" checked={exportproduct.includes('anni')} onChange={()=>productExportHandler('anni')}/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    anni
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value={getProductValue('hayiyana')} id="flexCheckChecked" checked={exportproduct.includes('hayiyana')} onChange={()=>productExportHandler('hayiyana')}/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
   hayiyana
  </label>
</div>

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