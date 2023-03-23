//React imports
import { useContext } from "react"

//Util imports
import { UserContext } from "../../utils/context"

//Component imports


export default function SellerHome() {
    const [user, setUser] = useContext(UserContext)

    return <main>
        seller home
    </main>
}