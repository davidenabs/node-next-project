import React from 'react';
import Link from 'next/link'; // Adjust if you're using a different routing method
import { Title } from 'rizzui';

const NotAuthenticatedPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
            <div className="flex grow items-center px-5 max-md:w-full w-6/12 mx-auto">
                <div className="mx-auto text-center">
                    <Title
                        as="h4"
                        className="font-bold leading-normal text-gray-1000 "
                    >
                        You must be logged in to access this page. Please log in or register to continue.
                    </Title>

                    <div className="flex flex-col mt-10 space-y-4">
                        <Link href="/login" className="w-full bg-blue-600 text-white py-2 rounded-lg text-center">
                            Log In
                        </Link>
                        <Link href="/register" className="w-full bg-yellow-400 text-black py-2 rounded-lg text-center">
                            Register
                        </Link>
                    </div>

                    <div className="mt-20 w-full text-center">
                        <Link href="/" className="text-gray-500 underline">
                            Go back to Home
                        </Link>
                    </div>


                </div>
            </div>
        </div>

    );
};

export default NotAuthenticatedPage;
