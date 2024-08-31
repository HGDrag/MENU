import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
//COMPONENT / SCREEN IMPORTS
import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import AllProductsScreen from './screens/AllProductsScreen.jsx'
import CreateProductScreen from './screens/CreateProductScreen.jsx'
import UpdateProductScreen from './screens/UpdateProductScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import UpdateReviewScreen from './screens/UpdateReviewScreen.jsx'
import { AuthRoute, RoleRoute } from './components/PrivateRoute.jsx'
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
      <Route path='/products' element={<AllProductsScreen />} />
      {/* PRIVATE ROUTES */}
      <Route path='' element={<AuthRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/profile/reviews/review/:id' element={<UpdateReviewScreen />} />
      </Route>
      <Route path='' element={<RoleRoute />}>
        <Route path='/create' element={<CreateProductScreen />} />
        <Route path='/products/product/:id/update/' element={<UpdateProductScreen />} />
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
