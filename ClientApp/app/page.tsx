'use client'

//React imports

import { useEffect } from "react";

//Util imports

//Component imports

export default async function Home() {
    useEffect(() => {
        localStorage.removeItem('isShopper');
        localStorage.setItem('isShopper', 'true');
    }, [])

    return <main>
        home
    </main>;
}