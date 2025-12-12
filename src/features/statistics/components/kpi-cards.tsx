"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import type { StatisticsCardProps } from "../types/index";

export const StatisticsCard = ({
  title,
  value,
  icon,
  trend,
}: StatisticsCardProps) => {
  return (
    <Card className="border-primary/20 hover:border-gold/50 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gold">{title}</CardTitle>
        <div className="text-primary/60">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
          {value}
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend.isPositive ? (
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-xs ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
