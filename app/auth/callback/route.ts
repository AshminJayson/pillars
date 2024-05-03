import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        try {
            await supabase.auth.exchangeCodeForSession(code);
        } catch (error) {
            console.error("Error exchanging code for session", error);
            return NextResponse.redirect(`${origin}/login`);
        }
    }

    return NextResponse.redirect(`${origin}/dashboard`);
}
