export type Year = 2022 | 2023 | 2024;
export type Region = "North" | "South" | "East" | "West";
export type Category = "Electronics" | "Furniture" | "Clothing" | "Groceries" | "Sports";
export type ChartType = "bar" | "line" | "pie";

export interface SalesRecord {
  id: string;
  year: Year;
  month: string;
  category: Category;
  region: Region;
  unitsSold: number;
  revenue: number;
  profit: number;
}

export interface MonthlySales {
  month: string;
  revenue: number;
  profit: number;
  unitsSold: number;
}

export interface CategorySales {
  category: Category;
  revenue: number;
  unitsSold: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalProfit: number;
  totalUnits: number;
  avgOrderValue: number;
}