import { useCallback, useState } from "react";
import { BottomTabs } from "./stack/MobileShell";
import { useSpruceInventory } from "./hooks/useSpruceInventory";
import AnnotationPanel from "./stack/AnnotationPanel";
import { assetUrl } from "./stack/assetUrl";
import { SCREENS } from "./workflows";
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
          <img src={assetUrl("stack-icons/sitetracker-lettermark-white.svg")} alt="Sitetracker" />
          <p>Mobile Inventory Prototype — STACK</p>
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
            <strong>Interactive:</strong> Tap elements in the phone to navigate. Use the screen map or dropdown on the left to jump to any screen.
          </p>
        </div>
      </main>
    </div>
  );
}
