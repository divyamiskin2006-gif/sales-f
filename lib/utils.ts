import {
  SalesRecord, MonthlySales, CategorySales, DashboardStats, Year,
} from "@/types/sales";

const MONTH_ORDER = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function filterByYear(data: SalesRecord[], year: Year) {
  return data.filter((r) => r.year === year);
}

export function filterByThreshold(data: SalesRecord[], threshold: number) {
  if (!threshold || threshold <= 0) return data;
  return data.filter((r) => r.revenue >= threshold);
}

export function getMonthlySales(data: SalesRecord[]): MonthlySales[] {
  const map = new Map<string, MonthlySales>();
  data.forEach((r) => {
    const cur = map.get(r.month) || { month: r.month, revenue: 0, profit: 0, unitsSold: 0 };
    cur.revenue += r.revenue;
    cur.profit += r.profit;
    cur.unitsSold += r.unitsSold;
    map.set(r.month, cur);
  });
  return [...map.values()].sort(
    (a, b) => MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month)
  );
}

export function getCategorySales(data: SalesRecord[]): CategorySales[] {
  const map = new Map<string, CategorySales>();
  data.forEach((r) => {
    const cur = map.get(r.category) || { category: r.category, revenue: 0, unitsSold: 0 };
    cur.revenue += r.revenue;
    cur.unitsSold += r.unitsSold;
    map.set(r.category, cur);
  });
  return [...map.values()].sort((a, b) => b.revenue - a.revenue);
}

export function getDashboardStats(data: SalesRecord[]): DashboardStats {
  const totalRevenue = data.reduce((s, r) => s + r.revenue, 0);
  const totalProfit  = data.reduce((s, r) => s + r.profit, 0);
  const totalUnits   = data.reduce((s, r) => s + r.unitsSold, 0);
  const avgOrderValue = data.length ? Math.round(totalRevenue / data.length) : 0;
  return { totalRevenue, totalProfit, totalUnits, avgOrderValue };
}

export function formatCurrency(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
}

export function formatNumber(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return v.toString();
}