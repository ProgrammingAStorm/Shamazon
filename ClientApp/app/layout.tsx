import './globals.css'

import App from './(App)'

export const metadata = {
  title: 'Shamazon',
  description: 'Make beleive Amazon with the intent of showing off my full-stack skills',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] 
}) {
  return (
    <html lang="en">
      <body>
        <App>
          {children}
        </App>
      </body>
    </html>
  )
}
