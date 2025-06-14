import type { Commodity } from "$lib/types"

export const commodities: Commodity[] = $state([
    { name: "Gold", price: 2345.67, change: 12.34 },
    { name: "Silver", price: 28.45, change: -0.23 },
    { name: "Platinum", price: 987.65, change: 5.67 },
    { name: "Palladium", price: 1234.56, change: -8.9 },
    { name: "Copper", price: 4.56, change: 0.12 },
    { name: "Aluminum", price: 2.34, change: -0.05 },
    { name: "Zinc", price: 3.45, change: 0.07 },
    { name: "Nickel", price: 18.9, change: -0.45 },
    { name: "Lead", price: 2.12, change: 0.03 },
    { name: "Tin", price: 25.67, change: -0.34 },
    { name: "Iron Ore", price: 123.45, change: 2.34 },
    { name: "Steel", price: 789.01, change: -5.67 },
    { name: "Natural Gas", price: 3.45, change: 0.12 },
    { name: "Crude Oil", price: 78.9, change: -1.23 },
    { name: "Brent Oil", price: 82.34, change: 0.45 },
    { name: "Gold Futures", price: 2245.67, change: 2.34 },
    { name: "Uranium", price: 12344.45, change: 22.34 },
    { name: "Soy beans", price: 14.45, change: -1.34 },
  ])
