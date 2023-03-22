//React imports
import { useContext } from "react"

//Util imports
import { UserContext } from "../utils/context"

//Component imports


export default function Home() {
    const [user, setUser] = useContext(UserContext)

    return <main>
        home
    </main>
}