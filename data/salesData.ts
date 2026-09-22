import { SalesRecord, Year, Category, Region } from "@/types/sales";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CATEGORIES: Category[] = ["Electronics","Furniture","Clothing","Groceries","Sports"];
const REGIONS: Region[] = ["North","South","East","West"];
const YEARS: Year[] = [2022, 2023, 2024];

function seededRandom(seed: number) {
  let v = seed;
  return () => {
    v = (v * 9301 + 49297) % 233280;
    return v / 233280;
  };
}

function generateSalesData(): SalesRecord[] {
  const records: SalesRecord[] = [];
  let id = 1;

  YEARS.forEach((year) => {
    const growth = 1 + (year - 2022) * 0.15;
    const rand = seededRandom(year * 1000);

    MONTHS.forEach((month, mIdx) => {
      const seasonal = 1 + 0.25 * Math.sin(((mIdx + 1) / 12) * Math.PI * 2);

      CATEGORIES.forEach((category) => {
        REGIONS.forEach((region) => {
          const base = 800 + rand() * 1200;
          const unitsSold = Math.round(base * growth * seasonal * (0.8 + rand() * 0.4));
          const unitPrice =
            category === "Electronics" ? 450 :
            category === "Furniture"   ? 320 :
            category === "Clothing"    ?  85 :
            category === "Groceries"   ?  25 : 130;

          const revenue = Math.round(unitsSold * unitPrice);
          const profit = Math.round(revenue * (0.15 + rand() * 0.2));

          records.push({ id: `S-${id++}`, year, month, category, region, unitsSold, revenue, profit });
        });
      });
    });
  });

  return records;
}

export const salesData: SalesRecord[] = generateSalesData();
export const availableYears: Year[] = YEARS;