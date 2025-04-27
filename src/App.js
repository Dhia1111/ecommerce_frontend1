import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from "./LayOut/LayOut";
import Main from "./Main/Main";
import {Loader as MainLoader} from "./Main/Main.jsx"
import LogInAmdSignUp from './LogInAndSingUp/LogInAmdSignUp';
import LogOut from './LogOut/LogOut';
import AccountLayOut from './AccountLayOut/AccountLayOut';
import {Loader as LoginLoader} from "./LogInAndSingUp/LogInAmdSignUp"
import {Loader as VerifyEmailLoader} from "./VerifyEmail/VerifyEmail.jsx"
import VerifyEmail from './VerifyEmail/VerifyEmail.jsx'
import AdmineLayOut from './AdmineLayout/AdmineLayout.jsx';
import ProductMangment from './ProductMangment/ProductMangment.jsx';
import AddProduct from './AddProduct/AddProduct.jsx';
import ProductsList from './ProductList/ProductsList.jsx';
import { Loader as ProductListLoader } from './ProductList/ProductsList.jsx';
import UpdateProduct from './UpdateProduct/UpdateProduct.jsx';
import {Loader as UpdateProductLoader} from "./UpdateProduct/UpdateProduct.jsx"
import DeleteProduct from "./DeleteProduct/DeleteProduct.jsx"
import {Loader as DeleteProductLoader} from "./DeleteProduct/DeleteProduct.jsx"
import {Loader as ShowProductBasedOnCatigory} from "./ShowProductListForCatigory/ShowProductListForCatigory.jsx"
import ShowCatiory from './ShowProductListForCatigory/ShowProductListForCatigory.jsx';
import  Payment from "./Payment/Payment.jsx"
import {Loader as PaymentLoader} from"./Payment/Payment.jsx"
import {Loader as AdmineLoader} from"./AdmineLayout/AdmineLayout.jsx";
import ErrorElement from './Error/ErrorElement.jsx';
import { Loader as AddProductLoader } from "./AddProduct/AddProduct.jsx"
import { Loader as LogOutLoader } from "./LogOut/LogOut.jsx"

function App() {
  const MainRoute = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorElement/>}>
      <Route index element={<Main />} loader={MainLoader}/> 
      <Route path='about' element={<h3>About</h3>} />
       <Route path='ShwProductBasedOnCatigory' element={<ShowCatiory/>} loader={ShowProductBasedOnCatigory} />
      <Route path='accountant-access' element={<AccountLayOut />} errorElement={<h2>An error due to fetching </h2>}>
        <Route index element={<LogInAmdSignUp/>} loader={LoginLoader}  /> 
        <Route   path='logout' element={<LogOut/>}  loader={LogOutLoader}/>  
        <Route replace={true} path='VerifyEmail'  element={<VerifyEmail/>} loader={VerifyEmailLoader} />  
      
      </Route>
      <Route path='Admine' element={<AdmineLayOut/>} loader={AdmineLoader} errorElement={<h2>An error due to fetching </h2>}>

      <Route path='ProductMangment' element={<ProductMangment/>}>
      
      <Route index element={<ProductsList/>} loader={ProductListLoader}  /> 
      <Route path='AddProduct' element={<AddProduct/>} loader={AddProductLoader}/>
      <Route path='UpdateProduct' element={<UpdateProduct/>} loader={UpdateProductLoader}/>
      <Route path='DeleteProduct' element={<DeleteProduct/>} loader={DeleteProductLoader}/>

</Route>
      
      </Route>

      <Route path='Cart' element={<Payment/>} loader={PaymentLoader}/>  
      </Route>

  ));

  return (
    <div className="App">
      <RouterProvider router={MainRoute} />
    </div>
  );
}

export default App;
