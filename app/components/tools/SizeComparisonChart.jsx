// app/components/tools/SizeComparisonChart.jsx
"use client";

// Isolated so recharts (~heavy) can be code-split out of the main tool bundle
// via next/dynamic({ ssr: false }) — it only loads after a compression runs.
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SizeComparisonChart({ data }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: "MB", angle: -90, position: "insideLeft" }} />
          <Tooltip
            cursor={{ fill: "rgba(16,185,129,0.08)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid hsl(var(--border))",
            }}
          />
          <Bar dataKey="size" radius={[6, 6, 0, 0]} fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
