import { store } from '@/src/store'
import { Provider } from 'react-redux'

import Footer from './(Footer)'
import Header from './(Header)'
import './globals.css'

export const metadata = {
  title: 'Shamazon',
  description: 'Make beleive Amazon with the intent of showing off my full-stack skills',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
