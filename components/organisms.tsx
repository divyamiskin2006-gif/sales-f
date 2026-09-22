"use client";
import { Card, Badge } from "@/components/atoms";
import { StatCard, YearSelector, ChartSwitcher, FilterInput } from "@/components/molecules";
import { ChartType, CategorySales, DashboardStats, MonthlySales, Year } from "@/types/sales";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export function DashboardHeader({
  years, selectedYear, onYearChange,
}: { years: Year[]; selectedYear: Year; onYearChange: (y: Year) => void }) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Sales Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Explore revenue, profit, and unit performance for {selectedYear}.
        </p>
      </div>
      <YearSelector years={years} value={selectedYear} onChange={onYearChange} />
    </header>
  );
}

export function StatsGrid({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Revenue" value={formatCurrency(stats.totalRevenue)} change="+12.4% YoY" changeType="positive" icon="💰" />
      <StatCard title="Total Profit"  value={formatCurrency(stats.totalProfit)}  change="+8.1% YoY"  changeType="positive" icon="📈" />
      <StatCard title="Units Sold"    value={formatNumber(stats.totalUnits)}     change="+5.6% YoY"  changeType="positive" icon="📦" />
      <StatCard title="Avg Order"     value={formatCurrency(stats.avgOrderValue)} change="-1.2% YoY" changeType="negative" icon="🧾" />
    </div>
  );
}

const PIE_COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16","#f97316","#14b8a6","#6366f1","#a855f7"];

export function SalesChart({
  data, chartType, onChartTypeChange,
}: { data: MonthlySales[]; chartType: ChartType; onChartTypeChange: (t: ChartType) => void }) {
  const tooltipStyle = { borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 };

  return (
    <Card className="p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Monthly Performance</h2>
          <p className="text-xs text-slate-500">Revenue and profit across the year</p>
        </div>
        <ChartSwitcher value={chartType} onChange={onChartTypeChange} />
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip formatter={(v: any) => formatCurrency(Number(v))} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[6,6,0,0]} />
              <Bar dataKey="profit"  name="Profit"  fill="#10b981" radius={[6,6,0,0]} />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="profit"  name="Profit"  stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          ) : (
            <PieChart>
              <Tooltip formatter={(v: any) => formatCurrency(Number(v))} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Pie data={data} dataKey="revenue" nameKey="month" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={2} label={(e: any) => e.month}>
                {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function CategoryBreakdown({ data }: { data: CategorySales[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Category Breakdown</h2>
        <p className="text-xs text-slate-500">Revenue contribution by category</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis type="number" fontSize={12} tickFormatter={(v: any) => formatCurrency(Number(v))} />
<Tooltip formatter={(v: any) => formatCurrency(Number(v))} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[0,6,6,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
        {data.map((item, idx) => (
          <li key={item.category} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">{String(idx + 1).padStart(2, "0")}</span>
              <span className="font-medium text-slate-700">{item.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{formatNumber(item.unitsSold)} units</span>
              <Badge color={idx === 0 ? "green" : "slate"}>{formatCurrency(item.revenue)}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function FilterCard({
  value, onChange, onReset,
}: { value: string; onChange: (v: string) => void; onReset: () => void }) {
  return (
    <Card className="p-5">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-slate-900">Filter Records</h2>
        <p className="text-xs text-slate-500">Show only records at or above your revenue threshold.</p>
      </div>
      <FilterInput value={value} onChange={onChange} onReset={onReset} />
    </Card>
  );
}