export const CURRENT_JOB_ID = "J-000382";

export const myJobs = [
  { id: "J-000382", site: "Morinville", date: "Today · 4:19 PM" },
  { id: "J-003520", site: "2011-WTW-13932-OE", date: "Tue · 9:00 AM" },
  { id: "J-006374", site: "100 CONGRESS", date: "Wed · 11:00 AM" },
];

export const initialInventory = [
  {
    sku: "INV-3K-A",
    name: "Inverter 3kW",
    category: "Inverter",
    icon: "workOrder",
    cost: 1300,
    serialized: true,
    units: [
      { id: "INV-ABC123", status: "reserved", reservedFor: "J-000382" },
      { id: "INV-ABC456", status: "reserved", reservedFor: "J-006374" },
      { id: "INV-DEF789", status: "available" },
    ],
  },
  {
    sku: "MOD-400W",
    name: "Solar Module 400W",
    category: "Module",
    icon: "image",
    cost: 240,
    serialized: false,
    qty: { total: 20, available: 18, reserved: 2 },
    reservations: [{ jobId: "J-000382", count: 2 }],
  },
  {
    sku: "CONN-MC4",
    name: "MC4 Connector",
    category: "Connector",
    icon: "package",
    cost: 8,
    serialized: false,
    qty: { total: 50, available: 50, reserved: 0 },
    reservations: [],
  },
  {
    sku: "BRK-15A",
    name: "Breaker 15A",
    category: "Component",
    icon: "package",
    cost: 22,
    serialized: false,
    qty: { total: 6, available: 6, reserved: 0 },
    reservations: [],
  },
];

export const currentSiteAsset = {
  id: "FA-104000007",
  name: "ABB UNO-3kW Inverter",
  serial: "ABB-2019-4471",
  site: "Morinville",
  installedDate: "2019-08-12",
  status: "active",
  warranty: "expired",
};

export const warehouseInventory = [
  { sku: "INV-3K-A", name: "Inverter 3kW", category: "Inverter", available: 12, cost: 1300 },
  { sku: "INV-5K-A", name: "Inverter 5kW", category: "Inverter", available: 4, cost: 1850 },
  { sku: "MOD-400W", name: "Solar Module 400W", category: "Module", available: 240, cost: 240 },
  { sku: "MOD-450W", name: "Solar Module 450W", category: "Module", available: 80, cost: 285 },
  { sku: "BRK-15A", name: "Breaker 15A", category: "Component", available: 35, cost: 22 },
  { sku: "BRK-30A", name: "Breaker 30A", category: "Component", available: 8, cost: 38 },
  { sku: "CONN-MC4", name: "MC4 Connector", category: "Connector", available: 500, cost: 8 },
];

export const initialRequests = [
  {
    id: "REQ-104",
    sku: "INV-5K-A",
    name: "Inverter 5kW",
    qty: 1,
    jobId: "J-000382",
    status: "in_transit",
    createdAt: "Yesterday",
    approvedBy: "Joe Kiss",
  },
  {
    id: "REQ-105",
    sku: "BRK-30A",
    name: "Breaker 30A",
    qty: 2,
    jobId: "J-003520",
    status: "approved",
    createdAt: "2h ago",
    approvedBy: "Joe Kiss",
  },
  {
    id: "REQ-106",
    sku: "MOD-450W",
    name: "Solar Module 450W",
    qty: 8,
    jobId: "J-003520",
    status: "requested",
    createdAt: "20m ago",
    approvedBy: null,
  },
  {
    id: "REQ-101",
    sku: "CONN-MC4",
    name: "MC4 Connector",
    qty: 20,
    jobId: "J-000382",
    status: "received",
    createdAt: "Last week",
    approvedBy: "Joe Kiss",
  },
];

export function summarize(item) {
  if (item.serialized) {
    return {
      avail: item.units.filter((u) => u.status === "available").length,
      reserved: item.units.filter((u) => u.status === "reserved").length,
      installed: item.units.filter((u) => u.status === "installed").length,
    };
  }
  return { avail: item.qty.available, reserved: item.qty.reserved, installed: 0 };
}
