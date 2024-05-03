"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "./action";

export default function Login() {
    return (
        <form>
            <Button
                formAction={signInWithGoogle}
                variant="default"
                className="mt-10 w-full text-lg"
            >
                Sign in with Google
            </Button>
        </form>
    );
}
