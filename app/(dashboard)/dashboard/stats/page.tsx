import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StatsComponent } from "@/components/dashboard/stats";

const Plot = dynamic(() => import("react-plotly.js"), {
    ssr: false,
});

export default async function Page() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;
    if (error || !data?.user) {
        console.log(error);
        redirect("/login");
    }

    return <StatsComponent email={user?.email as string} />;
}
