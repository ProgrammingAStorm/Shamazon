'use client'

import React, { useEffect } from "react";
import Footer from './(Footer)'
import Header from './(Header)'
import { Provider } from 'react-redux'
import { store } from '@/src/redux/store'

export default function App({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    return <Provider store={store}>
        <Header />
        {children}
        <Footer />
    </Provider>
}