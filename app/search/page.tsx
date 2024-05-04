import DashboardComponent from "@/components/dashboard/dashboard";
import Usernav from "@/components/dashboard/user-nav";
import SearchComponent from "@/components/search/search";
import Inbox from "@/components/Inbox-requests/inbox";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function SearchPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  if (error || !data?.user) {
    console.log(error);
    redirect("/login");
  }

  return (
    <>
      <div className="flex h-fit flex-col">
        <div className="mt-4 flex items-center px-4 pb-4">
          <div className="flex items-center gap-0.5 lg:flex-1">
            <Image
              unoptimized
              alt="Logo"
              src="/pillars.png"
              height={150}
              width={150}
              className="h-auto"
            />
            {/* <h1 className="text-3xl font-bold">Pillars</h1> */}
          </div>
          <Inbox />
          <div className="ml-auto flex h-full items-center space-x-4">
            <Usernav email={user?.email as string} />
          </div>
        </div>
      </div>
      <SearchComponent />
    </>
  );
}
