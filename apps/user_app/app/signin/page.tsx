"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ phone: "", password: "" });
    
    const handleSignIn = async () => {
        try {
            const res = await signIn("credentials", {
                ...credentials,
                redirect: true,
            });
            if(res?.error){
                console.log(res.error);
            }
            else if(res?.url){
                console.log(res);
            
                router.push(res?.url);
            }
            
        } catch (error) {
            console.error("Sign in failed", error);
            // Handle sign in error, e.g., display an error message to the user
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <input
                type="text"
                placeholder="Phone Number"
                value={credentials.phone}
                onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleSignIn} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                Sign in with Email
            </button>
            <button onClick={async () => signIn("google")} className="w-full bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600 transition duration-300 ease-in-out">
                Sign in with Google
            </button>
        </div>
    );
}
