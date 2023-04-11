'use client'

// React imports
import { FormEvent, useState, useContext, useEffect } from "react"
import Link from "next/link";

//Util imports
//import { SellerContext } from "../../../../temp_files/src/utils/context";
import { validateEmail, validatePassword } from "../../../src/validation";

export default function Signup() {
    // Form input state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Form message state
    const [message, setMessage] = useState('');

    // Navigator
    // const navigate = useNavigate();

    // const [seller, setSeller] = useContext(SellerContext);

    // useEffect(() => {
    //     if (seller.token !== '') navigate('/')
    // }, []);

    return <main>
        <form onSubmit={event => handleLogin(event)}>
            <input
                type="email"
                placeholder="Email"
                className="border-cyan-900 border m-1"
                value={email}
                required
                onChange={event => setEmail(event.target.value)}
            ></input>
            <input
                type="password"
                placeholder="Password"
                className="border-cyan-900 border m-1"
                value={password}
                required
                onChange={event => setPassword(event.target.value)}
            ></input>
            <input
                type="text"
                placeholder="Name"
                className="border-cyan-900 border m-1"
                value={name}
                required
                onChange={event => setName(event.target.value)}
            ></input>

            <button type="submit" className="border-cyan-900 border m-1 p-1">Submit</button>

            {message != '' ? <p>{message}</p> : <p></p>}
        </form>
    </main>;

    async function handleLogin(event: FormEvent) {
        event.preventDefault()

        if (!validateEmail(email)) {
            clearForm();
            return setMessage("Email is not valid.");
        }

        if (!validatePassword(password)) {
            clearForm();
            return setMessage("Password is not valid.");
        }

        clearForm();

        console.log(email, password, name)

        // const request = await fetch(`/api/sellers/signup`, {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json; charset=utf-8"
        //     },
        //     body: JSON.stringify({
        //         Name: name,
        //         Email: email,
        //         Password: password
        //     })
        // });
        // const response = await request.json();

        // switch (request.status) {
        //     case 409:
        //         setMessage(response.message);

        //         break;
        //     case 202:
        //         localStorage.setItem('seller-token', response.token)

        //         setSeller({ token: response.token })

        //         navigate('/seller')

        //         break;
        //     default:
        //         console.log("status", request.status)
        //         console.log(response)
        // }
    }

    function clearForm() {
        setEmail('');
        setPassword('');
        setName('');
        setMessage('');
    }
}