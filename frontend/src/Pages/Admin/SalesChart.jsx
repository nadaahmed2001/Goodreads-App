import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import Sidebar from "./Sidebar";
import "./Books.css";

const data2 = [
    { name: "Books", value: 400 },
    { name: "Authors", value: 300 },
    { name: "Users", value: 300 },
    { name: "Orders", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 7000 },
    { name: "May", sales: 6000 },
];

const SalesChart = () => {
    return (
        <>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-5 d-flex justify-content-evenly align-items-center">
                    <ResponsiveContainer width="40%" height={500}>
                        <BarChart data={data}>
                            <XAxis tick={{ fontSize: 16 }} />
                            <YAxis tick={{ fontSize: 16 }} /> <Tooltip />
                            <Legend
                                wrapperStyle={{ fontSize: "25px" }}
                            />{" "}
                            <Bar className="chart" dataKey="sales" fill="#c06363" />
                        </BarChart>
                    </ResponsiveContainer>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data2}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data2.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </>
    );
};

export default SalesChart;
