'use client'

// React imports
import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link";

//Util imports
import { validateEmail, validatePassword } from "@/src/validation";
import { handleLogin } from "./actions";

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState({ password: '', email: '' });

    return <main>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                className="border-cyan-900 border m-1"
                name="email"
                value={email}
                required
                onChange={handleEmail}
            ></input>
            <input
                type="password"
                placeholder="Password"
                className="border-cyan-900 border m-1"
                name="password"
                value={password}
                required
                onChange={handlePassword}
            ></input>

            <button type="submit" className="border-cyan-900 border m-1 p-1">Submit</button>

            {messages.email != '' || messages.password != ''
                ? <div>
                    <p>{messages.email}</p>
                    <p>{messages.password}</p>
                </div>
                : <p></p>}
        </form>

        <Link href="/seller/signup">Create account?</Link>
    </main>

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!validateEmail(email) || !validatePassword(password)) return;

        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        const data = await handleLogin(formData);

        switch (data.status) {
            case 202:
                console.log(data)
                break;
            case 409:
                setMessages({ ...messages, email: data.token });
                clearForm()
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
        setMessages({ email: '', password: '' });
    }
}