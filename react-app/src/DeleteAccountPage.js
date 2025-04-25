import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";  
import Button from "./Components/Button";
import Card from "./Components/Card";
import CardContent from "./Components/CardContent";
import Input from "./Components/Input";

export default function DeleteAccountPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key1: email, key2: password }),
            });
            if (res.ok) alert("Account deleted.");
            else setError("Deletion failed.");
        } catch {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <img src="/logo-red-transparent.png" alt="Logo" className="logo" />
            <h1 className="welcome-title">Were sorry to see you go</h1>
            <Card className="w-96 p-6 shadow-lg">
                <CardContent>
                    <h2 className="text-2xl font-bold text-center mb-4">Delete Account</h2>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" className="w-full">Delete</Button>
                    <Link to="/"><Button type="button">Back To Home Page</Button></Link>
                </CardContent>
            </Card>
        </div>
    );
}