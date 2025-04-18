import { useState } from "react";
import GoogleMapComponent from "./Components/GoogleMapsComponent";
import { Navigate } from "react-router-dom";
import "./login.css";  

export function Card({ children, className }) {
    return <div className={`bg-white p-4 rounded shadow ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
    return <div className="card-content">{children}</div>;
}

export function Input({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border p-2 rounded w-full"
        />
    );
}

export function Button({ children, type, className, onClick }) {
    return (
        <button type={type} onClick={onClick} className={`bg-blue-500 text-white p-2 rounded ${className}`}>
            {children}
        </button>
    );
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        setError("");
        console.log("Logging in with", email, password);
        setIsLoggedIn(true);
    };

    if(isLoggedIn) {
        return <Navigate to="/map" />;
    }

    return (
        <div className="login-container"> 
            
            <img
                src="/logo-red-transparent.png"  
                alt="Logo"
                className="logo"
            />

            <div className="welcome-title">Welcome To Better Destination!</div>
            <Card className="w-96 p-6 shadow-lg">
                <CardContent>
                    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}