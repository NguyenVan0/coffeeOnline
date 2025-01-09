import { RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { CartProvider } from './contexts/CartProvider'
import { router } from './routes/Root'

import 'react-toastify/dist/ReactToastify.min.css'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>

      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        transition={Bounce}
        bodyStyle={{ fontSize: '0.875rem', fontFamily: defaultTheme['font-secondary'] }}
      />

      <GlobalStyle />
    </ThemeProvider>
  )
}
