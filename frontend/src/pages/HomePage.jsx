import React from 'react';
import { UserButton } from '@clerk/clerk-react';

const HomePage = () => {
    return (
        <div className="p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Welcome to Slack Clone</h1>
                <UserButton />
            </header>
            <main>
                <p>You are successfully signed in!</p>
            </main>
        </div>
    );
};

export default HomePage;
