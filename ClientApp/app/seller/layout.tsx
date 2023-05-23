'use client'

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { sellerSelector } from "@/src/redux/slices/sellerSlice";

export default function SellerLayout({children}: {children: ReactNode}) {
    const seller = useSelector(sellerSelector);

    const router = useRouter()

    useEffect(() => {
        console.log(seller.seller)
        if(!seller.seller) {
            router.push('/seller/login')
        }
    }, [])

    return <>
        {children}
    </>
}