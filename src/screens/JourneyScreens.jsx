import { useState } from "react";
import { C } from "../stack/tokens";
import StackIcon from "../stack/StackIcon";
import {
  SiteTrackerHeader,
  NavBar,
  BottomTabs,
  SectionCard,
  StatusBadge,
  PriorityBadge,
  AccordionRow,
  RecentItem,
  MenuItem,
  ChevronLink,
  SearchField,
} from "../stack/MobileShell";

export function HomeScreen({ nav }) {
  return (
    <>
      <SiteTrackerHeader />
      <div className="st-phone-content">
        <div style={{ padding: "8px 14px", background: C.surface }}>
          <SearchField placeholder="Search..." />
        </div>
        <div className="st-new-card">
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 12px 6px" }}>
            <StackIcon name="calendar" size={16} tone="dark" />
            <span className="st-section-card__title">Calendar</span>
          </div>
          <div style={{ display: "flex", padding: "4px 12px 6px" }}>
            {[{ d: "S", n: "12" }, { d: "M", n: "13", active: true }, { d: "T", n: "14", today: true }, { d: "W", n: "15" }, { d: "T", n: "16" }, { d: "F", n: "17" }, { d: "S", n: "18" }].map((day, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 9, color: day.today ? C.teal : C.textMuted, fontWeight: 600, marginBottom: 3 }}>{day.d}</div>
                {day.active ? (
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, margin: "0 auto" }}>{day.n}</div>
                ) : (
                  <div style={{ fontSize: 12, fontWeight: day.today ? 700 : 500, color: day.today ? C.teal : C.textDefault, lineHeight: "26px" }}>{day.n}</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ padding: "0 12px 12px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ textAlign: "center", paddingTop: 3 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.textDefault, lineHeight: 1 }}>13</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.textWeak }}>MON</div>
              </div>
              <button type="button" onClick={() => nav("jobEvent")} style={{ flex: 1, background: C.success, borderRadius: 8, padding: "10px 12px", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>Event: J-000382: Inverter Replacement</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>Checked-In</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>4:19 PM - 5:19 PM</div>
              </button>
            </div>
          </div>
          <ChevronLink>View Full Calendar</ChevronLink>
        </div>
        <div className="st-new-card">
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 12px" }}>
            <StackIcon name="clock" size={16} tone="dark" />
            <span className="st-section-card__title">Recently Viewed (20)</span>
          </div>
          <RecentItem icon="workOrder" name="J-000382" subtitle="Job Template:" onClick={() => nav("jobEvent")} />
          <RecentItem icon="location" name="Morinville" subtitle="Site Type: Macro" />
          <RecentItem icon="project" name="P-002866" subtitle="Site Name: Fruitvale" />
          <ChevronLink>View Full List</ChevronLink>
        </div>
        <div className="st-new-card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 12px" }}>
            <StackIcon name="favorite" size={16} tone="dark" />
            <span className="st-section-card__title">My Favorites (3)</span>
          </div>
          <RecentItem icon="location" name="GA – Calhoun – Buc-ee's" subtitle="Site Type: Convenience Shop" />
          <RecentItem icon="workOrder" name="J-003520" subtitle="Job Template: PM Quarterly" />
        </div>
      </div>
    </>
  );
}

export function MapScreen() {
  return (
    <>
      <SiteTrackerHeader />
      <div className="st-phone-content" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "6px 14px", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
          <div className="st-search-field">
            <span style={{ fontSize: 13, color: C.textDefault }}>All Sites</span>
            <StackIcon name="chevrondown" size={14} tone="muted" style={{ marginLeft: "auto" }} />
          </div>
        </div>
        <div style={{ flex: 1, position: "relative", background: "#E8E4D8" }}>
          <div style={{ position: "absolute", top: 8, left: 8, right: 8, display: "flex", gap: 6, zIndex: 2 }}>
            <div style={{ flex: 1, padding: "6px 10px", background: C.surface, borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 12, color: C.textMuted }}>Search</div>
            <div style={{ width: 32, height: 32, background: C.surface, borderRadius: 6, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <StackIcon name="search" size={16} tone="muted" />
            </div>
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, #C8E6C9 0%, #A5D6A7 30%, #81C784 60%, #E8E4D8 100%)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.textDefault }}>Bengaluru</div>
                <div style={{ fontSize: 10, color: C.textWeak, marginTop: 3 }}>12 sites in view</div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", right: 10, top: 50, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.surface, boxShadow: "0 2px 6px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <StackIcon name="layers" size={18} tone="dark" />
            </div>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.teal, boxShadow: "0 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <StackIcon name="add" size={24} tone="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function JobEventTicketsScreen({ nav }) {
  const [showQA, setShowQA] = useState(false);
  return (
    <>
      <NavBar title="Event: J-000382" showBack showStar showPlus onBack={() => nav("home")} onPlus={() => setShowQA(true)} />
      <div className="st-phone-content">
        <div style={{ padding: "10px 14px 0", background: C.surface }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: C.textDefault, lineHeight: "26px" }}>J-000382</div>
        </div>
        <div style={{ display: "flex", background: C.surface, padding: "6px 0 12px" }}>
          <div style={{ width: 110, height: 80, background: "linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 14, borderRadius: 6 }}>
            <StackIcon name="location" size={28} tone="dark" />
          </div>
          <div style={{ flex: 1, padding: "4px 14px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textDefault }}>Morinville</div>
            <div style={{ fontSize: 12, color: C.textWeak, marginBottom: 8 }}>Morinville, AB</div>
            <button type="button" className="st-btn-secondary" style={{ width: "auto", padding: "6px 14px", fontSize: 11 }}>Start Directions</button>
          </div>
        </div>
        <ChevronLink onClick={() => nav("jobDetails")}>View Job Details</ChevronLink>
        <ChevronLink onClick={() => nav("jobExecution")}>Job Execution</ChevronLink>
        <SectionCard icon="calendar" title="Schedule">
          <div style={{ fontSize: 14, color: C.textDefault, lineHeight: "22px" }}>Monday, 13 April 2026</div>
          <div style={{ fontSize: 14, color: C.textDefault, lineHeight: "22px" }}>4:19 PM - 5:19 PM</div>
        </SectionCard>
        <SectionCard icon="chart" title="My Timetracking">
          <div style={{ display: "flex", alignItems: "center", padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 5, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, background: C.success, borderRadius: "50%" }} />
              <span style={{ fontSize: 14, color: C.textDefault }}>Checked-In</span>
            </div>
            <StackIcon name="chevrondown" size={12} tone="muted" />
          </div>
        </SectionCard>
        <div className="st-new-card">
          <div style={{ padding: "10px 12px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <StackIcon name="case" size={16} tone="dark" />
              <span className="st-section-card__title">Originating Ticket</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.textDefault }}>T-0000002</span>
                <StatusBadge status="In Progress" />
              </div>
              <PriorityBadge priority="High" />
            </div>
          </div>
          <div style={{ padding: "0 12px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textDefault, marginBottom: 2 }}>Payment terminal has a security violation</div>
            <div style={{ fontSize: 12, color: C.textWeak, lineHeight: 1.4, marginBottom: 6 }}>Customers reporting that several chargers are not functioning correctly...</div>
          </div>
          <div style={{ padding: "0 12px", display: "flex", gap: 5, marginBottom: 8 }}>
            {[1, 2].map((i) => (
              <div key={i} style={{ width: 40, height: 40, borderRadius: 5, background: C.surfaceSection, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <StackIcon name="photo" size={18} tone="muted" />
              </div>
            ))}
            <div style={{ width: 40, height: 40, borderRadius: 5, background: C.surfaceBg, border: `1px dashed ${C.textMuted}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.textWeak }}>+1</div>
          </div>
          <ChevronLink align="end" onClick={() => nav("ticketDetail")}>View ticket</ChevronLink>
        </div>
        <div className="st-section-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, textTransform: "uppercase", marginBottom: 1 }}>Field Asset</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.teal }}>Double Port ALPI Charger</div>
            <div style={{ fontSize: 10, color: C.textWeak }}>104000007 · GA – Calhoun</div>
          </div>
          <div style={{ background: "#FFEBEE", borderRadius: 6, padding: "5px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.error }}>4</div>
            <div style={{ fontSize: 8, color: C.error, fontWeight: 600, lineHeight: 1.2 }}>tickets<br />/ 6mo</div>
          </div>
        </div>
        <SectionCard icon="task" title="Forms" count={0}>
          <button type="button" className="st-btn-primary">Add new form</button>
        </SectionCard>
        <SectionCard icon="image" title="Photos & Files" count={0}>
          <button type="button" className="st-btn-primary">Add Photos & Files</button>
        </SectionCard>
        <div style={{ height: 16 }} />
      </div>
      {showQA && (
        <div className="st-overlay" onClick={() => setShowQA(false)}>
          <div className="st-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: C.textDefault }}>Quick Actions</span>
              <button type="button" onClick={() => setShowQA(false)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }} aria-label="Close">
                <StackIcon name="close" size={20} tone="muted" />
              </button>
            </div>
            {[
              { icon: "workOrder", label: "Log Work" },
              { icon: "clock", label: "Log Time" },
              { icon: "photo", label: "Take a Photo" },
              { icon: "task", label: "Complete a Form" },
              { icon: "case", label: "Create Ticket", isNew: true },
            ].map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => { setShowQA(false); if (a.isNew) nav("createTicket"); }}
                className={`st-menu-item${a.isNew ? " st-menu-item--new" : ""}`}
                style={{ width: "100%", margin: "0 0 6px" }}
              >
                <div className={`st-menu-item__icon${a.isNew ? " st-menu-item__icon--new" : ""}`} style={{ width: 32, height: 32 }}>
                  <StackIcon name={a.icon} size={16} tone={a.isNew ? "brand" : "brand"} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: a.isNew ? C.orange : C.teal, flex: 1 }}>{a.label}</span>
                {a.isNew && <span className="st-menu-item__badge">NEW</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export function JobDetailsScreen({ nav }) {
  const [tab, setTab] = useState("info");
  const [openSections, setOpenSections] = useState({ info: true });
  const toggle = (s) => setOpenSections((p) => ({ ...p, [s]: !p[s] }));
  return (
    <>
      <NavBar title="J-000382 Details" showBack onBack={() => nav("jobEvent")} />
      <div className="st-phone-content st-phone-content--white">
        <div className="st-tab-bar">
          {["info", "related"].map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`st-tab${tab === t ? " st-tab--active" : ""}`}>
              {t === "info" ? "Job Information" : "Related"}
            </button>
          ))}
        </div>
        {tab === "info" ? (
          <>
            <AccordionRow label="Information" isOpen={openSections.info} onClick={() => toggle("info")} />
            {openSections.info && (
              <div style={{ padding: "0 14px 14px" }}>
                {[
                  { label: "Job Name", value: "J-000382", required: true },
                  { label: "Job Template", value: "", search: true },
                  { label: "Site", value: "Morinville", link: true },
                  { label: "Job Status", value: "In Progress", dropdown: true },
                  { label: "Field Asset", value: "", search: true },
                  { label: "Priority", value: "Medium", dropdown: true },
                ].map((f, i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${C.surfaceBg}` }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, marginBottom: 3 }}>
                      {f.required && <span style={{ color: C.error }}>* </span>}{f.label}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, color: f.link ? C.teal : f.value ? C.textDefault : C.textMuted, fontWeight: f.value ? 500 : 400 }}>{f.value || " "}</span>
                      {f.search && <StackIcon name="search" size={16} tone="muted" />}
                      {f.dropdown && <StackIcon name="chevrondown" size={12} tone="muted" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {["Text", "Resources", "Scheduling", "Related Information"].map((s) => (
              <AccordionRow key={s} label={s} isOpen={false} onClick={() => {}} />
            ))}
          </>
        ) : (
          ["Inventory Transactions", "Job Tasks", "Job Items", "Forms", "Calendar Events (2)", "Jobs"].map((s) => (
            <AccordionRow key={s} label={s} isOpen={false} onClick={() => {}} />
          ))
        )}
      </div>
    </>
  );
}

export function JobExecutionScreen({ nav }) {
  return (
    <>
      <NavBar title="J-000382 Execution" showBack onBack={() => nav("jobEvent")} />
      <div className="st-phone-content">
        <SectionCard icon="calendar" title="Schedule">
          <div style={{ fontSize: 14, color: C.textDefault }}>Monday, 13 April 2026</div>
          <div style={{ fontSize: 14, color: C.textDefault }}>4:19 PM - 5:19 PM</div>
        </SectionCard>
        <SectionCard icon="chart" title="My Timetracking">
          <div style={{ display: "flex", alignItems: "center", padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 5, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, background: C.success, borderRadius: "50%" }} />
              <span style={{ fontSize: 14, color: C.textDefault }}>Checked-In</span>
            </div>
            <StackIcon name="chevrondown" size={12} tone="muted" />
          </div>
        </SectionCard>
        <SectionCard icon="task" title="Forms" count={0}><button type="button" className="st-btn-primary">Add new form</button></SectionCard>
        <SectionCard icon="image" title="Photos & Files" count={0}><button type="button" className="st-btn-primary">Add Photos & Files</button></SectionCard>
        <SectionCard icon="workOrder" title="Inventory">
          <button type="button" className="st-btn-secondary" style={{ marginBottom: 6 }} onClick={() => nav("jobInventory")}>Locate Inventory</button>
          <button type="button" className="st-btn-secondary" onClick={() => nav("jobInventory")}>Uninstall</button>
        </SectionCard>
      </div>
    </>
  );
}

export function MenuScreen({ nav }) {
  return (
    <>
      <SiteTrackerHeader />
      <div className="st-phone-content st-phone-content--white" style={{ paddingTop: 6 }}>
        <MenuItem icon="favorite" label="Favorites" />
        <MenuItem icon="location" label="Sites" />
        <MenuItem icon="project" label="Projects" />
        <MenuItem icon="workOrder" label="Jobs" onClick={() => nav("jobsList")} />
        <MenuItem icon="package" label="My Truck Inventory" isNew onClick={() => nav("truckInventory")} />
        <MenuItem icon="case" label="Tickets" isNew onClick={() => nav("ticketsList")} />
        <MenuItem icon="task" label="Forms" />
        <MenuItem icon="expense" label="Expense Reports" />
        <MenuItem icon="workOrderItem" label="Job Items" />
      </div>
    </>
  );
}

export function JobsListScreen({ nav }) {
  const jobs = [
    { id: "J-000382", template: "--", site: "Morinville", asset: "--" },
    { id: "J-003520", template: "--", site: "2011-WTW-13932-OE", asset: "--" },
    { id: "J-006374", template: "--", site: "100 CONGRESS", asset: "FA-00000023" },
  ];
  return (
    <>
      <NavBar
        showBack
        onBack={() => nav("menu")}
        showPlus
        leftContent={(
          <div className="st-mobile-nav-title-row">
            <span>All</span>
            <StackIcon name="chevrondown" size={12} tone="white" />
          </div>
        )}
      />
      <div className="st-phone-content">
        <div style={{ padding: "8px 14px" }}><SearchField placeholder="Search jobs" /></div>
        {jobs.map((j) => (
          <button key={j.id} type="button" onClick={() => nav("jobEvent")} className="st-section-card" style={{ width: "calc(100% - 28px)", margin: "0 14px 8px", cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.textDefault, marginBottom: 3 }}>{j.id}</div>
            <div style={{ fontSize: 12, color: C.textWeak }}>Template: {j.template}</div>
            <div style={{ fontSize: 12, color: C.textWeak }}>Site: {j.site}</div>
            <div style={{ fontSize: 12, color: C.textWeak }}>Asset: {j.asset}</div>
          </button>
        ))}
      </div>
    </>
  );
}

export function TicketsListScreen({ nav }) {
  const [filter, setFilter] = useState("All");
  const tickets = [
    { id: "T-0000002", title: "Payment terminal security violation", asset: "Double Port ALPI Charger", site: "GA – Calhoun – Buc-ee's", status: "In Progress", priority: "High", time: "2d ago", jobs: 1, photos: 3 },
    { id: "T-0000005", title: "EV charger connector damaged", asset: "Single Port ALPI Charger", site: "GA – Calhoun – Buc-ee's", status: "New", priority: "Urgent", time: "4h ago", jobs: 0, photos: 2 },
    { id: "T-0000003", title: "Intermittent fault alarm on Panel B", asset: "MV Switch #SW-2847", site: "Morinville", status: "Open", priority: "Medium", time: "1w ago", jobs: 2, photos: 0 },
    { id: "T-0000001", title: "Oil level low — routine top-up", asset: "Transformer T-440", site: "Morinville", status: "Closed", priority: "Low", time: "2w ago", jobs: 1, photos: 1 },
  ];
  return (
    <>
      <NavBar
        showBack
        onBack={() => nav("menu")}
        showPlus
        onPlus={() => nav("createTicket")}
        leftContent={(
          <div className="st-mobile-nav-title-row">
            <span>Tickets</span>
            <StackIcon name="chevrondown" size={12} tone="white" />
          </div>
        )}
      />
      <div className="st-phone-content">
        <div style={{ padding: "8px 14px 0" }}><SearchField placeholder="Search tickets" /></div>
        <div style={{ display: "flex", gap: 6, padding: "8px 14px", overflowX: "auto" }}>
          {["All", "Open", "My Created", "Urgent"].map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`st-filter-chip ${filter === f ? "st-filter-chip--active" : "st-filter-chip--inactive"}`}>{f}</button>
          ))}
        </div>
        {tickets.map((t) => (
          <button key={t.id} type="button" onClick={() => nav("ticketDetail")} className="st-section-card" style={{ width: "calc(100% - 28px)", margin: "0 14px 8px", cursor: "pointer", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.textDefault }}>{t.id}</span>
                <StatusBadge status={t.status} />
              </div>
              <PriorityBadge priority={t.priority} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textDefault, marginBottom: 3, lineHeight: 1.3 }}>{t.title}</div>
            <div style={{ fontSize: 10, color: C.textWeak, marginBottom: 2 }}><span style={{ fontWeight: 500 }}>{t.asset}</span> · {t.site}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <div style={{ display: "flex", gap: 10, fontSize: 10, color: C.textWeak, alignItems: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><StackIcon name="workOrder" size={12} tone="muted" /> {t.jobs} job{t.jobs !== 1 ? "s" : ""}</span>
                {t.photos > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><StackIcon name="photo" size={12} tone="muted" /> {t.photos}</span>}
              </div>
              <span style={{ fontSize: 10, color: C.textMuted }}>{t.time}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export function TicketDetailScreen({ nav }) {
  const [tab, setTab] = useState("info");
  return (
    <>
      <NavBar title="T-0000002" showBack onBack={() => nav("ticketsList")} />
      <div className="st-phone-content">
        <div className="st-tab-bar">
          {["info", "related"].map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`st-tab${tab === t ? " st-tab--active" : ""}`}>
              {t === "info" ? "Ticket Information" : "Related"}
            </button>
          ))}
        </div>
        {tab === "info" ? (
          <>
            <div className="st-section-card">
              <div style={{ display: "flex", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                <div><div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, marginBottom: 2 }}>Status</div><StatusBadge status="In Progress" size="md" /></div>
                <div><div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, marginBottom: 2 }}>Priority</div><PriorityBadge priority="High" /></div>
                <div><div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, marginBottom: 2 }}>Source</div><span style={{ fontSize: 12, fontWeight: 600, color: C.textDefault }}>Call</span></div>
                <div><div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, marginBottom: 2 }}>Category</div><span style={{ fontSize: 12, fontWeight: 600, color: C.textDefault }}>Corrective</span></div>
              </div>
              <div><div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, marginBottom: 2 }}>Assigned To</div><span style={{ fontSize: 14, fontWeight: 600, color: C.teal }}>Silviu Silaghi</span></div>
            </div>
            <div className="st-section-card">
              <div className="st-section-card__title" style={{ marginBottom: 4 }}>Description</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.textDefault, marginBottom: 3 }}>Payment terminal has a security violation</div>
              <div style={{ fontSize: 12, color: C.textDefault, lineHeight: 1.5, marginBottom: 10 }}>Customers reporting that several chargers are not functioning correctly. Main issue is that they will not accept payment.</div>
              <div className="st-section-card__title" style={{ marginBottom: 4 }}>Customer Comments</div>
              <div style={{ fontSize: 12, color: C.textWeak, lineHeight: 1.5, borderLeft: `3px solid ${C.warning}`, paddingLeft: 8, fontStyle: "italic" }}>
                "Customers reporting chargers not functioning. Payment pad also not working. Thanks"
              </div>
            </div>
            <div className="st-section-card">
              <div className="st-section-card__title" style={{ marginBottom: 6 }}>Photos & Attachments (3)</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ width: 56, height: 56, borderRadius: 6, background: C.surfaceSection, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StackIcon name="photo" size={22} tone="muted" />
                  </div>
                ))}
              </div>
            </div>
            <div className="st-section-card">
              <div className="st-section-card__title" style={{ marginBottom: 8 }}>Ticket Details</div>
              {[{ l: "Ticket Number", v: "T-0000002" }, { l: "Customer", v: "Buc-ee's" }, { l: "Site", v: "GA – Calhoun – Buc-ee's", link: true }, { l: "Field Asset", v: "104000007", link: true }].map((f, i, arr) => (
                <div key={f.l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.surfaceBg}` : "none" }}>
                  <span style={{ fontSize: 12, color: C.textWeak }}>{f.l}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: f.link ? C.teal : C.textDefault }}>{f.v}</span>
                </div>
              ))}
            </div>
            <div className="st-section-card" style={{ marginBottom: 16 }}>
              <div className="st-section-card__title" style={{ marginBottom: 8 }}>Dates</div>
              {[{ l: "Reported Date", v: "12/3/2025" }, { l: "Due Date", v: "12/4/2025" }].map((f, i) => (
                <div key={f.l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 1 ? `1px solid ${C.surfaceBg}` : "none" }}>
                  <span style={{ fontSize: 12, color: C.textWeak }}>{f.l}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.textDefault }}>{f.v}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {["Jobs (1)", "Contact Details", "Site Details", "Field Asset Details", "Contract Agreement & SLA"].map((s) => (
              <div key={s} className="st-section-card" style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.textDefault }}>{s}</span>
                <StackIcon name="chevronright" size={14} tone="muted" />
              </div>
            ))}
            <div style={{ height: 16 }} />
          </>
        )}
      </div>
    </>
  );
}

export function CreateTicketScreen({ nav }) {
  const [mode, setMode] = useState("dispatch");
  return (
    <>
      <NavBar title="Create Ticket" showBack onBack={() => nav("jobEventTickets")} />
      <div className="st-phone-content">
        <div style={{ background: C.surface, padding: "12px 14px", borderBottom: `1px solid ${C.border}` }}>
          <div className="st-section-card__title" style={{ marginBottom: 8, color: C.textWeak }}>Quick Capture</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ icon: "photo", l: "Photo" }, { icon: "voice", l: "Voice" }, { icon: "scan", l: "Scan QR" }].map((a) => (
              <button key={a.l} type="button" style={{ flex: 1, padding: "10px 6px", borderRadius: 8, border: `1.5px solid ${C.teal}`, background: C.tealSelected, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
                <StackIcon name={a.icon} size={20} tone="brand" />
                <span style={{ fontSize: 10, fontWeight: 600, color: C.teal }}>{a.l}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "10px 14px" }}>
          {[{ label: "Title", required: true, placeholder: "What's the issue?", mic: true }, { label: "Description", placeholder: "Describe the issue...", mic: true, tall: true }].map((f) => (
            <div key={f.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.textDefault }}>{f.label}</span>
                {f.required && <span style={{ color: C.error }}>*</span>}
              </div>
              <div style={{ padding: 10, borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, display: "flex", justifyContent: "space-between", alignItems: f.tall ? "flex-start" : "center", minHeight: f.tall ? 60 : "auto" }}>
                <span style={{ fontSize: 14, color: C.textMuted }}>{f.placeholder}</span>
                {f.mic && <StackIcon name="voice" size={16} tone="muted" />}
              </div>
            </div>
          ))}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textDefault }}>Link Asset</span><span style={{ color: C.error }}>*</span>
            </div>
            <div style={{ padding: 10, borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, color: C.textMuted }}>Search or scan asset</span>
              <StackIcon name="scan" size={16} tone="brand" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textDefault }}>Priority</span><span style={{ color: C.error }}>*</span>
            </div>
            <div style={{ padding: 10, borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.warning }} />
                <span style={{ fontSize: 14, color: C.textDefault }}>Medium</span>
              </div>
              <StackIcon name="chevrondown" size={12} tone="muted" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textDefault, marginBottom: 3 }}>Category</div>
            <div style={{ padding: 10, borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, color: C.textDefault }}>Corrective</span>
              <StackIcon name="chevrondown" size={12} tone="muted" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textDefault, marginBottom: 3 }}>Photos</div>
            <div style={{ width: 52, height: 52, borderRadius: 6, border: `2px dashed ${C.teal}`, background: C.tealSelected, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <StackIcon name="add" size={18} tone="brand" />
              <span style={{ fontSize: 8, color: C.teal, fontWeight: 600 }}>Add</span>
            </div>
          </div>
          <div style={{ marginBottom: 12, padding: "8px 10px", background: C.tealSelected, borderRadius: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, textTransform: "uppercase", marginBottom: 1 }}>Site (auto-populated)</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.teal }}>GA – Calhoun – Buc-ee's</div>
          </div>
        </div>
      </div>
      <div className="st-create-ticket-footer">
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <button type="button" onClick={() => setMode("dispatch")} style={{ flex: 1, padding: 7, borderRadius: 6, fontSize: 10, fontWeight: 600, border: "none", cursor: "pointer", background: mode === "dispatch" ? C.teal : C.surfaceBg, color: mode === "dispatch" ? "#fff" : C.textWeak }}>Send to Dispatch</button>
          <button type="button" onClick={() => setMode("job")} style={{ flex: 1, padding: 7, borderRadius: 6, fontSize: 10, fontWeight: 600, border: "none", cursor: "pointer", background: mode === "job" ? C.orange : C.surfaceBg, color: mode === "job" ? "#fff" : C.textWeak }}>Create Job Now</button>
        </div>
        <div style={{ fontSize: 10, color: C.textWeak, marginBottom: 8, lineHeight: 1.3 }}>
          {mode === "dispatch" ? "Ticket will be sent to dispatch for triage." : "A job will be created and assigned to you immediately."}
        </div>
        <button type="button" style={{ width: "100%", padding: 12, borderRadius: 6, border: "none", background: mode === "dispatch" ? C.teal : C.orange, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          {mode === "dispatch" ? "Submit Ticket" : "Submit & Start Job"}
        </button>
      </div>
    </>
  );
}
