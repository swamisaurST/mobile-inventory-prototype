/** Screen registry — sourced from slides, spruce guide, discovery docs, and production screenshots */

export const WORKFLOW_GROUPS = [
  {
    id: "journey",
    label: "App journey",
    description: "Home, map, menu — entry points into jobs",
  },
  {
    id: "spruce",
    label: "Spruce Phase 1",
    description: "Reserve, swap, warehouse request (slides + discussion guide)",
  },
  {
    id: "production",
    label: "Production inventory",
    description: "Existing product UI from screenshots — STACK standardized",
  },
  {
    id: "tickets",
    label: "Tickets (context)",
    description: "Ticketing screens bundled in repo — job event cross-links",
  },
];

export const SCREENS = {
  home: {
    group: "journey",
    title: "Home",
    breadcrumb: ["Home"],
    start: true,
  },
  map: {
    group: "journey",
    title: "Map",
    breadcrumb: ["Map"],
  },
  menu: {
    group: "journey",
    title: "Menu",
    breadcrumb: ["Menu"],
  },
  jobsList: {
    group: "journey",
    title: "Jobs list",
    breadcrumb: ["Menu", "Jobs"],
  },
  jobEvent: {
    group: "spruce",
    title: "Job event · reserve & swap",
    breadcrumb: ["Home", "Job event"],
    description: "J-000382 with field asset, reserved items, install/swap, truck reserve",
  },
  jobEventTickets: {
    group: "tickets",
    title: "Job event · with ticket card",
    breadcrumb: ["Home", "Job event (tickets)"],
    description: "Job event variant with originating ticket card from ticketing prototype",
  },
  jobDetails: {
    group: "journey",
    title: "Job details",
    breadcrumb: ["Job", "Details"],
  },
  jobExecution: {
    group: "journey",
    title: "Job execution",
    breadcrumb: ["Job", "Execution"],
    description: "Gateway to production Locate / Uninstall inventory",
  },
  truckInventory: {
    group: "spruce",
    title: "My truck inventory",
    breadcrumb: ["Menu", "Truck inventory"],
  },
  inventoryItem: {
    group: "spruce",
    title: "SKU detail · reserve",
    breadcrumb: ["Truck", "Item"],
  },
  warehouseStock: {
    group: "spruce",
    title: "Warehouse stock",
    breadcrumb: ["Truck", "Warehouse"],
  },
  myRequests: {
    group: "spruce",
    title: "My warehouse requests",
    breadcrumb: ["Truck", "Requests"],
  },
  jobInventory: {
    group: "production",
    title: "Job · inventory (J-003448)",
    breadcrumb: ["Job", "J-003448"],
    description: "USED list, Locate Inventory, Uninstall",
  },
  locateInventory: {
    group: "production",
    title: "Locate inventory",
    breadcrumb: ["Job", "Locate"],
  },
  itemDetail: {
    group: "production",
    title: "Item detail",
    breadcrumb: ["Locate", "Antennas Cabinet"],
  },
  fieldAssetDetail: {
    group: "production",
    title: "Field asset detail",
    breadcrumb: ["Locate", "123"],
  },
  installConsume: {
    group: "production",
    title: "Install or consume",
    breadcrumb: ["Asset", "Install or consume"],
  },
  ticketsList: {
    group: "tickets",
    title: "Tickets list",
    breadcrumb: ["Menu", "Tickets"],
  },
  ticketDetail: {
    group: "tickets",
    title: "Ticket detail",
    breadcrumb: ["Tickets", "T-0000002"],
  },
  createTicket: {
    group: "tickets",
    title: "Create ticket",
    breadcrumb: ["Job", "Create ticket"],
  },
};

export const SCREEN_ORDER = [
  "home",
  "map",
  "menu",
  "jobsList",
  "jobEvent",
  "jobEventTickets",
  "jobDetails",
  "jobExecution",
  "truckInventory",
  "inventoryItem",
  "warehouseStock",
  "myRequests",
  "jobInventory",
  "locateInventory",
  "itemDetail",
  "fieldAssetDetail",
  "installConsume",
  "ticketsList",
  "ticketDetail",
  "createTicket",
];

export function screensForGroup(groupId) {
  return SCREEN_ORDER.filter((id) => SCREENS[id].group === groupId);
}
