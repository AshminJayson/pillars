import DashboardComponent from "@/components/dashboard/dashboard";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;
    if (error || !data?.user) {
        console.log(error);
        redirect("/login");
    }

    return <DashboardComponent email={user?.email as string} />;
}
