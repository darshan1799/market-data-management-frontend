"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TimeFrame = "quarterly" | "monthly" | "annual";

interface DataPoint {
  date: string;
  value: number;
}

const quarterlyData: DataPoint[] = [
  { date: "2023-01-01", value: 120 },
  { date: "2023-04-01", value: 145 },
  { date: "2023-07-01", value: 132 },
  { date: "2023-10-01", value: 168 },
  { date: "2024-01-01", value: 175 },
  { date: "2024-04-01", value: 190 },
  { date: "2024-07-01", value: 210 },
  { date: "2024-10-01", value: 198 },
];

const monthlyData: DataPoint[] = [
  { date: "2025-01-01", value: 110 },
  { date: "2025-02-01", value: 125 },
  { date: "2025-03-01", value: 118 },
  { date: "2025-04-01", value: 140 },
  { date: "2025-05-01", value: 155 },
  { date: "2025-06-01", value: 170 },
  { date: "2025-07-01", value: 165 },
  { date: "2025-08-01", value: 182 },
  { date: "2025-09-01", value: 195 },
  { date: "2025-10-01", value: 205 },
  { date: "2025-11-01", value: 220 },
  { date: "2025-12-01", value: 235 },
];

const yearlyData: DataPoint[] = [
  { date: "2018-01-01", value: 95 },
  { date: "2019-01-01", value: 105 },
  { date: "2020-01-01", value: 90 },
  { date: "2021-01-01", value: 140 },
  { date: "2022-01-01", value: 165 },
  { date: "2023-01-01", value: 155 },
  { date: "2024-01-01", value: 210 },
  { date: "2025-01-01", value: 235 },
];

const chartDataMap: Record<TimeFrame, DataPoint[]> = {
  quarterly: quarterlyData,
  monthly: monthlyData,
  annual: yearlyData,
};

interface CommodityResponse {
  name: string;
  interval: string;
  unit: string;
  data: {
    date: string;
    value: number;
  }[];
}

const fetchData = async (frame: TimeFrame): Promise<CommodityResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/commodities?type=${frame}`,
  );
  if (!response.ok) throw new Error("Failed to fetch commodity data");
  return response.json();
};

export default function CommodityDashboard() {
  const [activeFrame, setActiveFrame] = useState<TimeFrame>("quarterly");

  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery<CommodityResponse>({
    queryKey: ["commodity", activeFrame],
    queryFn: () => fetchData(activeFrame),
    // Fallback to static data if the API isn't ready
    placeholderData: {
      name: "Loading...",
      interval: activeFrame,
      unit: "index",
      data: chartDataMap[activeFrame],
    },
    staleTime: 5 * 60 * 1000,
  });

  const chartData = responseData?.data;

  console.log(chartData);

  const formatDate = (date: string, frame: TimeFrame) => {
    const d = new Date(date);

    if (frame === "monthly") {
      return d.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
    }

    if (frame === "quarterly") {
      const quarter = Math.floor(d.getMonth() / 3) + 1;
      const year = d.getFullYear().toString().slice(-2);

      return `Q${quarter} '${year}`;
    }

    if (frame === "annual") {
      return d.getFullYear().toString();
    }

    return date;
  };

  return (
    <div className="container py-6">
      <div className="w-full container bg-white rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-base font-bold text-gray-800">Dashboard</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Contact Us
          </button>
        </div>

        <div className="flex justify-end gap-2 px-6 pt-5">
          {(["monthly", "quarterly", "annual"] as TimeFrame[]).map((frame) => (
            <button
              key={frame}
              onClick={() => setActiveFrame(frame)}
              className={`px-5 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                activeFrame === frame
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {frame.charAt(0).toUpperCase() + frame.slice(1)}
            </button>
          ))}
        </div>

        <div className="px-4 pt-4 pb-2">
          {isLoading && (
            <div className="flex items-center justify-center h-72 text-gray-400 text-sm">
              Loading...
            </div>
          )}

          {isError && (
            <div className="flex items-center justify-center h-72 text-red-400 text-sm">
              Failed to load data.
            </div>
          )}

          {!isLoading && !isError && (
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#f0f4f8" />

                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => formatDate(value, activeFrame)}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={true}
                />

                <YAxis
                  tickFormatter={(v) => v}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={true}
                />

                <Tooltip
                  labelFormatter={(value) => formatDate(value, activeFrame)}
                  formatter={(value) => [`${value ?? ""}`, "Index"]}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#areaGradient)"
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#0ea5e9",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="p-6">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            Description
          </p>
          <p className="text-sm text-gray-500">
            The above chart is the global price index of all commodities in
            quarterly, monthly, and annual temporal dimensions.
          </p>
        </div>
      </div>
    </div>
  );
}
