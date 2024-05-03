"use client";
import { createClient } from "@/lib/supabase/client";
// import { getUsername } from '@/lib/supabase/helpers';
import { useEffect, useState } from "react";
import UserNav from "./user-nav";

import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const optionsList = [
    {
        name: "I want to analyze my class",
        href: "/supporters",
        cta: (
            <p>
                Open <span className="font-bold">Pillars of Support</span>
            </p>
        ),
        className: "col-span-2 row-span-2",
        background: (
            <div className="min-h-[30vh] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                <div className="min-h-[30vh] w-full bg-[url('/film_grain.png')]  bg-cover bg-no-repeat" />
            </div>
        ),
    },
];

export default function DashboardComponent({ email }: { email: string }) {
    const supabase = createClient();
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            const user = await supabase.auth.getUser();
            // const username = await getUsername(user.data.user?.id as string);
            const username = "Testing";
            setName(username);
        };
        fetchUser();
    }, []);

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                delay: 0.25,
            }}
        >
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
                        <h1 className="text-3xl font-bold">Pillars</h1>
                    </div>
                    <div className="ml-auto flex h-full items-center space-x-4">
                        <UserNav email={email} />
                    </div>
                </div>

                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        delay: 0.25,
                        staggerChildren: 0.6,
                        staggerDirection: -1,
                    }}
                >
                    <motion.h1 className="mt-8 flex items-center px-56 pb-2 text-3xl">
                        Hey there,
                        <span className="mx-2 flex items-center font-semibold ">
                            {name && `${name}!`}{" "}
                            {!name && (
                                <div className="mx-2 space-y-1">
                                    <Skeleton className="h-2 w-[75px]" />
                                    <Skeleton className="h-2 w-[100px]" />
                                </div>
                            )}
                        </span>
                        How are you feeling today?
                    </motion.h1>
                    <div className="px-56 pt-5">
                        <BentoGrid className="grid-rows-1">
                            {optionsList.map((tool, idx) => (
                                <BentoCard key={idx} {...tool} />
                            ))}
                        </BentoGrid>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
