import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Store } from './State/State.ts';
import { Provider } from 'react-redux';
import {registerLicense} from "@syncfusion/ej2-base"
registerLicense("Ngo9BigBOggjHTQxAR8/V1NNaF1cWWhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjXH5YcHNXQ2RdWEFwXElfag==")
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={Store}>
     <App />
    </Provider>
 );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
