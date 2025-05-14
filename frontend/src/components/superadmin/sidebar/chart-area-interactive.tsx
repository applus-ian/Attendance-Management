"use client"

import { Bar, BarChart, Cell, Pie, PieChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Department users data
const departmentData = [
  { department: "AU", users: 186, fill: "hsl(var(--chart-1))" },
  { department: "ESP", users: 75, fill: "hsl(var(--chart-2))" },
  { department: "MY", users: 45, fill: "hsl(var(--chart-3))" },
]

// Attendance summary data
const attendanceSummaryData = [
  { status: "Present", count: 305, fill: "hsl(var(--chart-1))" },
  { status: "Absent", count: 186, fill: "hsl(var(--chart-2))" },
  { status: "Late", count: 237, fill: "hsl(var(--chart-3))" },
  { status: "No Shift", count: 73, fill: "hsl(var(--chart-4))" },
]

// Attendance breakdown data (pie chart)
const attendanceBreakdownData = [
  { name: "Present", value: 83.3, fill: "hsl(var(--chart-1))" },
  { name: "Absent", value: 12.5, fill: "hsl(var(--chart-2))" },
  { name: "No shift", value: 4.2, fill: "hsl(var(--chart-4))" },
  { name: "Late", value: 20.8, fill: "hsl(var(--chart-3))" },
]

// Chart configuration
const chartConfig = {
  users: {
    label: "Users",
  },
  count: {
    label: "Count",
  },
  AU: {
    label: "AU",
    color: "hsl(var(--chart-1))",
  },
  ESP: {
    label: "ESP",
    color: "hsl(var(--chart-2))",
  },
  MY: {
    label: "MY",
    color: "hsl(var(--chart-3))",
  },
  Present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  Absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  Late: {
    label: "Late",
    color: "hsl(var(--chart-3))",
  },
  "No Shift": {
    label: "No Shift",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

// Custom label for pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: { cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number; index: number }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="medium"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

export function ChartAreaInteractive() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Department Users Chart */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Number of Users by Departments</CardTitle>
          <CardDescription>As of January 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[150px]">
            <BarChart
              width={250}
              height={150}
              data={departmentData}
              layout="vertical"
              margin={{
                left: 5,
                right: 10,
                top: 10,
                bottom: 10,
              }}
            >
              <YAxis dataKey="department" type="category" tickLine={false} axisLine={false} width={40} />
              <XAxis dataKey="users" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="users" layout="vertical" radius={4}>
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Attendance Summary Chart */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Attendance Summary</CardTitle>
          <CardDescription>As of January 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[150px]">
            <BarChart
              width={250}
              height={150}
              data={attendanceSummaryData}
              margin={{
                left: 10,
                right: 10,
                top: 10,
                bottom: 20,
              }}
            >
              <XAxis dataKey="status" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <YAxis hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={4}>
                {attendanceSummaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Attendance Breakdown Chart */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Attendance Breakdown</CardTitle>
          <CardDescription>As of January 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[150px]">
            <PieChart width={200} height={150}>
              <Pie
                data={attendanceBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip formatter={(value) => [`${value}%`, "Percentage"]} />
            </PieChart>
          </ChartContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {attendanceBreakdownData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.fill }} />
                <span className="text-xs">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
