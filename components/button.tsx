'use client';

import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ButtonProps {
  onclick: () => void;
  disabled?: boolean;
  text?: string;
}

export function ButtonWithLink({
  text,
  href,
  props,
}: {
  text: string;
  href: string;
  props?: any;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-block rounded-lg text-center font-sans text-lg font-bold focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      {...props}>
      <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-black px-4 py-2 font-sans font-bold leading-tight text-black transition-colors duration-300 ease-out group-hover:text-white ">
        <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-5 py-3"></span>
        <span className="ease absolute left-0 -ml-2 h-96 w-96 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-black transition-all duration-300 group-hover:-rotate-180"></span>
        <span className="relative">{text}</span>
      </span>
    </Link>
  );
}

export function ButtonWithLinkInvert({
  text,
  href,
  disabled,
}: {
  text: string;
  href: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      disabled={disabled}
      className="group relative mt-5 inline-block rounded-lg text-center font-sans text-lg font-bold invert focus:outline focus:outline-offset-2 focus:outline-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed">
      <span className="relative z-10 block overflow-hidden rounded-lg border border-slate-50 px-4 py-2 font-sans font-bold leading-tight text-black transition-colors duration-300 ease-out focus:outline-none focus-visible:outline-none ">
        <span className="absolute inset-0 h-full w-full rounded-md bg-slate-50 px-5 py-3"></span>
        <span className="ease absolute left-0 -ml-2 h-96 w-96 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-zinc-300 transition-all duration-300 group-hover:-rotate-180"></span>
        <span className="relative flex items-end justify-center gap-2">
          <span>{text}</span>
          <Rocket className="z-30" strokeWidth={2.3} />
        </span>
      </span>
    </button>
  );
}

export function ButtonWithAttributes({ onclick }: ButtonProps) {
  return (
    <>
      <button
        onClick={onclick}
        className="mt-7 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-zinc-400 focus-visible:outline">
        <div className="flex items-center justify-center gap-4 rounded-md border-2 border-black py-2.5 text-xl leading-tight text-black hover:bg-zinc-200 ">
          {/* <Image src={"/google.png"} alt="Google Logo" width={25} height={25} /> */}
          <p className="font-semibold">Sign in with Google</p>
        </div>
      </button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-500" />
        </div>
        <div className="relative my-6 flex justify-center text-base font-medium">
          <span className="bg-white px-2 font-sans tracking-wide text-black">
            OR
          </span>
        </div>
      </div>
    </>
  );
}
