'use client'

import { sellerLogIn } from "@/src/redux/slices/sellerSlice";
import { useRouter } from "next/navigation";
// React imports
import { FormEvent, useState, ChangeEvent } from "react"

// Redux imports
import { useDispatch } from "react-redux";

//Util imports
import { validateEmail, validatePassword } from "../../../src/validation";
import { handleSignup } from "./action";

export default function Signup() {
    // Form input state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Form message state
    const [messages, setMessages] = useState({ password: '', email: '' });

    const dispatch = useDispatch();

    const router = useRouter();

    return <main>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                className="border-cyan-900 border m-1"
                value={email}
                required
                onChange={handleEmail}
            ></input>
            <input
                type="password"
                placeholder="Password"
                className="border-cyan-900 border m-1"
                value={password}
                required
                onChange={handlePassword}
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

            {messages.email != '' || messages.password != ''
                ? <div>
                    <p>{messages.email}</p>
                    <p>{messages.password}</p>
                </div>
                : <p></p>}
        </form>
    </main>;

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!validateEmail(email) || !validatePassword(password)) return;

        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password)
        formData.append('name', name)

        clearForm();

        const data = await handleSignup(formData);

        switch (data.status) {
            case 202:
                dispatch(sellerLogIn({seller: data.payload, token: data.token}));
                router.push('/seller')
                break;
            case 409:
                clearForm();
                setMessages({ ...messages, email: data.token });
                break;
            default:
                console.log(data);
                clearForm()
        }
    }

    function handleEmail(e: ChangeEvent<HTMLInputElement>) {
        const targetEmail = e.target.value;

        setEmail(targetEmail);

        if (targetEmail === '') {
            return setMessages({ ...messages, email: '' })
        }

        if (!validateEmail(targetEmail)) {
            setMessages({ ...messages, email: 'Email format is incorrect.' })
        } else {
            setMessages({ ...messages, email: '' })
        }
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        const targetPassword = e.target.value;

        setPassword(targetPassword);

        if (targetPassword === '') {
            return setMessages({ ...messages, password: '' })
        }

        if (!validatePassword(targetPassword)) {
            setMessages({ ...messages, password: 'Password format is incorrect.' })
        } else {
            setMessages({ ...messages, password: '' })
        }
    }

    function clearForm() {
        setEmail('');
        setPassword('');
        setName('');
        setMessages({ email: '', password: '' });
    }
}