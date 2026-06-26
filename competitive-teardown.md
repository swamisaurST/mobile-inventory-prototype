# Mobile Inventory Reservation — Competitive Teardown

Sources: ServiceMax (PTC), Salesforce Field Service, ServiceTitan, Fishbowl, ServiceNow FSM, IFS Cloud. Researched 2026-04-30. All citations are public-source.

## Executive summary

- **Reservation is universally a tech-initiated action, not a request.** Across ServiceMax, Salesforce Field Service (SFS), ServiceTitan, IFS, and ServiceNow, the dominant pattern is "tech tags parts on a work order, system reserves, consumes on completion." Approval workflows exist mostly for *transfer / replenishment* (warehouse → van), not for the reservation itself.
- **The truck/van is always a stock location.** SFS exposes "Van" as a first-class location type; IFS calls it "My Stock"; ServiceMax calls it "Trunk Stock"; ServiceTitan calls it "Truck." Sitetracker's "truck = Site" decision is unusual but workable; the affordance must clearly read as "my truck" not "another site."
- **The canonical status vocabulary is a 4-bucket model: Available / Reserved (or Allocated) / In-Transit / Consumed.** ServiceMax explicitly buckets stock as Available, In-Transit, Consumed; ServiceNow adds Reserved; SFS uses status fields on `ProductTransfer` (Ready for Pickup, In Transit, Received) plus availability on `ProductItem`.
- **Barcode/QR scan is table stakes but rarely the *primary* CTA.** ServiceMax Go, ServiceTitan, Fishbowl Go, and SFS all support scan, but it's an icon next to a serial/quantity field, not the dominant action. Fishbowl is the exception — scan-first is its identity.
- **Offline is non-negotiable for FSM-class apps.** ServiceMax Go ("days, weeks, even months" offline) and ServiceTitan ("fully offline") are best in class. SFS Mobile syncs via priming. Notably, IFS keeps Find Part / Stock Counting *online-only* — a pattern to avoid.
- **Photo capture is universal and bundled with the work order, not the inventory transaction.** No competitor surfaces "attach photo to install" as a step on the install action itself; photos live on the work order debrief.
- **Approval workflows live in procurement, not reservation.** ServiceNow gates >$1000 part orders for approval; SFS Product Requests can be routed but it's a customer-configured flow, not a default mobile UI. None of the competitors show a "manager approves your reservation" inbox as a built-in pattern — this is a Sitetracker greenfield opportunity.
- **Cycle counts on mobile are a strong differentiator.** Fishbowl Go and ServiceTitan Inventory both ship dedicated cycle-count flows on a separate mobile app surface; IFS keeps it online-only; SFS has no native mobile cycle count. This validates the Spruce ask.

## Per-product teardown

### ServiceMax (PTC) — top competitor

ServiceMax Go is the market reference for asset-heavy, complex-equipment field service (medical devices, industrial assets, energy). ServiceMax's parts module is mature, deeply Salesforce-native (legacy), and built around a "trunk stock" mental model that maps closely to Spruce's reality.

| # | Question | Answer | Justification |
|---|---|---|---|
| 1 | Mobile reservation? | **Partial** | Techs add parts to work order debrief; "reservation" surfaces mainly via parts-request and transfer flows, not a tap-to-reserve on stock list. |
| 2 | Approval workflow? | **Partial** | Parts request → transfer → receipt is the flow; approval is configurable per process, not a default mobile screen. |
| 3 | Stock-status vocabulary | **Yes** | Available / In-Transit / Consumed buckets, decremented/incremented per transaction. |
| 4 | Truck modeled as location? | **Yes** | "Trunk stock" is a first-class concept with serialized support. |
| 5 | Scan affordance | **Yes (secondary)** | Barcode/QR scanning supported for serials, RMA, shipments. |
| 6 | Offline | **Yes (best-in-class)** | Smart Sync; designed for "disconnected day" — works for hours, days, weeks, months offline. |
| 7 | Photo capture | **Yes** | Service report flow includes images and signatures embedded in generated docs. |
| 8 | Bulk operations | **Unknown** | Kitting is supported on the back end; mobile bulk-install UX not visible in public docs. |
| 9 | Reservation TTL | **Unknown** | Not in public docs — would need sandbox to verify. |
| 10 | Item history / audit | **Yes** | Asset service history on the part is core to ServiceMax's positioning. |
| 11 | Manager view | **Yes (web)** | Service Board + back-office inventory views; mobile manager UI not surfaced. |
| 12 | Mobile cycle counts | **Unknown** | Not surfaced in public ServiceMax Go docs; back-office cycle counts exist. |

**Steal:**
1. **Smart Sync metadata** — sync only the data the tech needs for *today's* assignments, not the entire warehouse.
2. **Bucket-shift logging** — every transaction is a paired decrement/increment between named buckets, makes audit trail trivially queryable.
3. **Serialized trunk stock as a first-class entity** — tech sees their truck inventory as *theirs*, with serials.

**Avoid:**
- **Heavy configuration burden** — inventory processes require admin setup of "Inventory Processes" objects. Sitetracker should ship sensible defaults.
- **Reservation is implicit, not visible** — techs see Available / Consumed but in-between (Reserved-for-job-X) is hard to surface without customization.

---

### Salesforce Field Service (SFS / FSL)

Native Salesforce platform; closest architectural sibling to Sitetracker. Object model: `ProductRequest`, `ProductRequestLineItem`, `ProductTransfer`, `ProductItem`, `ProductItemTransaction`, `ProductConsumed`. Locations have a typed enum (Warehouse / Site / Van / Plant).

| # | Question | Answer | Justification |
|---|---|---|---|
| 1 | Mobile reservation? | **Partial** | Mobile worker raises a *Product Request* when stock is short; reservation is implicit via request line items, not a "Reserve" button on a serial. |
| 2 | Approval workflow? | **Partial** | No built-in approval on Product Request; customers wire Salesforce Approval Processes. |
| 3 | Stock-status vocabulary | **Yes** | `ProductTransfer` statuses: Ready for Pickup → In Transit → Received; `ProductItem` carries Quantity on Hand vs Quantity Unavailable. |
| 4 | Truck modeled as location? | **Yes** | "Van" is a built-in `LocationType` enum value alongside Warehouse/Site/Plant. |
| 5 | Scan affordance | **Yes (secondary)** | Native `BarcodeScanner` LWC API; "barcode scanner icon next to the serial numbers section header." |
| 6 | Offline | **Yes** | Field Service Mobile primes data for offline; sync indicator visible in app shell. |
| 7 | Photo capture | **Yes** | Standard mobile attachment UI on Work Order; not bound to inventory transaction. |
| 8 | Bulk operations | **Partial** | Product Request can carry multiple line items; per-serial bulk install flow not visible in public docs. |
| 9 | Reservation TTL | **No** | No public-doc evidence of expiry; transfers persist until manually cancelled. |
| 10 | Item history | **Yes** | `ProductItemTransaction` records every movement; surfaceable to mobile via custom LWC. |
| 11 | Manager view | **Yes (web)** | Dispatch Console + Inventory tabs; no native mobile manager-approval inbox. |
| 12 | Mobile cycle counts | **No** | Not native; customers build with custom flows. |

**Steal:**
1. **Typed location enum (Warehouse / Site / Van / Plant).** Forces a shared mental model and lets the UI render different chrome per type.
2. **Three-status transfer lifecycle (Ready for Pickup / In Transit / Received).** Clean, scannable on mobile.
3. **"You can only do this from the mobile app"** — Salesforce specifically scopes receipt-with-scan to mobile only.

**Avoid:**
- **Implicit reservation** — techs raise a Product Request and hope; no clear "this serial is held for me" UX.
- **Fragmented statuses across objects** — status lives on Product Request, on Product Transfer, on Product Request Line Item.

---

### ServiceTitan

Vertical leader in HVAC/plumbing/electrical. Ships *two* mobile apps: **Field Mobile** (job-focused) and **ServiceTitan Inventory** (warehouse-focused). The split is itself a UX statement.

| # | Question | Answer | Justification |
|---|---|---|---|
| 1 | Mobile reservation? | **Yes** | "Technicians can check stock levels and reserve or request materials and equipment as needed." |
| 2 | Approval workflow? | **Partial** | Replenishment based on min/max levels triggers automatically. Manager approval of individual reservation is not the dominant pattern. |
| 3 | Stock-status vocabulary | **Partial** | On-hand / on-order / committed exist; vocabulary lighter than ServiceMax. |
| 4 | Truck modeled as location? | **Yes** | "Truck" is a stock location with replenishment rules per truck. |
| 5 | Scan affordance | **Yes (primary in Inventory app)** | Barcode scanning is central in the Inventory app for receiving POs, transfers, cycle counts. |
| 6 | Offline | **Yes** | Field Mobile works fully offline with sync-on-reconnect. |
| 7 | Photo capture | **Yes** | Photos/videos on the job are a marketed capability. |
| 8 | Bulk operations | **Yes** | Cycle count templates pre-populate items; PO receive supports batch scan. |
| 9 | Reservation TTL | **Unknown** | Not surfaced in public docs. |
| 10 | Item history | **Yes** | Asset history shown on the customer record per address. |
| 11 | Manager view | **Yes** | Office dashboards and the dedicated Inventory app function as a manager surface. |
| 12 | Mobile cycle counts | **Yes** | Dedicated Inventory app supports scheduled and ad-hoc cycle counts on mobile with templates. |

**Steal:**
1. **Two mobile apps split by persona** — tech-on-job vs warehouse-task.
2. **Auto-replenishment based on min/max per truck** — system requests stock to truck *automatically* below threshold.
3. **Cycle count templates** — pre-defined "what to count on this truck" lists from prior counts.

**Avoid:**
- **Inventory split into a separate app may confuse cross-role users.**
- **Reservation isn't a strong concept** — techs add materials at debrief, not pre-reserve. For O&M with serialized assets, this is too late.

---

### Fishbowl

Inventory-first SMB tool; not an FSM. Reason it beats Sitetracker on certain deals is its scan-first warehouse mental model.

- **Reservation:** issuing a sales order reserves inventory, marks "available to pick."
- **Statuses:** Quoting / Picking / Packing / Shipping (sales-order centric).
- **Scan-first:** scanning is the *primary* interaction model.
- **Cycle counts:** native on mobile.
- **No approval, no van, no work-order context, no offline.**

**Steal:** scan-walks-you-through pattern (next item to pick, scan to confirm) — great for cycle counts. **Avoid:** treating the tech like a picker; vocabulary (Pick / Pack / Ship) is wrong for O&M.

### ServiceNow Field Service Management

- **Reservation:** "reserve and use procured parts on work order tasks."
- **Approval:** explicit threshold-based approval — items >$1000 require approval, <$1000 auto-approved. Approval can be granted from mobile.
- **Statuses:** Transfer Order with multi-step status; My Inventory applet shows reserved items.

**Steal:** the dollar-threshold auto-approval rule. Lets the org scale "managers approve" without it becoming the bottleneck.

### IFS Cloud FSM

- **Find Part:** locate part on nearby vans (other techs!) or warehouses on a map with color-coded pins (green = open/synced, yellow = stale data).
- **Issue / Unissue / Issue All Reserved** are the core verbs.

**Avoid:** Find Part, Stock Counting, and Ad-hoc Purchasing are **online-only**, sabotaging the offline value prop.
**Steal:** map of nearby trucks with stale-data color coding. For Spruce's geographically distributed branches, "is there a truck with this part 30 miles away?" is a real question.

## Cross-cutting patterns

**Table stakes:**
- Truck/van as a first-class location type.
- Barcode/QR scan for serial entry — at minimum as an icon next to serial fields.
- Offline mode with a visible sync indicator.
- Photo capture on the work order.
- Available / Reserved / In-Transit / Consumed status vocabulary.
- Per-serial transaction history.

**Differentiators (where leaders pull ahead):**
- Smart-sync that ships only relevant data (ServiceMax).
- Map-based Find Part across nearby techs' vans (IFS).
- Auto-replenishment from truck min/max (ServiceTitan).
- Threshold-based auto-approval (ServiceNow).
- Cycle-count templates pre-populated from prior counts (ServiceTitan).
- Persona-split apps so warehouse-manager workflow doesn't crowd the tech UI (ServiceTitan).

**Greenfield (no competitor does this well — opportunity for Sitetracker):**
- An *explicit, visible* reservation state on a serial, with TTL and "this is held for you" framing.
- A built-in **manager approval inbox** for reservations (vs procurement). Every competitor punts this to admin config or doesn't build it.
- **Auto-release on install** as a primary affordance (you already have this — it's right).

## Specific recommendations for the Sitetracker prototype

Ranked by leverage. Each grounded in a competitor pattern.

1. **Make the truck location type explicit, not "Site."** Render the tech's truck card with distinct chrome (truck icon, "My Truck" label). *SFS uses typed `Van`; ServiceMax uses "Trunk Stock"; ServiceTitan uses "Truck." Calling it "Site" will confuse Spruce field staff.*
2. **Add explicit Reserved status with a TTL countdown on each reserved serial.** "Reserved for [Job#] · expires in 2d 4h." *No one does this well — Sitetracker can lead. Solves the "ghost reservation" pain that breaks every reservation system that ships without it.*
3. **Add a manager approval inbox with threshold rule.** Auto-approve below a configurable dollar/SKU threshold; route above it. *ServiceNow's $1000 threshold model. Critical for Spruce's branch-manager-led workflow.*
4. **Promote scan to be a primary affordance for serial entry, but keep it secondary in the home screen.** *SFS pattern — scan icon in the serial section header. Match SFS, not Fishbowl.*
5. **Add request-from-warehouse with a 3-state transfer lifecycle: Requested → In Transit → Received.** *SFS Product Transfer lifecycle. Maps to Spruce's reality.*
6. **Bulk-install for kits.** A solar O&M visit installs many of the same SKU; one-tap "install all reserved for this job." *IFS "Issue All Reserved." Saves dozens of taps.*
7. **Cycle-count flow on mobile, template-driven.** Branch manager schedules a count; tech executes via scan-walks-you-through pattern. *ServiceTitan templates + Fishbowl's scan-walk pattern. Directly addresses Spruce gating dependency.*
8. **Sync indicator and pending-actions queue.** Per-serial "synced / pending" state. *ServiceMax Go's smart-sync UI. Avoid IFS's mistake of online-only flows.*

## Open questions (need sandbox / sales demo / customer interview)

- **ServiceMax Go reservation TTL & approval UI** — public docs don't show whether reservations expire or whether mobile has a built-in approval screen.
- **SFS approval-process patterns in production** — customers wire it themselves; would need to interview an SFS customer (or partner) to see what's standard vs custom.
- **ServiceTitan's exact reserve vs request vocabulary on mobile.**
- **Mobile manager-approval UX** — no competitor publicly demonstrates a clean approval inbox on mobile for reservation requests. Worth asking Spruce branch managers directly.
- **Bulk install / swap UX details** — would need a ServiceMax or IFS sandbox.
- **Truck-to-truck transfers (peer Find-Part)** — IFS docs describe; whether techs actually use it (vs always going through warehouse) needs a customer interview.
- **Cycle count adjustment authority on mobile** — whether techs can post variance vs whether it routes to a manager differs across products.

## Sources

- ServiceMax: [ServiceMax Go (PTC)](https://www.ptc.com/en/products/servicemax/go-mobile) · [Inventory management](https://support.ptc.com/help/servicemaxcore/en/articles/core/inventory-management.html) · [Trunk Stock setup](https://community.servicemax.com/s/article/How-to-Setup-Technician-Trunk-Stock-including-Serialized-Stock-1) · [Offline blog](https://fsd.servicemax.com/2023/07/11/the-power-of-offline-field-service-management/) · [Barcode scanning](https://support.ptc.com/help/servicemaxcore/en/articles/go/phone-barcode-scanning.html)
- Salesforce Field Service: [Inventory Data Model](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_inventory.htm) · [Mobile barcode LWC](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_mobile_lwc_barcode_scanner.htm) · [Trailhead: Schedule Visits & Request Product Transfer](https://trailhead.salesforce.com/content/learn/modules/med-tech-surgical-case-management-visits-field-inventory-management/schedule-visits-and-request-product-transfer) · [Set Up Product Requests in Mobile](https://help.salesforce.com/s/articleView?id=sf.mfs_product_requests.htm)
- ServiceTitan: [Inventory](https://www.servicetitan.com/features/contractor-inventory-software) · [Field Mobile App](https://www.servicetitan.com/features/field-mobile-app) · [Truck Replenishment](https://help.servicetitan.com/how-to/truck-replenishment) · [Barcode Scanning](https://help.servicetitan.com/how-to/barcode-scanning-for-the-servicetitan-mobile) · [Cycle Counts](https://help.servicetitan.com/how-to/create-and-schedule-full-cycle-counts)
- Fishbowl: [Fishbowl Go](https://www.fishbowlinventory.com/products/fishbowl-go) · [Picking](https://help.fishbowlinventory.com/advanced/s/article/Picking) · [Sales Order](https://help.fishbowlinventory.com/hc/en-us/articles/360042632834-Sales_Order)
- ServiceNow: [Transfer Orders](https://www.servicenow.com/docs/r/xanadu/field-service-management/transfer_order.html) · [Procurement for FSM](https://store.servicenow.com/store/app/885aa7261b246a50a85b16db234bcb51) · [Mobile approve requisition](https://www.servicenow.com/docs/r/R4_7U~K1gmloMk7~WOJw8A/Pa925qzVtJ8CpUFvcqu3pg)
- IFS: [Cloud Mobile Work Order](https://docs.ifs.com/ifsclouddocs/23r2/WorkProcessing/AboutMobileWorkOrder.htm)

---

*Researched 2026-04-30. Sources are public-source — would benefit from sandbox / customer interview validation on the open questions section.*
