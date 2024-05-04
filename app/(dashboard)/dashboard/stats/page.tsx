"use client";

import { useState, useEffect } from "react"
import { getMoodRecords, getMoodRecordsForGraph } from "@/lib/supabase/helpers"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Plot from 'react-plotly.js';

export default function Page() {

    const [stats, setStats] = useState<any>([])
    const [graph, setGraphData] = useState<any>([])

    useEffect(()=> {
        const fetchData = async () => {
            const data = await getMoodRecords()
            console.log(data)
            setStats(data)
        }
        fetchData()

        const fetchGrpah = async () => {
            const graphData = await getMoodRecordsForGraph()
            console.log(graphData)
            setGraphData(graphData)
        }
        fetchGrpah()

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

            <h3>Graph</h3>
            <h4>Recharts</h4>
            <LineChart
                width={600}
                height={300}
                data={graph}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis dataKey="created_at" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mood_score" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>

            <h4>Plotly</h4>
            <Plot
                data={[
                    {
                        x: graph.map((item: any) => item.created_at),
                        y: graph.map((item: any) => item.mood_score),
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: {color: '#8884d8'},
                    },
                ]}
                layout={{width: 600, height: 300, title: 'Mood Score'}}
            />

        </div>
    )



}