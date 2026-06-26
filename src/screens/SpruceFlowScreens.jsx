import { useState } from "react";
import { C } from "../stack/tokens";
import { NavBar, SectionCard, ChevronLink, SearchField } from "../stack/MobileShell";
import { Fab } from "../stack/InventoryPrimitives";
import StackIcon from "../stack/StackIcon";
import {
  CURRENT_JOB_ID,
  myJobs,
  summarize,
} from "../data/spruceData";

export function JobEventScreen({ nav, spruce }) {
  const [showQA, setShowQA] = useState(false);
  const { inventory, siteAsset, openInstall } = spruce;

  const reservedItems = [];
  inventory.forEach((item) => {
    if (item.serialized) {
      item.units.forEach((u) => {
        if (u.status === "reserved" && u.reservedFor === CURRENT_JOB_ID) {
          reservedItems.push({ kind: "serial", sku: item.sku, name: item.name, unitId: u.id });
        }
      });
    } else {
      const r = (item.reservations || []).find((x) => x.jobId === CURRENT_JOB_ID);
      if (r?.count > 0) reservedItems.push({ kind: "qty", sku: item.sku, name: item.name, count: r.count });
    }
  });

  const installedItems = [];
  inventory.forEach((item) => {
    if (item.serialized) {
      item.units.forEach((u) => {
        if (u.status === "installed" && u.installedAt === CURRENT_JOB_ID) {
          installedItems.push({ name: item.name, unitId: u.id });
        }
      });
    }
  });

  return (
    <>
      <NavBar title="Event: J-000382" showBack showStar showPlus onBack={() => nav("home")} onPlus={() => setShowQA(true)} />
      <div className="st-phone-content">
        <div className="st-page-title">J-000382</div>
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
          <div style={{ fontSize: 14, color: C.textDefault }}>Monday, 13 April 2026</div>
          <div style={{ fontSize: 14, color: C.textDefault }}>4:19 PM - 5:19 PM</div>
        </SectionCard>

        <div className="st-section-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.textWeak, textTransform: "uppercase", marginBottom: 2 }}>Field Asset</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: siteAsset.status === "disposed" ? C.textMuted : C.teal, textDecoration: siteAsset.status === "disposed" ? "line-through" : "none" }}>{siteAsset.name}</div>
            <div style={{ fontSize: 12, color: C.textWeak, fontFamily: "monospace" }}>{siteAsset.serial} · {siteAsset.site}</div>
            <div style={{ marginTop: 6, display: "flex", gap: 4, flexWrap: "wrap" }}>
              {siteAsset.status === "disposed" ? (
                <>
                  <span className="st-form-pill" style={{ background: "#FFEBEE", color: C.error }}>Removed · replaced by {siteAsset.disposedReplacedBy}</span>
                  <span className="st-form-pill" style={{ background: "#E6F4EA", color: C.success }}>Swapped today</span>
                </>
              ) : siteAsset.warranty === "expired" ? (
                <span className="st-form-pill" style={{ background: "#FFEBEE", color: C.error }}>Out of warranty</span>
              ) : null}
            </div>
          </div>
        </div>

        <SectionCard icon="package" title="Inventory">
          {reservedItems.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div className="st-section-card__eyebrow" style={{ color: C.amber }}>Reserved for this job ({reservedItems.length})</div>
              {reservedItems.map((r, i) => (
                <div key={i} style={{ background: C.newHighlight, border: `1px solid ${C.amber}40`, borderRadius: 6, padding: "8px 10px", marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.textDefault }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: C.textWeak, fontFamily: r.kind === "serial" ? "monospace" : "inherit" }}>{r.kind === "serial" ? r.unitId : `Qty ${r.count}`}</div>
                  </div>
                  {r.kind === "serial" && (
                    <button type="button" onClick={() => openInstall({ sku: r.sku, unitId: r.unitId, name: r.name })} className="st-btn-primary" style={{ width: "auto", padding: "6px 12px", fontSize: 11, background: C.amber }}>Install</button>
                  )}
                </div>
              ))}
            </div>
          )}
          {installedItems.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div className="st-section-card__eyebrow" style={{ color: C.success }}>Installed ({installedItems.length})</div>
              {installedItems.map((it, i) => (
                <div key={i} style={{ background: "#E6F4EA", borderRadius: 6, padding: "8px 10px", marginBottom: 5 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{it.name}</div>
                  <div style={{ fontSize: 12, color: C.textWeak, fontFamily: "monospace" }}>{it.unitId}</div>
                </div>
              ))}
            </div>
          )}
          {reservedItems.length === 0 && installedItems.length === 0 && (
            <p style={{ fontSize: 14, color: C.textWeak, marginBottom: 10 }}>No items reserved or installed for this job yet.</p>
          )}
          <button type="button" className="st-btn-primary" style={{ marginBottom: 8 }} onClick={() => nav("truckInventory")}>+ Reserve from truck</button>
          <button type="button" className="st-btn-secondary">Scan to install</button>
        </SectionCard>
        <div style={{ height: 72 }} />
      </div>
      <Fab />
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
            ].map((a) => (
              <button key={a.label} type="button" onClick={() => setShowQA(false)} className="st-menu-item" style={{ width: "100%", margin: "0 0 6px" }}>
                <div className="st-menu-item__icon" style={{ width: 32, height: 32 }}>
                  <StackIcon name={a.icon} size={16} tone="brand" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.teal, flex: 1 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export function TruckInventoryScreen({ nav, spruce }) {
  const { inventory, requests } = spruce;
  const totalAvail = inventory.reduce((sum, it) => sum + summarize(it).avail, 0);
  const totalReserved = inventory.reduce((sum, it) => sum + summarize(it).reserved, 0);
  const openRequests = requests.filter((r) => r.status !== "received").length;

  return (
    <>
      <NavBar title="My Truck Inventory" showBack onBack={() => nav("menu")} />
      <div className="st-phone-content">
        <div className="st-section-card">
          <div style={{ fontSize: 14, fontWeight: 700 }}>Adrian&apos;s Truck</div>
          <div style={{ fontSize: 12, color: C.textWeak }}>Site P001 · NJ region</div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <div style={{ flex: 1, padding: 10, background: "#E6F4EA", borderRadius: 6, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.success }}>{totalAvail}</div>
              <div style={{ fontSize: 11, color: C.textWeak }}>AVAILABLE</div>
            </div>
            <div style={{ flex: 1, padding: 10, background: "#FFF8F0", borderRadius: 6, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.amber }}>{totalReserved}</div>
              <div style={{ fontSize: 11, color: C.textWeak }}>RESERVED</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "0 14px 8px" }}>
          <button type="button" className="st-btn-secondary" style={{ flex: 1 }} onClick={() => nav("warehouseStock")}>Warehouse</button>
          <button type="button" className="st-btn-secondary" style={{ flex: 1 }} onClick={() => nav("myRequests")}>
            My Requests{openRequests > 0 ? ` (${openRequests})` : ""}
          </button>
        </div>
        <div style={{ padding: "0 14px 8px" }}><SearchField placeholder="Search inventory" /></div>
        {inventory.map((item) => {
          const s = summarize(item);
          return (
            <button key={item.sku} type="button" className="st-section-card" style={{ width: "calc(100% - 28px)", cursor: "pointer", textAlign: "left" }} onClick={() => { spruce.openSku(item.sku); nav("inventoryItem"); }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: C.textWeak, fontFamily: "monospace" }}>{item.sku}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                <span style={{ color: C.success, fontWeight: 600 }}>{s.avail} avail</span>
                {s.reserved > 0 && <span style={{ color: C.amber, fontWeight: 600, marginLeft: 10 }}>{s.reserved} reserved</span>}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

export function InventoryItemScreen({ nav, spruce }) {
  const { inventory, selectedSku, openReserveSerial, openReserveQty, unreserve } = spruce;
  const item = inventory.find((i) => i.sku === selectedSku) || inventory[0];
  if (!item) return null;
  const s = summarize(item);

  return (
    <>
      <NavBar title={item.name} showBack onBack={() => nav("truckInventory")} />
      <div className="st-phone-content">
        <div className="st-section-card">
          <div style={{ fontSize: 12, color: C.textWeak, fontFamily: "monospace" }}>{item.sku}</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{item.name}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, textAlign: "center", background: "#E6F4EA", borderRadius: 6, padding: 8 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.success }}>{s.avail}</div>
              <div style={{ fontSize: 11, color: C.textWeak }}>Available</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", background: "#FFF8F0", borderRadius: 6, padding: 8 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.amber }}>{s.reserved}</div>
              <div style={{ fontSize: 11, color: C.textWeak }}>Reserved</div>
            </div>
          </div>
        </div>
        {item.serialized ? (
          item.units.map((u) => (
            <div key={u.id} className="st-section-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "monospace", fontWeight: 700 }}>{u.id}</div>
                <div style={{ fontSize: 12, color: u.status === "available" ? C.success : C.amber }}>{u.status}{u.reservedFor ? ` · ${u.reservedFor}` : ""}</div>
              </div>
              {u.status === "available" && (
                <button type="button" className="st-btn-secondary" style={{ width: "auto" }} onClick={() => openReserveSerial(item.sku, u.id)}>Reserve</button>
              )}
              {u.status === "reserved" && (
                <button type="button" className="st-btn-secondary" style={{ width: "auto", color: C.error, borderColor: C.error }} onClick={() => unreserve(item.sku, u.id)}>Un-reserve</button>
              )}
            </div>
          ))
        ) : (
          <div className="st-section-card">
            <p style={{ fontSize: 14, color: C.textWeak, marginBottom: 10 }}>Tracked by quantity. Reserve units for an upcoming job.</p>
            <button type="button" className="st-btn-primary" disabled={s.avail === 0} onClick={() => openReserveQty(item.sku)}>
              {s.avail === 0 ? "No units available" : "Reserve quantity for a job"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function WarehouseStockScreen({ nav, spruce }) {
  const { warehouseInventory, requests, openRequest } = spruce;
  const pendingForSku = (sku) => requests.filter((r) => r.sku === sku && r.status !== "received").length;

  return (
    <>
      <NavBar title="Warehouse Stock" showBack onBack={() => nav("truckInventory")} />
      <div className="st-phone-content">
        <div className="st-section-card">
          <div style={{ fontSize: 14, fontWeight: 700 }}>NJ Branch Warehouse</div>
          <div style={{ fontSize: 12, color: C.textWeak }}>Read-only · Submit a request to pull stock</div>
          <button type="button" className="st-btn-secondary" style={{ marginTop: 10, width: "auto" }} onClick={() => nav("myRequests")}>My Requests</button>
        </div>
        {warehouseInventory.map((item) => (
          <div key={item.sku} className="st-section-card" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: C.textWeak }}>{item.available} in warehouse{pendingForSku(item.sku) > 0 ? ` · ${pendingForSku(item.sku)} pending` : ""}</div>
            </div>
            <button type="button" className="st-btn-secondary" style={{ width: "auto" }} onClick={() => openRequest(item.sku)}>Request</button>
          </div>
        ))}
      </div>
    </>
  );
}

export function MyRequestsScreen({ nav, spruce }) {
  const [filter, setFilter] = useState("All");
  const { requests, markReceived } = spruce;
  const filtered = requests.filter((r) => {
    if (filter === "All") return true;
    if (filter === "Open") return r.status !== "received";
    if (filter === "Received") return r.status === "received";
    return true;
  });
  const statusMeta = {
    requested: { label: "Requested", color: C.blue },
    approved: { label: "Approved", color: C.teal },
    in_transit: { label: "In Transit", color: C.amber },
    received: { label: "Received", color: C.success },
  };

  return (
    <>
      <NavBar title="My Requests" showBack onBack={() => nav("truckInventory")} />
      <div className="st-phone-content">
        <div style={{ display: "flex", gap: 6, padding: "10px 14px" }}>
          {["All", "Open", "Received"].map((f) => (
            <button key={f} type="button" className={`st-filter-chip ${filter === f ? "st-filter-chip--active" : "st-filter-chip--inactive"}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        {filtered.map((r) => {
          const m = statusMeta[r.status];
          return (
            <div key={r.id} className="st-section-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: C.textWeak }}>Qty {r.qty} · for {r.jobId}</div>
                </div>
                <span className="st-form-pill" style={{ color: m.color }}>{m.label}</span>
              </div>
              <RequestLifecycle status={r.status} />
              <div style={{ fontSize: 11, color: C.textWeak, marginTop: 8 }}>{r.id} · {r.createdAt}{r.approvedBy ? ` · ${r.approvedBy}` : ""}</div>
              {r.status === "in_transit" && (
                <button type="button" className="st-btn-primary" style={{ marginTop: 10 }} onClick={() => markReceived(r.id)}>Mark Received</button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function RequestLifecycle({ status }) {
  const steps = [
    { id: "requested", label: "Requested" },
    { id: "approved", label: "Approved" },
    { id: "in_transit", label: "In Transit" },
    { id: "received", label: "Received" },
  ];
  const activeIdx = steps.findIndex((s) => s.id === status);
  return (
    <div className="st-lifecycle" aria-label="Request lifecycle">
      {steps.map((step, i) => (
        <div
          key={step.id}
          className={`st-lifecycle__step${i <= activeIdx ? " st-lifecycle__step--done" : ""}${i === activeIdx ? " st-lifecycle__step--current" : ""}`}
        >
          <div className="st-lifecycle__dot" />
          <span className="st-lifecycle__label">{step.label}</span>
        </div>
      ))}
    </div>
  );
}

export function SpruceOverlays({ spruce }) {
  const {
    reserveTarget, closeReserve, confirmReserve,
    installTarget, siteAsset, closeInstall, justInstall, swapInstall,
    requestTarget, closeRequest, submitRequest, warehouseInventory, toast,
  } = spruce;

  return (
    <>
      {reserveTarget && (
        <div className="st-overlay" onClick={closeReserve}>
          <div className="st-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>RESERVE FOR JOB</div>
            <div style={{ fontSize: 13, color: C.textWeak, marginBottom: 12 }}>{reserveTarget.itemName}{reserveTarget.unitId ? ` · ${reserveTarget.unitId}` : ""}</div>
            {myJobs.map((j) => (
              <button key={j.id} type="button" className="st-menu-item" style={{ width: "100%", marginBottom: 6 }} onClick={() => confirmReserve(j.id)}>
                <span style={{ fontWeight: 600 }}>{j.id}</span>
                <span style={{ fontSize: 12, color: C.textWeak, marginLeft: 8 }}>{j.site}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {installTarget && (
        <div className="st-overlay" onClick={closeInstall}>
          <div className="st-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>INSTALL · {installTarget.unitId}</div>
            <p style={{ fontSize: 13, color: C.textWeak, marginBottom: 12, lineHeight: 1.45 }}>
              Replacing existing or fresh install? One transaction can remove the old site asset and install the new unit.
            </p>
            {siteAsset?.status === "active" && (
              <button type="button" className="st-section-card" style={{ width: "100%", textAlign: "left", marginBottom: 8, border: `2px solid ${C.teal}`, background: C.tealSelected }} onClick={() => swapInstall(installTarget, siteAsset)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.teal }}>REPLACE EXISTING · RECOMMENDED</div>
                <div style={{ fontWeight: 600, marginTop: 4 }}>Swap out {siteAsset.name}</div>
                <div style={{ fontSize: 12, color: C.textWeak, fontFamily: "monospace" }}>{siteAsset.serial} · {siteAsset.site}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>Marks old asset Removed and installs {installTarget.unitId} in one action.</div>
              </button>
            )}
            <button type="button" className="st-btn-secondary" onClick={() => justInstall(installTarget)}>Install only — add as new asset</button>
          </div>
        </div>
      )}
      {requestTarget && (() => {
        const item = warehouseInventory.find((i) => i.sku === requestTarget);
        if (!item) return null;
        return (
          <RequestSheetInner item={item} onClose={closeRequest} onSubmit={submitRequest} />
        );
      })()}
      {toast && (
        <div className="st-toast">{toast.msg}</div>
      )}
    </>
  );
}

function RequestSheetInner({ item, onClose, onSubmit }) {
  const [qty, setQty] = useState(1);
  const [job, setJob] = useState(myJobs[0].id);
  return (
    <div className="st-overlay" onClick={onClose}>
      <div className="st-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>REQUEST FROM WAREHOUSE</div>
        <div style={{ marginBottom: 12 }}>{item.name} · {item.available} available</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <button type="button" className="st-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
          <span style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: 18 }}>{qty}</span>
          <button type="button" className="st-qty-btn" onClick={() => setQty((q) => Math.min(item.available, q + 1))} aria-label="Increase quantity">+</button>
        </div>
        {myJobs.map((j) => (
          <button key={j.id} type="button" className="st-btn-secondary" style={{ marginBottom: 6, background: job === j.id ? C.tealSelected : C.surface }} onClick={() => setJob(j.id)}>{j.id}</button>
        ))}
        <button type="button" className="st-btn-primary" style={{ marginTop: 12 }} onClick={() => onSubmit(item, qty, job)}>Submit request</button>
      </div>
    </div>
  );
}
