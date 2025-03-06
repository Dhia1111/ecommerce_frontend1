import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from "./LayOut/LayOut";
import Main from "./Main/Main";
import LogInAmdSignUp from './LogInAndSingUp/LogInAmdSignUp';
import LogOut from './LogOut/LogOut';
import AccountLayOut from './AccountLayOut/AccountLayOut';
import {Loader as LoginLoader} from "./LogInAndSingUp/LogInAmdSignUp"
import {Loader as VerifyEmailLoader} from "./VerifyEmail/VerifyEmail.jsx"
import VerifyEmail from './VerifyEmail/VerifyEmail.jsx'
import Cart from './Cart/Cart.jsx';
function App() {
  const MainRoute = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Main />} /> 
      <Route path='about' element={<h3>About</h3>} />
      <Route path='cart-items' element={<Cart/>} />
      <Route path='accountant-access' element={<AccountLayOut />}>
        <Route index element={<LogInAmdSignUp/>} loader={LoginLoader} /> 
        <Route path='logout' element={<LogOut/>} />  
        <Route path='VerifyEmail' element={<VerifyEmail/>} loader={VerifyEmailLoader} />  
      </Route>
    </Route>
  ));

  return (
    <div className="App">
      <RouterProvider router={MainRoute} />
    </div>
  );
}

export default App;
