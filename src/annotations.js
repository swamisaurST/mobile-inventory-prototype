/** Per-screen STACK annotation metadata (components, interactions, callouts). */

export const ANNOTATION_EXTRA = {
  home: {
    description: "Calendar entry point into the Spruce demo job. Recently viewed and favorites mirror production home.",
    components: ["SiteTrackerHeader", "SearchField", "Calendar card", "Recently viewed list", "BottomTabs"],
    interactions: ["Tap green event → Job event (Spruce)", "Bottom tabs → Map / Menu"],
  },
  map: {
    description: "Map context shell — sites layer and search affordances.",
    components: ["SiteTrackerHeader", "Site filter", "Map canvas", "FAB"],
    interactions: ["Bottom tab → Home / Menu"],
  },
  menu: {
    description: "App menu with new inventory and tickets entry points highlighted.",
    components: ["SiteTrackerHeader", "MenuItem rows", "NEW badges on Truck + Tickets"],
    interactions: ["My Truck Inventory → Spruce flows", "Tickets → ticket list", "Jobs → jobs list"],
    isNew: true,
    newFeature: "My Truck Inventory is the Spruce Phase 1 entry point.",
  },
  jobsList: {
    description: "All jobs list with filter dropdown in nav.",
    components: ["NavBar + title row", "SearchField", "Job cards"],
    interactions: ["Tap job → Job event"],
  },
  jobEvent: {
    description: "J-000382 with field asset, reserved items, install/swap, and truck reserve.",
    components: ["NavBar", "Field asset card", "Inventory section", "Reserve / Install CTAs", "Install swap sheet"],
    interactions: ["Install → replace existing asset", "+ Reserve from truck", "View Job Details / Execution"],
    newFeature: "Swap install removes the old site asset and installs the new unit in one transaction.",
  },
  jobEventTickets: {
    description: "Job event variant with originating ticket card from the ticketing prototype.",
    components: ["NavBar", "Originating ticket card", "Status + priority badges", "Quick actions sheet"],
    interactions: ["View ticket → Ticket detail", "+ → Create ticket"],
  },
  jobDetails: {
    description: "Job information accordion with related tab.",
    components: ["NavBar", "Tab bar", "AccordionRow fields"],
    interactions: ["Back → Job event"],
  },
  jobExecution: {
    description: "Gateway to production inventory Locate / Uninstall from job context.",
    components: ["SectionCard", "Inventory action buttons"],
    interactions: ["Locate Inventory → Production job inventory", "Uninstall → job inventory"],
  },
  truckInventory: {
    description: "Adrian's truck — avail/reserved summary, warehouse shortcuts, SKU list.",
    components: ["Summary stats", "Warehouse / My Requests buttons", "SKU cards"],
    interactions: ["Tap SKU → reserve detail", "Warehouse → branch stock", "My Requests → lifecycle"],
    isNew: true,
  },
  inventoryItem: {
    description: "Serialized or quantity reserve for a job from truck stock.",
    components: ["Avail / reserved stats", "Unit rows", "Reserve sheet overlay"],
    interactions: ["Reserve → pick job", "Un-reserve releases hold"],
  },
  warehouseStock: {
    description: "Read-only NJ branch warehouse with request CTA per SKU.",
    components: ["Warehouse header", "Request buttons", "Request quantity sheet"],
    interactions: ["Request → qty + job → My Requests", "My Requests shortcut"],
    isNew: true,
    newFeature: "Techs see warehouse stock but cannot self-transfer — request only.",
  },
  myRequests: {
    description: "Warehouse pull requests with 4-step lifecycle and Mark Received.",
    components: ["Filter chips", "Request cards", "Lifecycle stepper", "Status pills"],
    interactions: ["Mark Received on in-transit items", "Auto-approve demo advances status"],
    isNew: true,
    newFeature: "Requested → Approved → In Transit → Received lifecycle with branch-manager approval.",
  },
  jobInventory: {
    description: "Production J-003448 inventory — USED list, Locate, Uninstall.",
    components: ["NavBar", "Job aids", "USED record stack", "Locate / Uninstall CTAs"],
    interactions: ["Locate Inventory → search + tabs", "Tap USED row menu"],
  },
  locateInventory: {
    description: "Search, site picker, Items / Field Assets tabs, unified record stack.",
    components: ["Search row + scan", "Site picker", "SegmentedControl", "RecordStack"],
    interactions: ["Toggle Field Assets tab in phone", "Tap row → item or asset detail"],
  },
  itemDetail: {
    description: "Item metadata, forms, photos, Install or Consume CTA.",
    components: ["DetailHeader", "MetadataList", "SectionCard", "BottomCta"],
    interactions: ["Install or Consume → transaction form"],
  },
  fieldAssetDetail: {
    description: "Field asset with forms list and install/consume path.",
    components: ["DetailHeader", "Form cards + status pills", "BottomCta"],
    interactions: ["Install or Consume → transaction form"],
  },
  installConsume: {
    description: "Install or consume transaction form from production screenshots.",
    components: ["SheetHeader", "Form fields", "Consume actions"],
    interactions: ["Close → field asset detail", "Consume commits quantity"],
  },
  ticketsList: {
    description: "Tickets list with filters, status badges, and priority indicators.",
    components: ["NavBar", "Filter chips", "Ticket cards", "StatusBadge", "PriorityBadge"],
    interactions: ["Tap ticket → detail", "+ → Create ticket"],
    isNew: true,
  },
  ticketDetail: {
    description: "Ticket information and related sections.",
    components: ["Tab bar", "Status / priority", "Description", "Photo attachments"],
    interactions: ["Back → Tickets list"],
  },
  createTicket: {
    description: "Quick capture + dispatch vs create-job-now modes.",
    components: ["Quick capture row", "Form fields", "Mode toggle footer"],
    interactions: ["Back → Job event (tickets variant)"],
    isNew: true,
  },
};
