"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { GovernmentUnitDistribution } from "../types/index";
import { useTranslation } from "react-i18next";

interface ComplaintsPieChartProps {
  data: GovernmentUnitDistribution[];
}

// Generate colors with primary green shades
const COLORS = [
  "hsl(179, 61%, 20%)", // Dark green
  "hsl(179, 61%, 30%)", // Medium dark green
  "hsl(179, 61%, 40%)", // Medium green
  "hsl(179, 61%, 50%)", // Light green
  "hsl(40, 37%, 60%)", // Gold accent
];

export const ComplaintsPieChart = ({ data }: ComplaintsPieChartProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Custom label to show percentage
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-foreground mb-1">
            {payload[0].payload.government_unit_name}
          </p>
          <p className="text-sm text-primary">
            {t("complaintsCount")}: {payload[0].payload.count}
          </p>
          <p className="text-sm text-gold">{payload[0].payload.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-gold">{t("complaintsByUnit")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              align={isRTL ? "left" : "right"}
              verticalAlign="middle"
              wrapperStyle={{
                paddingLeft: isRTL ? "0" : "20px",
                paddingRight: isRTL ? "20px" : "0",
                fontSize: "12px",
                direction: isRTL ? "rtl" : "ltr",
              }}
              formatter={(value, entry: any) => {
                return `${entry.payload.government_unit_name} (${entry.payload.count})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
