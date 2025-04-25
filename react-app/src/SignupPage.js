import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Components/Button";
import Card from "./Components/Card";
import CardContent from "./Components/CardContent";
import Input from "./Components/Input";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key1: email, key2: password }),
            });
            if (res.ok) alert("Account created successfully!");
        } catch {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <img src="/logo-red-transparent.png" alt="Logo" className="logo" />
            <div className="welcome-title">Welcome To Better Destination!</div>
            <Card className="w-96 p-6 shadow-lg">
                <CardContent>
                    <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <form onSubmit={handleCreate} className="space-y-4">
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" className="w-full">Signup</Button>
                        <Link to="/"><Button type="button">Back to Home Page</Button></Link>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}