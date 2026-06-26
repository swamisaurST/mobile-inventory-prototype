# Mobile Inventory — STACK 2 context

## Session

- `stack2.session.bootstrapped`: true
- `stack2.skill`: stack2-design (transition / standardize)
- `stack.projectFolder`: `design/inventory on mobile`
- Platform: **mobile**
- Destination: **React prototype** (Vite)
- Scope: Standardize existing product inventory screens from production screenshots

## Purpose

- **User:** Field technician managing job inventory on mobile
- **Primary job:** Find inventory, confirm quantities, install or consume on site
- **Primary action:** Install or Consume (detail screens); Locate Inventory (job context)
- **Assumption flagged:** Location policy banner kept as in production; no change to business rules

## Hierarchy

### User needs → structure

- **Primary job:** Act on inventory tied to a job (planned vs actual, locate, uninstall)
- **Regions:**
  1. Orientation — STACK secondary header + policy banner
  2. Scope — search, site, tabs (locate flow)
  3. Workspace — record stack (list or USED items)
  4. Detail — identity, metadata, related sections
  5. Transaction — install/consume form
  6. Commit — pinned bottom CTA or form primary button

### Information → order (locate / list)

1. Scope controls (search, filter, site, tab)
2. Result count
3. Record title (decision driver)
4. Key attributes (tracking, availability, site)
5. Row action / navigation on tap

### Primitives → emphasis

- **Record stack:** single bordered surface, divider rows (replaces per-item cards)
- **Section card:** caps header + icon; actions above grouped list
- **Primary CTA:** full-width teal, pinned bottom
- **Secondary:** outlined teal buttons
- **States covered:** populated list, empty forms, required form fields, locked serial

## Decisions

| Fork | Choice | Rationale |
|---|---|---|
| List layout | Unified record stack | Matches STACK list coherence; reduces visual noise from nested cards |
| Tokens | STACK mobile (`#00847C`, `#1D2D34`, Barlow) | Aligns with `STACK-MOBILE-DESIGN.md` |
| Solar O&M prototype flows | Replaced for this pass | User asked to standardize **production** inventory UI from screenshots |

## Critique

| Dimension | Pass / Fail | Notes |
|---|---|---|
| Conversation & decisions | Pass | Platform, destination, folder confirmed; production scope from screenshots |
| Hierarchy explicit | Pass | See block above |
| Purpose stated | Pass | Field tech inventory workflow |
| Scaffold used appropriately | Pass | STACK shell, tokens, icons from stack2 gallery |
| Unhappy paths | Pass | Empty job aids, empty forms, required fields shown |
| Coherence | Pass | Shared patterns across 5 surfaces |
| Exemplar check | Pass | Aligns with mobile-ticketing STACK prototype patterns |

**Critical failures:** none  
**Open questions:** Whether job execution and job event should share one inventory section template in product code
