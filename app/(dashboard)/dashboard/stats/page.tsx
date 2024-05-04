"use client";

import Button from "@material-ui/core/Button";
import { getUsername } from "@/lib/supabase/helpers";
import { useState, useEffect } from "react";
import { getMoodRecords } from "@/lib/supabase/helpers";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
    ssr: false,
});
import { groupBy, meanBy } from "lodash";
import { format, parseISO } from "date-fns";
import { ReadStream } from "fs";

export default function Page() {
    const [stats, setStats] = useState<any>([]);
    // const [graph, setGraphData] = useState<any>([])
    const [interval, setInterval] = useState<any>([]);
    const [averagedData, setAveragedData] = useState<any>([]);
    const [sortedGraph, setSortedGraph] = useState<any>([]);
    const [raters, setRaters] = useState<any>([]);
    const [z, setZ] = useState<any>([]);

    // Custom tooltip component for Recharts
    const CustomTooltip = ({
        active,
        payload,
        label,
    }: {
        active: boolean;
        payload: any[];
        label: string;
    }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Date : ${format(
                        parseISO(label),
                        "dd/MM/yyyy"
                    )}`}</p>
                    <p className="intro">{`Mood Score : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMoodRecords();
            // console.log("data", data);
            if (!data) return;
            setStats(data);

            // Sort the data in ascending order based on the created_at field
            const tempsortedGraph = [...data].sort(
                (a, b) =>
                    parseISO(a.created_at).getTime() -
                    parseISO(b.created_at).getTime()
            );
            setSortedGraph(tempsortedGraph);
            // console.log("sortedGraph", tempsortedGraph)

            // First, create a list of unique raters and days of the week
            let uniqueRaters: { [key: string]: Promise<string> } = {};

            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (!uniqueRaters[item.rater]) {
                    uniqueRaters[item.rater] = getUsername(item.rater);
                }
            }

            const resolvedUniqueRaters = await Promise.all(
                Object.entries(uniqueRaters).map(
                    async ([uuid, usernamePromise]) => {
                        const username = await usernamePromise;
                        return [uuid, username];
                    }
                )
            );

            uniqueRaters = Object.fromEntries(resolvedUniqueRaters);
            console.log(uniqueRaters);
            setRaters(Object.values(uniqueRaters));

            // console.log("unique raters", Object.values(uniqueRaters));
            const days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ];

            // console.log('stats af:', stats);
            // let idtousername = {};

            // Then, create a 2D array for the z property
            const tempz = Object.keys(uniqueRaters).map((uuid: string) => {
                // console.log("rater", uuid)
                return days.map((day) => {
                    const scores = data
                        .filter(
                            (item: {
                                rater: any;
                                created_at: string;
                                mood_score: number;
                            }) =>
                                item.rater === uuid &&
                                format(parseISO(item.created_at), "EEEE") ===
                                    day
                        )
                        .map(
                            (itemst: { mood_score: any }) => itemst.mood_score
                        );
                    return scores.length > 0
                        ? scores.reduce((a: any, b: any) => a + b) /
                              scores.length
                        : null;
                });
            });
            const tz = tempz.map((row) =>
                row.map((value) => (value === null ? 0 : value))
            );
            // console.log("z", tempz)
            setZ(tz);

            // console.log("z", tz);
            setZ(tz);
        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Group data by day, week, or month and calculate average mood score
        const groupedData = groupBy(stats, (item) =>
            format(
                parseISO(item.created_at),
                interval === "day"
                    ? "yyyy-MM-dd"
                    : interval === "week"
                    ? "yyyy-ww"
                    : "yyyy-MM"
            )
        );
        const newAveragedData = Object.entries(groupedData).map(
            ([key, value]) => ({
                created_at: key,
                mood_score: meanBy(value, "mood_score"),
            })
        );

        setAveragedData(newAveragedData);
    }, [stats, interval]);

    // console.log('stats bf:', stats);

    // console.log('x:', raters);
    // console.log('y:', days);
    // console.log('z:', z);

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

            {sortedGraph.length > 0 && (
                <LineChart
                    width={600}
                    height={300}
                    data={sortedGraph}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis
                        dataKey="created_at"
                        tickFormatter={(str) => format(parseISO(str), "dd/MM")}
                        interval={Math.floor(stats.length / 10)} // Adjust this value to change the number of ticks
                    />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                        content={
                            <CustomTooltip
                                active={false}
                                payload={[]}
                                label=""
                            />
                        }
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="mood_score"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            )}

            <h4>Plotly Graphs</h4>

            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setInterval("day")}
                    >
                        Day
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setInterval("week")}
                        style={{ marginLeft: "10px" }}
                    >
                        Week
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setInterval("month")}
                        style={{ marginLeft: "10px" }}
                    >
                        Month
                    </Button>
                </div>
                {averagedData.length > 0 && (
                    <Plot
                        data={[
                            {
                                x: averagedData.map(
                                    (item: { created_at: any }) =>
                                        item.created_at
                                ),
                                y: averagedData.map(
                                    (item: { mood_score: any }) =>
                                        item.mood_score
                                ),
                                type: "scatter",
                                mode: "lines+markers",
                                marker: { color: "#8884d8" },
                            },
                        ]}
                        layout={{
                            width: 600,
                            height: 300,
                            title: "Average Mood Score",
                        }}
                    />
                )}
            </div>

            <div>
                <h3>heat map</h3>
                {raters.length > 0 && z.length > 0 && (
                    <Plot
                        data={[
                            {
                                values: z.map(
                                    (row: any) =>
                                        row.filter(
                                            (value: any) => value !== null
                                        ).length
                                ),
                                labels: Object.values(raters),
                                type: "pie",
                                hovertemplate:
                                    "%{label}: %{value} ratings<extra></extra>",
                            },
                        ]}
                        layout={{
                            width: 600,
                            height: 300,
                            title: "Ratings by Rater",
                        }}
                    />
                )}
            </div>
        </div>
    );
}
