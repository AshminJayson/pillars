import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function UserSessionComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      {!user && (
        <div className="my-14 flex h-full flex-col items-center justify-center">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-red-500 sm:text-5xl">
            <AlertTriangle size={50} />
            <span className="self-center">Access Denied</span>
          </h1>
          <p className="mt-1 text-lg text-black/70">
            Please login to access this page.
          </p>
          <Link href="/login">
            <Button
              variant="default"
              className="mt-4 text-lg focus:outline-black focus-visible:outline-black">
              Back to Login
            </Button>
          </Link>
          <Image
            src="/crashed-error.svg"
            alt="Logo"
            width={500}
            height={500}
            className="mt-2.5"
          />
        </div>
      )}
      {user && children}
    </>
  );
}
