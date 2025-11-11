import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './Layout/RootLayout'
import Home from './Components/Home/Home'
import AllProducts from './Components/AllProducts/AllProducts'
import AuthProvider from './Contexts/AuthProvider'
import Register from './Components/Register/Register'
import MyProducts from './Components/MyProducts/MyProducts'
import MyBids from './Components/MyBids/MyBids'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import ErrorPage from './Pages/ErrorPage'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CreateAProduct from './Components/CreateAProduct/CreateAProduct'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: '/allProducts',
        Component: AllProducts,
      },

      {
        path: '/register',
        Component: Register,
      },

      {
        path: '/myProducts',
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: '/mybids',
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },

      {
        path: '/productDetails/:id',
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://smart-deals-server-ochre.vercel.app/products/${params.id}`),
      },

      {
        path: '/createaproduct',
        element: (
          <PrivateRoute>
            <CreateAProduct></CreateAProduct>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: '*',
    element: <ErrorPage></ErrorPage>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
)
