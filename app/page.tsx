"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
    const navigation = [{ name: "Contact", href: "mailto:pratik@shikha.ai" }];
    const handleButtonClick = (href: string) => {
        window.location.href = href;
    };
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-between">
            <div className="bg-white">
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav
                        className="flex items-center justify-between p-6 lg:px-8"
                        aria-label="Global"
                    >
                        {/* <div className="flex lg:flex-1">
              <Image
                unoptimized
                alt="Logo"
                src="/logo.png"
                width={150}
                height={25}
                className="h-auto"
              />
            </div> */}

                        <div className="hidden lg:flex lg:justify-end lg:gap-x-5">
                            {navigation.map((item) => (
                                <Button
                                    onClick={() => handleButtonClick(item.href)}
                                    variant={"outline"}
                                    key={item.name}
                                    className="flex self-center text-lg"
                                >
                                    {item.name}
                                </Button>
                            ))}
                            <a
                                href="/login"
                                className="rounded-md bg-black px-3.5 py-1 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Log in
                            </a>
                        </div>
                    </nav>
                </header>

                <div className="relative isolate pt-14">
                    <div className="mx-auto max-w-4xl py-32 text-center sm:py-48 lg:py-32">
                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
                            <span className="relative whitespace-nowrap text-[#f4676d]">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 418 42"
                                    className="absolute left-0 top-2/3 h-[0.58em] w-full fill-[#f4676d]/30"
                                    preserveAspectRatio="none"
                                >
                                    <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                                </svg>
                                <span className="relative">Pillars</span>
                            </span>{" "}
                        </h1>

                        {/* <Link href={"/login"}> */}
                        {/* <button className="group mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-lg font-semibold text-white hover:bg-slate-700 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-800 active:text-slate-300">
                                Get Started
                            </button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </main>
    );
}
