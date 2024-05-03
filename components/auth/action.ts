"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { objectToQueryString } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export async function signInWithGoogle() {
    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { url },
        error,
    } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        const data = {
            title: "Error!",
            description: "Could not authenticate user. Please try again!",
            type: "message",
        };
        return redirect("/login?" + objectToQueryString(data));
    }
    revalidatePath(url as string, "layout");
    return redirect(url!);
}

export const signInWithEmail = async (formData: FormData) => {
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        const data = {
            title: "Error!",
            description: error,
            status: "error",
            type: "error",
        };
        return redirect("/login?" + objectToQueryString(data));
    }

    const data = {
        title: "Email Sent Successfully!",
        description: "Please check your email for the login magic link.",
        status: "success",
        type: "message",
    };
    return redirect("/login?" + objectToQueryString(data));
};

export const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    const data = {
        title: "Logged Out Successfully!",
        description: "You have been logged out!",
        type: "message",
    };
    return redirect("/login?" + objectToQueryString(data));
};
