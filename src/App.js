 import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import AddProducts from './components/AddProducts';
import UpdateProducts from './components/UpdateProducts';
import Products from './components/Products';
import PrivateComponent from './components/PrivateComponent';
import LoingUser from './components/LoingUser';
import Profile from './components/Profile';
 
import NewTaskForm from './components/NewTaskForm';
import UploadImage from './components/images/UploadImage';
import SelectBox from './components/SelectBox';
 
function App() {
  return (
 <>

 <BrowserRouter>
 <Navbar/>

 <Routes>
  
  <Route element={<PrivateComponent/>}>
 <Route path='/' element={<Products/>}/>
 <Route path='/add-products' element={<AddProducts/>}/>
 <Route path='/update-products/:id' element={<UpdateProducts/>}/>
 <Route path='/profile' element={<Profile/>}/>
 </Route>
  <Route path='/sign-up' element={<SignUp/>}/>
  <Route path='/login' element={<LoingUser/>}/>
 </Routes>
 </BrowserRouter> 

 
 <NewTaskForm/>
 <UploadImage/>
 <SelectBox/>
 

 
 
 </>
  );
}

export default App;
