"use client";
import { Button, Card, Input, Label } from "@/components/atoms";
import { ChartType, Year } from "@/types/sales";

export function StatCard({
  title, value, change, changeType = "neutral", icon,
}: {
  title: string; value: string; change?: string;
  changeType?: "positive" | "negative" | "neutral"; icon: string;
}) {
  const color = { positive: "text-emerald-600", negative: "text-rose-600", neutral: "text-slate-500" }[changeType];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          {change && <p className={`mt-1 text-xs font-medium ${color}`}>{change}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-lg">{icon}</div>
      </div>
    </Card>
  );
}

export function YearSelector({
  years, value, onChange,
}: { years: Year[]; value: Year; onChange: (y: Year) => void }) {
  return (
    <div className="inline-flex gap-1 rounded-lg bg-slate-100 p-1">
      {years.map((y) => (
        <Button key={y} size="sm" active={value === y} onClick={() => onChange(y)}>{y}</Button>
      ))}
    </div>
  );
}

export function ChartSwitcher({
  value, onChange,
}: { value: ChartType; onChange: (t: ChartType) => void }) {
  const options: { v: ChartType; label: string }[] = [
    { v: "bar", label: "Bar" },
    { v: "line", label: "Line" },
    { v: "pie", label: "Pie" },
  ];
  return (
    <div className="inline-flex gap-1 rounded-lg bg-slate-100 p-1">
      {options.map((o) => (
        <Button key={o.v} size="sm" active={value === o.v} onClick={() => onChange(o.v)}>{o.label}</Button>
      ))}
    </div>
  );
}

export function FilterInput({
  value, onChange, onReset,
}: { value: string; onChange: (v: string) => void; onReset: () => void }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3">
      <div className="flex-1">
        <Label htmlFor="threshold">Minimum revenue per record ($)</Label>
        <Input
          id="threshold"
          type="number"
          min={0}
          placeholder="e.g. 50000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
        />
      </div>
      <button
        onClick={onReset}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Reset
      </button>
    </div>
  );
}