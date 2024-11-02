"use client";

import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { PreloaderForm } from "./preloader";
import { ErrorMessageForm } from "./errorMessage";

export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        setLoading(false);

        if (res && !res.error) {
            console.log("[0_0]");
        } else {
            setError(res?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="login__form">
                {loading ?
                <PreloaderForm/> : 
                error ? <ErrorMessageForm/> :
                <>
                    <h3 className="login__form-title">Enter your login information</h3>
                    <input type="email" name="email" placeholder="email@gmail.com" required />
                    <input type="password" name="password" placeholder="123456" required />
                    <button type="submit">Sign In</button>
                </>
                }
            </form>
        </div>
    );
};
