"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const SERIES_COLORS = ["#6366f1", "#f97316", "#10b981", "#ef4444"];

function mergeSeriesByX(series) {
  const xSet = new Set();
  series.forEach((s) => s.points.forEach((p) => xSet.add(p.x)));
  const xs = Array.from(xSet).sort((a, b) => a - b);
  return xs.map((x) => {
    const row = { x };
    series.forEach((s) => {
      const point = s.points.find((p) => p.x === x);
      row[s.name] = point ? point.y : null;
    });
    return row;
  });
}

function ChartVisual({ chart }) {
  const { chartType, xLabel, yLabel, series } = chart;

  const merged = useMemo(() => mergeSeriesByX(series), [series]);

  if (chartType === "scatter") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="x" type="number" name={xLabel} label={{ value: xLabel, position: "insideBottom", offset: -10 }} />
          <YAxis dataKey="y" type="number" name={yLabel} label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          {series.length > 1 && <Legend verticalAlign="top" height={24} />}
          {series.map((s, i) => (
            <Scatter
              key={s.name}
              name={s.name}
              data={s.points}
              fill={SERIES_COLORS[i % SERIES_COLORS.length]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  const ChartComponent = chartType === "bar" ? BarChart : LineChart;
  const SeriesComponent = chartType === "bar" ? Bar : Line;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ChartComponent data={merged} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="x" type="number" label={{ value: xLabel, position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
        <Tooltip />
        {series.length > 1 && <Legend verticalAlign="top" height={24} />}
        {series.map((s, i) => (
          <SeriesComponent
            key={s.name}
            type="monotone"
            dataKey={s.name}
            name={s.name}
            stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
            fill={SERIES_COLORS[i % SERIES_COLORS.length]}
            dot={false}
            connectNulls
          />
        ))}
      </ChartComponent>
    </ResponsiveContainer>
  );
}

function TableVisual({ table }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SvgVisual({ svg }) {
  const clean = useMemo(
    () =>
      DOMPurify.sanitize(svg, {
        USE_PROFILES: { svg: true, svgFilters: true },
      }),
    [svg],
  );

  return (
    <div
      className="flex justify-center rounded-lg border border-border bg-background p-4 [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

export default function VisualBlock({ visual }) {
  if (!visual || visual.type === "none") return null;

  return (
    <div className="my-3">
      {visual.type === "svg" && visual.svg && <SvgVisual svg={visual.svg} />}
      {visual.type === "chart" && visual.chart && <ChartVisual chart={visual.chart} />}
      {visual.type === "table" && visual.table && <TableVisual table={visual.table} />}
      {visual.caption && (
        <p className="mt-2 text-center text-xs text-muted-foreground">{visual.caption}</p>
      )}
    </div>
  );
}
