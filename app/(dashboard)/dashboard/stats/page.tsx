"use client";

import { useState, useEffect } from "react"
import { getMoodRecords } from "@/lib/supabase/helpers"

export default function Page() {

    const [stats, setStats] = useState<any>([])

    useEffect(()=> {
        const fetchData = async () => {
            const data = await getMoodRecords()
            console.log(data)
            setStats(data)
        }
        fetchData()

    }, [])

    return (
        <div>
            <h1>Stats</h1>
            <table>
                <thead>
                    <tr>
                        <th className="px-4">Score</th>
                        <th className="px-4">Mood Text</th>
                        <th className="px-4">Mood</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat: any, index: number) => (
                        <tr key={index}>
                            <td className="px-4">{stat.mood_score}</td>
                            <td className="px-4">{stat.mood_text}</td>
                            <td className="px-4">{stat.mood}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}