import { createContext } from "react";

// interface UserInterface {
//     user: String,
//     setUser: Function
// }
const defaultValue: any = {}

const UserContext = createContext(defaultValue);

export {
    UserContext
}