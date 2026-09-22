"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/atoms";
import {
  DashboardHeader, StatsGrid, SalesChart, CategoryBreakdown, FilterCard,
} from "@/components/organisms";
import { salesData, availableYears } from "@/data/salesData";
import {
  filterByYear, filterByThreshold, getMonthlySales, getCategorySales, getDashboardStats,
} from "@/lib/utils";
import { ChartType, Year } from "@/types/sales";

export default function DashboardPage() {
  const [year, setYear] = useState<Year>(2024);
  const [threshold, setThreshold] = useState("");
  const [chartType, setChartType] = useState<ChartType>("bar");

  const filtered = useMemo(() => {
    const byYear = filterByYear(salesData, year);
    return filterByThreshold(byYear, parseFloat(threshold));
  }, [year, threshold]);

  const stats = useMemo(() => getDashboardStats(filtered), [filtered]);
  const monthly = useMemo(() => getMonthlySales(filtered), [filtered]);
  const categories = useMemo(() => getCategorySales(filtered), [filtered]);
  const hasData = filtered.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <DashboardHeader years={availableYears} selectedYear={year} onYearChange={setYear} />
        <StatsGrid stats={stats} />
        <FilterCard value={threshold} onChange={setThreshold} onReset={() => setThreshold("")} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {hasData ? (
              <SalesChart data={monthly} chartType={chartType} onChartTypeChange={setChartType} />
            ) : (
              <Card className="flex h-80 items-center justify-center p-5">
                <div className="text-center">
                  <p className="text-3xl">🔍</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">No records match the filter</p>
                  <p className="mt-1 text-xs text-slate-500">Try lowering the threshold.</p>
                </div>
              </Card>
            )}
          </div>
          <div className="lg:col-span-1">
            {hasData ? (
              <CategoryBreakdown data={categories} />
            ) : (
              <Card className="flex min-h-[300px] items-center justify-center p-5">
                <p className="text-sm text-slate-400">No category data</p>
              </Card>
            )}
          </div>
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
          Sales Analytics Dashboard · Mock data for demonstration
        </footer>
      </div>
    </div>
  );
}
