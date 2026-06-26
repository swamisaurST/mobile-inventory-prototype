# Inventory Reservation — Discovery Discussion Guide

A reusable discussion guide for customer calls focused on **inventory reservation on mobile** for field technicians and warehouse managers. Use it for any account, but seeded with the patterns we've seen at Spruce Power, MN8, and similar.

---

## Call metadata

| | |
|---|---|
| **Customer / account** | |
| **Date** | |
| **Participants (name · role)** | |
| **Sitetracker side** | |
| **Recording?** | Yes / No (confirm at start) |
| **Linked to deal / opportunity** | |
| **Time-box** | 60 min |

---

## 0. Pre-call prep (5 min before)

- [ ] Read prior call notes from this account
- [ ] Open question list from last conversation
- [ ] Sketch their org structure: warehouse mgrs, techs, office coords, third-party vendors
- [ ] Confirm what they currently use Sitetracker for (web vs. mobile, licenses)
- [ ] Pull any artifacts they shared (spreadsheets, screenshots, process docs)

---

## 1. Opening (5 min)

- Re-introduce the project: **scoping mobile-first inventory management with reservation** for field techs.
- Confirm participants and roles around the table.
- Set the time-box and ask permission to record.
- Ask: "What does a successful outcome from this conversation look like for you?"

---

## 2. Today's workflow — walk me through a real example (15 min)

> **Goal:** get a verbatim end-to-end story for one common job type. Resist the urge to abstract — anchor on a real example from the last 7 days.

Prompt: *"Pick one job you ran in the last 7 days that needed inventory. Walk us from order placed to install complete."*

Probe:
- Who orders the part? Inside or outside Sitetracker?
- Where does it sit before it gets to the truck — central warehouse, branch, drop-shipped?
- How does the tech know it's "theirs"?
- How is it tracked in the system today (or outside it — Excel, email, Slack)?
- Who updates the system after install? When?
- What breaks?

Look-fors:
- Manual workarounds (email-driven hand-offs, Excel staging)
- Hand-offs that lose visibility
- Single points of failure ("only Joe / only Pete can do this")
- Multi-step transfers (warehouse → truck → site) where one step is invisible

---

## 3. Reservation triggers (10 min)

> **Goal:** understand *when* the desire to "hold" inventory shows up — and what goes wrong without it.

- When does someone need to set aside inventory for a specific job?
- Who does the holding today, and how (sticky note, Excel, email, physical separation)?
- Have you ever had two techs go after the same scarce part? What happened?
- Has a tech ever driven to a site and the part was already gone? How often?
- For high-cost / low-stock items (e.g., inverters), what's the unwritten rule today?

---

## 4. Mobile context (15 min)

> **Goal:** understand the realistic mobile environment — devices, licenses, connectivity, current usage.

- Who uses Sitetracker mobile today? For what?
- What licenses are your techs on (Community Portal vs. full Mobile)? Any blocker to switching?
- What can your techs do on mobile right now? What can't they?
- If a tech could reserve inventory from their truck on mobile, would they want to? Or is reservation a warehouse-mgr task only?
- Connectivity reality — do they always have signal in the field? What happens offline?
- Devices — phones, tablets, ruggedized handhelds, barcode scanners?

---

## 5. Roles, scope, and access (10 min)

> **Goal:** map who can see / do / approve what. This drives permission sets.

Walk through each role and capture:

| Role | Can view | Can reserve | Can transfer | Scope |
|---|---|---|---|---|
| Warehouse manager | | | | |
| Field technician | | | | |
| Office coordinator | | | | |
| Third-party / subcontractor | | | | |

Probe:
- Should techs see *all* warehouse stock or only their own truck?
- Who can override / un-reserve someone else's reservation?
- Are there scenarios where a tech borrows from another tech's truck? How is that captured?

---

## 6. Reservation lifecycle (10 min)

> **Goal:** define the rules for when a reservation starts, ends, and expires.

- What should happen when an item is reserved? (status change, notification, who sees what)
- Auto-release rules — pick the ones that apply:
  - On transfer to site
  - On install
  - On job cancellation
  - After X days idle
  - Never (manual release only)
- Partial reservations — if a job needs 5 and only 3 are available, what happens?
- What's a reasonable expiry window for your business? 24h? 7d? 30d?
- Visibility — do reserved items show as "unavailable" to other users, or just flagged?

---

## 7. Cost tracking (5 min — only if time)

> **Goal:** spot whether reservation needs to roll up cost data.

- Do you need a $ cost on reservations / installs to roll up to the job/ticket?
- Internal tech vs. third-party vendor cost comparison — is that decision-driver today?
- How is RMA / warranty replacement vs. purchased equipment tracked?

---

## 8. Show the prototype (10 min)

> **Goal:** capture reactions to a tangible flow, not opinions on a slide.

- Walk through: Truck Inventory → SKU detail → Reserve for job → Job Event with reserved item → Install → auto-release.
- After each screen, ask: "What would you change about this?" / "What's missing?" / "Is this the order you'd do it in?"
- Capture verbatim quotes — they're gold.

---

## 9. Wrap-up (5 min)

- "Top three things this needs to do for it to be worth your team's time?"
- "Who else on your team should we talk to?"
- "Anything we didn't ask that we should have?"
- Confirm next step + date.

---

## After the call

- [ ] Notes synced to Notion / shared doc within 24h
- [ ] Memorable quotes captured **verbatim** (these become the deck)
- [ ] Open questions list updated for the next call
- [ ] Update internal memory with new pain points / personas
- [ ] Prototype updates queued based on feedback
- [ ] Schedule follow-up if needed

---

## Prompt bank — questions to keep in your back pocket

- *"What does the worst version of this day look like?"*
- *"If I removed Sitetracker from this process tomorrow, what would change?"*
- *"Tell me about the last time this broke."*
- *"Who's the person you call when this goes sideways?"*
- *"How would you know it's working?"*
- *"What's a metric your boss asks about that you can't answer today?"*

---

*Last updated: {{date}} · Owner: Chandra · Field Central — Inventory Discovery*
