import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
//COMPONENT / SCREEN IMPORTS
import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import AllProductsScreen from './screens/AllProductsScreen.jsx'
import ProductScreen from './screens/CreateProductScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx' // if we want something private => wrap in this component
//CSS IMPORTS 
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//REDUX IMPORTS 
import store from './store.js'
import { Provider } from 'react-redux'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/all-products' element={<AllProductsScreen />} />
      <Route path='/create' element={<ProductScreen />} />
      {/* PRIVATE ROUTES */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
