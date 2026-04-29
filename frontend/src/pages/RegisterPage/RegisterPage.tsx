import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.scss";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { register, registerLoading, registerError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        try {
            await register(email, password);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const isPasswordMismatch =
        confirmPassword && password !== confirmPassword;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>Create account</h1>
                <p className={styles.subtitle}>
                    Sign up to get started
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        type="email"
                    />

                    <label className={styles.label}>Password</label>
                    <input
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        type="password"
                    />

                    <label className={styles.label}>Confirm Password</label>
                    <input
                        className={styles.input}
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        placeholder="••••••••"
                        type="password"
                    />

                    {isPasswordMismatch && (
                        <div className={styles.error}>
                            Passwords do not match
                        </div>
                    )}

                    {registerError && (
                        <div className={styles.error}>
                            Failed to register
                        </div>
                    )}

                    <button
                        className={styles.button}
                        disabled={
                            registerLoading ||
                            !email ||
                            !password ||
                            password !== confirmPassword
                        }
                        type="submit"
                    >
                        {registerLoading
                            ? "Creating account..."
                            : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}