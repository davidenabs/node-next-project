import Link from 'next/link';
import React from 'react'
import { Title } from 'rizzui';


const AppLogo = () => {
    return (
        <Link href={'/'}><Title as="h1" className="text-gray-700">App<span className="text-green-500">Logo</span></Title></Link>
    )
}

export default AppLogo;

