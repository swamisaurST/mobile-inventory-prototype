import { useCallback, useState } from "react";
import { BottomTabs } from "./stack/MobileShell";
import { useSpruceInventory } from "./hooks/useSpruceInventory";
import { SCREENS, SCREEN_ORDER, WORKFLOW_GROUPS } from "./workflows";
import {
  HomeScreen,
  MapScreen,
  MenuScreen,
  JobsListScreen,
  JobDetailsScreen,
  JobExecutionScreen,
  JobEventTicketsScreen,
  TicketsListScreen,
  TicketDetailScreen,
  CreateTicketScreen,
} from "./screens/JourneyScreens";
import {
  JobEventScreen,
  TruckInventoryScreen,
  InventoryItemScreen,
  WarehouseStockScreen,
  MyRequestsScreen,
  SpruceOverlays,
} from "./screens/SpruceFlowScreens";
import {
  JobInventoryScreen,
  LocateInventoryScreen,
  ItemDetailScreen,
  FieldAssetDetailScreen,
  InstallConsumeScreen,
} from "./screens/ProductionScreens";

const TAB_SCREENS = new Set(["home", "map", "menu", "jobsList", "ticketsList", "jobInventory"]);
const NO_TAB_SCREENS = new Set([
  "jobDetails", "jobExecution", "jobEventTickets", "inventoryItem", "ticketDetail", "createTicket",
  "itemDetail", "fieldAssetDetail", "installConsume",
]);

function AnnotationPanel({ screenId, onScreenChange, locateTab }) {
  const meta = SCREENS[screenId];
  return (
    <div className="st-annotation-body">
      <label className="st-annotation-label">Workflow</label>
      <div className="st-workflow-chips">
        {WORKFLOW_GROUPS.map((g) => (
          <span key={g.id} className={`st-workflow-chip${meta?.group === g.id ? " st-workflow-chip--active" : ""}`}>{g.label}</span>
        ))}
      </div>
      <label className="st-annotation-label" style={{ marginTop: 16 }}>Screen</label>
      <select className="st-screen-select" value={screenId} onChange={(e) => onScreenChange(e.target.value)}>
        {WORKFLOW_GROUPS.map((g) => (
          <optgroup key={g.id} label={g.label}>
            {SCREEN_ORDER.filter((id) => SCREENS[id].group === g.id).map((id) => (
              <option key={id} value={id}>{SCREENS[id].title}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "16px 0 8px" }}>{meta.title}</h2>
      {meta.description && (
        <p style={{ fontSize: 14, color: "var(--st-text-weak)", lineHeight: 1.6, marginBottom: 16 }}>{meta.description}</p>
      )}
      {screenId === "locateInventory" && (
        <p style={{ fontSize: 12, color: "var(--st-text-muted)" }}>
          Toggle <strong>Field Assets</strong> in the phone — currently <strong>{locateTab === "fieldAssets" ? "Field Assets" : "Items"}</strong>.
        </p>
      )}
      <div className="st-demo-paths">
        <div className="st-annotation-label" style={{ marginTop: 20 }}>Demo paths</div>
        <ul>
          <li><strong>Spruce:</strong> Home → Job event → Install swap → Menu → Truck → Warehouse → Requests</li>
          <li><strong>Production:</strong> Job execution → Inventory → Locate → Detail → Install or consume</li>
          <li><strong>Tickets:</strong> Menu → Tickets (context screens bundled in repo)</li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeTab, setActiveTab] = useState("home");
  const [locateTab, setLocateTab] = useState("items");
  const spruce = useSpruceInventory();

  const nav = useCallback((target) => {
    setScreen(target);
    if (target === "home") setActiveTab("home");
    else if (target === "map") setActiveTab("map");
    else if (TAB_SCREENS.has(target) && target !== "home" && target !== "map") setActiveTab("menu");
  }, []);

  const handleTab = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === "home") setScreen("home");
    else if (tab === "map") setScreen("map");
    else if (tab === "menu") setScreen("menu");
  }, []);

  const handleScreenChange = useCallback((id) => {
    setScreen(id);
    if (id === "home") setActiveTab("home");
    else if (id === "map") setActiveTab("map");
    else if (["menu", "jobsList", "ticketsList", "truckInventory", "jobInventory"].includes(id)) setActiveTab("menu");
    else if (!NO_TAB_SCREENS.has(id)) setActiveTab("home");
  }, []);

  const crumbs = SCREENS[screen]?.breadcrumb || [];
  const showTabs = !NO_TAB_SCREENS.has(screen) && screen !== "locateInventory" && screen !== "truckInventory" && screen !== "warehouseStock" && screen !== "myRequests" && screen !== "jobEvent";

  const phone = (
    <>
      {screen === "home" && <HomeScreen nav={nav} />}
      {screen === "map" && <MapScreen />}
      {screen === "menu" && <MenuScreen nav={nav} />}
      {screen === "jobsList" && <JobsListScreen nav={nav} />}
      {screen === "jobEvent" && <JobEventScreen nav={nav} spruce={spruce} />}
      {screen === "jobEventTickets" && <JobEventTicketsScreen nav={nav} />}
      {screen === "jobDetails" && <JobDetailsScreen nav={nav} />}
      {screen === "jobExecution" && <JobExecutionScreen nav={nav} />}
      {screen === "truckInventory" && <TruckInventoryScreen nav={nav} spruce={spruce} />}
      {screen === "inventoryItem" && <InventoryItemScreen nav={nav} spruce={spruce} />}
      {screen === "warehouseStock" && <WarehouseStockScreen nav={nav} spruce={spruce} />}
      {screen === "myRequests" && <MyRequestsScreen nav={nav} spruce={spruce} />}
      {screen === "jobInventory" && <JobInventoryScreen nav={nav} />}
      {screen === "locateInventory" && <LocateInventoryScreen nav={nav} tab={locateTab} onTab={setLocateTab} />}
      {screen === "itemDetail" && <ItemDetailScreen nav={nav} />}
      {screen === "fieldAssetDetail" && <FieldAssetDetailScreen nav={nav} />}
      {screen === "installConsume" && <InstallConsumeScreen nav={nav} />}
      {screen === "ticketsList" && <TicketsListScreen nav={nav} />}
      {screen === "ticketDetail" && <TicketDetailScreen nav={nav} />}
      {screen === "createTicket" && <CreateTicketScreen nav={nav} />}
      <SpruceOverlays spruce={spruce} />
      {showTabs && <BottomTabs active={activeTab} onTab={handleTab} />}
    </>
  );

  return (
    <div className="st-app">
      <aside className="st-annotation-panel">
        <div className="st-annotation-header">
          <img src="/stack-icons/sitetracker-lettermark-white.svg" alt="Sitetracker" />
          <p>Mobile Inventory · all workflows</p>
        </div>
        <AnnotationPanel screenId={screen} onScreenChange={handleScreenChange} locateTab={locateTab} />
      </aside>
      <main className="st-phone-stage">
        <div>
          <div className="st-breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c}>
                {i > 0 && <span className="st-breadcrumb__sep"> → </span>}
                <span className={i === crumbs.length - 1 ? "st-breadcrumb__current" : ""}>{c}</span>
              </span>
            ))}
          </div>
          <div className="st-phone">{phone}</div>
          <p className="st-hint">
            <strong>20 screens</strong> from folder docs — Spruce Phase 1, production inventory, app journey, and tickets context.
            Start at <strong>Home</strong> for the narrated demo path.
          </p>
        </div>
      </main>
    </div>
  );
}
