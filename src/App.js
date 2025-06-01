import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from "./LayOut/LayOut";
import Main from "./Main/Main";
import {Loader as MainLoader} from "./Main/Main.jsx"
import LogInAmdSignUp from './LogInAndSingUp/LogInAmdSignUp';
import LogOut from './LogOut/LogOut';
import AccountLayOut from './AccountLayOut/AccountLayOut';
import {Loader as LoginLoader} from "./LogInAndSingUp/LogInAmdSignUp"
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
import Payment from "./Payment/Payment.jsx"
import {Loader as PaymentLoader} from"./Payment/Payment.jsx"
import ErrorElement from './Error/ErrorElement.jsx';
import { Loader as AddProductLoader } from "./AddProduct/AddProduct.jsx"
import { Loader as LogOutLoader } from "./LogOut/LogOut.jsx"
import { Loader as PaymentStatusLoader } from './PaymentStatus/PaymentStatuts.jsx';
import PaymentStatus from './PaymentStatus/PaymentStatuts.jsx';
import TransactionList from './AdmineTransactionManager/ShowTransactionList/TransactionList.jsx';
import {Loader as TransactionListLoader} from "./AdmineTransactionManager/ShowTransactionList/TransactionList.jsx" 
import UsersList from './AdmineUsersManager/UsersList/UsersList.jsx';
import {Loader as UsersListLoader} from './AdmineUsersManager/UsersList/UsersList.jsx'
import AddUser from "./AdmineUsersManager/AddUser/AddUser.jsx"
import ShowUserDetails from "./AdmineUsersManager/ShowUserDetails/ShowUserDetails.jsx"
import UpdateUser from "./AdmineUsersManager/UpdateUser/UpdateUser.jsx"
import ShowTrasactionDetails from "./AdmineTransactionManager/ShowTransactionDetails/ShowTransactionDetails.jsx"
import {Loader as UserDetailsLoader} from "./AdmineUsersManager/ShowUserDetails/ShowUserDetails.jsx"
import { Loader as UpdateUserLoader } from  "./AdmineUsersManager/UpdateUser/UpdateUser.jsx";
import {Loader as ShowTransactionDetailsLoader}from "./AdmineTransactionManager/ShowTransactionDetails/ShowTransactionDetails.jsx"
import ClearCatigoriesForProduct from './ClearProductCatigories/ClearProductCatigories.jsx';
import { Loader as ClearCatigoriesForProductLoader} from"./ClearProductCatigories/ClearProductCatigories.jsx"
function App() {

  const MainRoute = createBrowserRouter(createRoutesFromElements(
       <Route path='/' element={<Layout />} errorElement={<ErrorElement/>}>
       <Route index element={<Main />} loader={MainLoader}/> 
       <Route path='about' element={<h3>About</h3>} />
       <Route path='ShwProductBasedOnCatigory' element={<ShowCatiory/>} loader={ShowProductBasedOnCatigory} />
       <Route path='accountant-access' element={<AccountLayOut />} >
       <Route index element={<LogInAmdSignUp/>} loader={LoginLoader}  /> 
       <Route   path='logout' element={<LogOut/>}  loader={LogOutLoader}/>  
       <Route  path='VerifyEmail'  element={<VerifyEmail/>}  />  
      
      </Route>
      <Route replace={true} path='PaymentStatus'  element={<PaymentStatus/>} loader={PaymentStatusLoader} />  

      <Route path='Admine' element={<AdmineLayOut/>} >
  
      <Route  path='UsersManger' > 

      <Route index  element={<UsersList/>} loader={UsersListLoader} /> 

    <Route path='ShowUserDetails' element={<ShowUserDetails/>} loader={UserDetailsLoader}/>
    <Route path='AddUser' element={<AddUser/>}/>
    <Route path='UpdateUser' element={<UpdateUser/>} loader={UpdateUserLoader}/>

  </Route>

 <Route path='TransactionMangment'>
  
  <Route index element={<TransactionList/>} loader={TransactionListLoader}/> 

  <Route path='ShowTransactionDetails' element={<ShowTrasactionDetails/>} loader={ShowTransactionDetailsLoader}/>

  </Route>

      <Route path='ProductMangment' element={<ProductMangment/>}>
      
      <Route index element={<ProductsList/>} loader={ProductListLoader}  /> 
      <Route path='AddProduct' element={<AddProduct/>} loader={AddProductLoader}/>
      <Route path='UpdateProduct' element={<UpdateProduct/>} loader={UpdateProductLoader}/>
      <Route path='DeleteProduct' element={<DeleteProduct/>} loader={DeleteProductLoader}/>
      <Route path='ClearProductFromSerch' element={<ClearCatigoriesForProduct/>} loader={ClearCatigoriesForProductLoader}/>







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
