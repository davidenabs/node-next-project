import React from 'react'
import { Loader } from 'rizzui';

const AppLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader variant="spinner" />
        </div>
    );
}

export default AppLoader;
