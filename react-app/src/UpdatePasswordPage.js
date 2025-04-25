import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Components/Button";
import Card from "./Components/Card";
import CardContent from "./Components/CardContent";
import Input from "./Components/Input";

export default function UpdatePasswordPage() {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!email || !oldPassword || !newPassword) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/update-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, oldPassword, newPassword }),
            });
            if (res.ok) alert("Password updated successfully!");
            else setError("Failed to update password.");
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
                    <h2 className="text-2xl font-bold text-center mb-4">Update Password</h2>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <Button type="submit" className="w-full">Update</Button>
                        <Link to="/"><Button type="button">Back to Home Page</Button></Link>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}