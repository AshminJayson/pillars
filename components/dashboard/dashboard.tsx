"use client";
import { createClient } from "@/lib/supabase/client";
// import { getUsername } from '@/lib/supabase/helpers';
import { useEffect, useRef, useState } from "react";
import UserNav from "./user-nav";

import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { addSelfMoodRecord, getUsername } from "@/lib/supabase/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const mooods = [
    {
        name: "Elated",
        value: "Elated",
        color: "bg-green-500",
    },
    {
        name: "Joyful",
        value: "Joyful",
        color: "bg-green-400",
    },
    {
        name: "Serene",
        value: "Serene",
        color: "bg-green-300",
    },
    {
        name: "Happy",
        value: "Happy",
        color: "bg-green-200",
    },
    {
        name: "Neutral",
        value: "Neutral",
        color: "bg-white",
    },
    {
        name: "Sad",
        value: "Sad",
        color: "bg-red-100",
    },
    {
        name: "Lonely",
        value: "Lonely",
        color: "bg-red-200",
    },
    {
        name: "Scared",
        value: "Scared",
        color: "bg-red-300",
    },
    {
        name: "Depressed",
        value: "Depressed",
        color: "bg-red-400",
    },
];

const optionsList = [
    {
        name: "How am I doing?",
        href: "/dashboard/stats",
        cta: (
            <p>
                Open <span className="font-bold">Pillars of Support</span>
            </p>
        ),
        className: "col-span-2 row-span-2",
        background: (
            <div className="min-h-[50vh] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                <div className="min-h-[50vh] w-full bg-[url('/film_grain.png')]  bg-cover bg-no-repeat" />
            </div>
        ),
    },
    {
        name: "Hey See what your Pillars are doing ",
        href: "/pillars",
        cta: (
            <p>
                Open <span className="font-bold">Pillars of Support</span>
            </p>
        ),
        className: "col-span-2 row-span-1",
        background: (
            <div className="min-h-[15vh] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                <div className="min-h-[15vh] w-full bg-[url('/film_grain.png')]  bg-cover bg-no-repeat" />
            </div>
        ),
    },
    {
        name: "What do my pillars think of my day today?",
        href: "/supporters",
        cta: (
            <p>
                Open <span className="font-bold">Pillars of Support</span>
            </p>
        ),
        className: "col-span-2 row-span-1",
        background: (
            <div className="min-h-[15vh] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                <div className="min-h-[15vh] w-full bg-[url('/film_grain.png')]  bg-cover bg-no-repeat" />
            </div>
        ),
    },
];

export default function DashboardComponent({ email }: { email: string }) {
    const supabase = createClient();
    const [name, setName] = useState<string>("");
    const [mood, setMood] = useState<string>("");
    const moodInputRef = useRef<HTMLInputElement | null>(null);
    const [submittingMoodReport, setSubmittingMoodReport] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await supabase.auth.getUser();
            const username = await getUsername(user.data.user?.id as string);
            setName(username);
        };
        fetchUser();
    }, []);

    const submitMoodReport = () => {
        setSubmittingMoodReport(true);
        try {
            addSelfMoodRecord(mood, moodInputRef.current?.value as string);
            if (moodInputRef.current) moodInputRef.current!.value = "";
            toast.success("Mood report submitted successfully");
        } catch (error) {
            console.error("Error submitting mood report:", error);
            toast.error("Error submitting mood report");
        }
        setSubmittingMoodReport(false);
    };

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                delay: 0.25,
            }}
        >
            <div className="flex h-fit flex-col mb-10">
                <div className="mt-4 flex items-center px-4 pb-4">
                    <div className="flex items-center gap-0.5 lg:flex-1">
                        <Image
                            unoptimized
                            alt="Logo"
                            src="/pillars.png"
                            onClick={() =>
                                (window.location.href = "/dashboard")
                            }
                            height={150}
                            width={150}
                            className="h-auto cursor-pointer"
                        />
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
                    <motion.h1 className="mt-8 flex pl-56 pb-2 text-3xl">
                        Hey there,
                        <span className="mx-2 text-md flex items-center font-semibold ">
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
                    <motion.div className="my-8 px-56">
                        <div className="flex gap-4">
                            <Select onValueChange={(value) => setMood(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Mood" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mooods.map((mood, idx) => (
                                        <SelectItem
                                            className={`${mood.color} my-2`}
                                            value={mood.value}
                                            key={idx}
                                        >
                                            {mood.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                ref={moodInputRef}
                                placeholder="How are you feeling today?"
                            />
                            <Button
                                disabled={!mood || submittingMoodReport}
                                onClick={submitMoodReport}
                            >
                                Submit
                            </Button>
                        </div>
                    </motion.div>
                    <motion.p className="px-56 pb-2 text-lg font-semibold">
                        Here are some tools to help you understand how your
                        pillars are feeling today.
                    </motion.p>
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
