import { redirect } from "next/navigation";

import Login from "@/components/auth/auth-login";
import { ButtonWithLink } from "@/components/button";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const metadata = {
    title: "Log in",
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams?: { status?: string };
}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.getUser();

    if (data.user) {
        return redirect("/dashboard");
    }
    return (
        <div className="container grid h-screen w-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="absolute right-4 top-4 scale-90 items-center justify-center px-3 py-2">
                <ButtonWithLink text="Back" href="/" />
            </div>
            <div className="hidden h-full rounded-3xl bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 lg:flex"></div>
            <div className="mt-5 md:mt-0 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center sm:w-[500px]">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="font-sans text-5xl font-bold tracking-tight text-black">
                            Welcome!
                        </h1>
                        <p className="mt-2 text-center font-sans text-xl font-medium tracking-normal text-slate-600">
                            Please sign in to access your account.
                        </p>
                    </div>
                    <Login />
                </div>
            </div>
        </div>
    );
}
