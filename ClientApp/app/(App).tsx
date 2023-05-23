'use client'

import React from "react";
import { Provider } from 'react-redux'
import { store } from '@/src/redux/store'

import Footer from './(Footer)'
import Header from './(Header)'

export default function App({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    return <Provider store={store}>
        <Header />
        {children}
        <Footer />
    </Provider>
}