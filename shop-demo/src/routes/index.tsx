import { RouteObject } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Orders from '@/pages/Orders'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <Orders /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]

export const ROUTES = {
  home: '/',
  product: (id: string) => `/product/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  login: '/login',
  register: '/register',
}
