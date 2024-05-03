"use server";
import { cookies } from "next/headers";
import { createClient } from "./server";

export async function addOnboardingDetails(data: any) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    try {
        const { error } = await supabase.from("onboarding").insert([
            {
                uid: data.uid,
                name: data.name,
                school_name: data.school_name,
                location: data.location,
                subject: data.subject,
                experience: data.experience,
                username: data.username,
            },
        ]);
        if (error) {
            throw new Error(error.message);
        }
        console.log('Data added to the "onboarding" table');
    } catch (error) {
        console.error('Error adding data to the "onboarding" table:', error);
        throw new Error();
    }
}
