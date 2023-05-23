'use client'

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { sellerSelector } from "@/src/redux/slices/sellerSlice";
import { setShopperFalse } from "@/src/redux/slices/userSlice";

export default function SellerLayout({children}: {children: ReactNode}) {
    const seller = useSelector(sellerSelector);

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        dispatch(setShopperFalse())

        if(!seller.seller) {
            router.push('/seller/login')
        }
    }, [])

    return <>
        {children}
    </>
}