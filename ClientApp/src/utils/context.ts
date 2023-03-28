import { createContext } from "react";

const defaultValue: any = {}

const ShopperContext = createContext(defaultValue);
const SellerContext = createContext(defaultValue);

export {
    ShopperContext,
    SellerContext
}