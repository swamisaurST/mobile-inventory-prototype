# Spruce × Sitetracker — Inventory Prototype Review #2

**Date:** 2026-05-07
**Duration:** 45 min (book 60)
**Location:** Microsoft Teams
**Owner:** Chandra · Field Central — Inventory

## Participants

| | |
|---|---|
| **Spruce** | Chelsey Bunch (Director of Asset Operations) · Clayton Redmond (IT Director) · NJ Branch Manager (TBC) · SoCal Branch Manager (TBC) |
| **Sitetracker** | Chandra · Courtney Parish (CSM) |

## Live links to share at the start

- **Deck:** https://mobile-inventory-prototype.vercel.app/slides.html
- **Prototype:** https://mobile-inventory-prototype.vercel.app/
- **Last call recap email:** sent 2026-04-30

---

## Pre-call checklist (15 min before)

- [ ] Open the deck at slide 1, prototype in a second tab pre-loaded on Job Event screen
- [ ] Confirm Teams recording is on
- [ ] Have last week's notes open in a third window
- [ ] Re-read the verbatim Chelsey quotes (below) so the recap lands accurately
- [ ] Mute notifications

---

## What we agreed last week (use as the recap anchor)

**Validated:**
- Truck modeled as a stock location — fits the Sitetracker data model
- Reserve + auto-release on install — no orphan holds
- Truck-only visibility for techs — they see their stock, not the world's
- Inventory transaction on install — cost-per-job rollup, automatic
- Branch managers (not field techs) as the right voice in research

**Chelsey's gaps that drove this iteration:**
> *"I would love an approval process. Audit trail. Who requested it, who approved it."*
> *"How will it remove the old inverter too off of the site?"*
> *"How would they put requests into the main warehouse?"*
> *"Before I can implement bulk inventory… I have to be able to do a full end-to-end inventory system to where I do cycle counts."*

**What I committed to bring back today:**
1. Swap / removal flow — old asset comes off site in the same transaction
2. Request-from-warehouse flow — full lifecycle (Requested → Approved → In Transit → Received)
3. 1-week turnaround (vs. 2 weeks)
4. Calendar invite + branch manager additions

---

## 60-minute agenda

| Time | Section | Goal |
|---|---|---|
| 0–5 | Welcome + intros | Get branch managers grounded; reframe for new voices |
| 5–10 | Recap of last call | Anchor on what was already validated; no relitigation |
| 10–25 | **Prototype walkthrough** (live demo) | Show swap + warehouse-request; get reactions |
| 25–35 | Branch manager deep-dive | New voices — what's their reality? |
| 35–45 | Open questions on approval, TTL, cycle counts | Sharpen the next iteration |
| 45–55 | The ask — beta commitment | Lock names + dates |
| 55–60 | Next steps + close | Confirm follow-up, owners |

---

## Prototype walkthrough — narrated demo script

> Use this as a teleprompter. Click instructions in **bold**. Talking points in plain text. ~12 minutes.

### Setup (30 sec)

Share screen showing the prototype. Currently on Home.

> "Quick reminder of what you're looking at — left side is the design-tooling annotation, right side is the live phone. Tap anything in the phone, the state actually updates. We've ripped out everything that wasn't inventory so the focus is tight."

### Step 1 — The reservation problem made visible (2 min)

**Click the green calendar event "Inverter Replacement" → lands on Job Event screen.**

> "Here's J-000382 — a real solar maintenance job. We're at the Morinville rooftop. The existing field asset is an ABB UNO-3kW inverter from 2019, **out of warranty** — that red pill is the trigger for why we're here today."

**Scroll to the Inventory card.**

> "Two things you've already seen — the truck reservation that's already in for this job, and the install action."

### Step 2 — The new swap flow (3 min)

**Tap "Install" on the reserved inverter.**

> "This is new. Before today, install just installed. Now it asks: *replacing existing or fresh install?* The recommended path is Replace, and it auto-fills with the old asset on this site."

**Read the sheet aloud:**

> "Old asset: ABB UNO-3kW Inverter, ABB-2019-4471, Morinville. One transaction will mark this old asset Removed and install the new one. No duplicates."

**Tap "Replace existing asset."**

> "Watch the field asset card — see how it's struck through, the 'Out of warranty' pill flips to a 'Removed · replaced by INV-ABC123' tag, and the green pill confirms swapped today. The new inverter shows under Installed. The whole transaction is one atomic action — exactly what you flagged on the last call."

**Pause for reactions. Let Chelsey or branch managers respond. Likely probes:**
- *"Is that the order you'd want it in — replace then install? Or install then replace?"*
- *"Does anything need to happen between these two — a photo, a signature, a timestamp?"*

### Step 3 — Warehouse request flow (4 min)

**Navigate: Menu → My Truck Inventory.**

> "Two new entry points up top — Warehouse and My Requests."

**Tap Warehouse.**

> "Read-only view of the NJ Branch warehouse. Techs can see what's here but can't self-transfer — exactly what you said: visibility yes, action no."

**Tap "Request" on the Inverter 5kW row.**

> "Pick a quantity, pick a job, submit. Branch manager approves on web or tablet — separate persona, separate UI."

**Tap "Submit request."**

> "Now jump to My Requests."

**Tap My Requests in the bottom of the toast or via Truck Inventory.**

> "There's the request. The 4-step lifecycle is right there: Requested → Approved → In Transit → Received. Watch — Joe Kiss just approved it. In real life that'd be the branch manager on a tablet, but for the prototype the auto-approve is just to show the state change."

**Walk through one in-transit request and tap "Mark Received."**

> "Tech taps Mark Received when it arrives — the unit lands on the truck and the lifecycle closes."

### Step 4 — Pause for branch manager reactions (3 min)

**Stop sharing. Open the floor.**

Prompts for the branch managers (they haven't seen this before):
- *"Walk me through what feels off, what feels right, what's missing entirely."*
- *"Where would the approval inbox live for you — phone, tablet, web?"*
- *"What's a real-world scenario this doesn't cover today?"*

---

## Branch manager onboarding questions

> Use only if branch managers join. Skip if it's just Chelsey + Clayton.

These are getting-to-know-you and grounding questions. Resist the urge to dive into the prototype before getting their context.

1. **Walk me through your Tuesday morning.** Who do you talk to first? What inventory questions land on your desk in the first hour?
2. **What's the most common reason a tech calls you about inventory?**
3. **How many active reservations / set-asides are usually in play at any one time?** 5? 50?
4. **When you receive a shipment, what's the worst part of getting it into the system?** (Listen for: serial entry, Excel workarounds, photo of packing list — Pete at SoCal does the Excel-then-paste workaround, see if NJ does the same.)
5. **Truck-to-truck transfers — does that happen at Spruce today?** If not, do you anticipate it?
6. **Where do you want approval requests to land — phone, tablet, web?**
7. **If a tech showed up at the warehouse without checking with you first, what would you do?**
8. **What's a metric your boss asks you about that you can't answer today?**

---

## Open questions for Chelsey (sharpen the next iteration)

These are the questions the competitive teardown surfaced. Ask them after the demo, before the ask.

### On approval workflow

- **What's the right threshold for auto-approval?** Dollar value? Specific SKUs (inverters always need approval, connectors never)? *(ServiceNow uses $1000 as their default — does that map?)*
- **Who's the alternate approver if the branch manager is on vacation?**
- **What's the SLA on approval response — 1 hour? 4 hours? Same day?**
- **Where would *you* want the approval inbox to live?** Phone, tablet, web?

### On reservation TTL / expiry

- **Today, how long does a "set aside" item sit before it's reassigned?**
- **Would you want auto-release after X days, or always manual release?**
- **What happens if a job is rescheduled — should the reservation move with it, or release?**

### On cycle counts

- **Frequency:** quarterly was mentioned — by branch or org-wide?
- **Who runs the count — branch manager, tech, or external?**
- **What's the variance threshold that triggers escalation vs. just reset?**
- **Does the count need to be done in one session or can it span days?**

### On bulk operations

- **Modules come in 20s — does a tech install all 20 at once, or one at a time?**
- **Should "Install all reserved for this job" be a one-tap action?**

### On Houston

- **Houston ships drop-to-site. Does this prototype handle that, or do we need a different flow for Houston?**

### On RMA

- **RMA-replaced equipment vs. Spruce-procured — should they look different in the system?** *(You mentioned this in October as a future need.)*

---

## The ask — beta commitment

> Slide 8 of the deck. Read it aloud, then ask explicitly.

**Specific commitments to lock down:**

1. **Names of the 2–3 techs** for the pilot (NJ + SoCal). Chelsey or branch managers to commit names today.
2. **Start date.** "When does Spruce go live on Sitetracker mobile?" — get a date, not a guess.
3. **Feedback cadence.** Weekly call? Async via email? Slack channel?
4. **Success criteria.** What does Chelsey need to see for this to be considered a win?
5. **Coordinator confirmation.** Clayton + Chelsey — same as last call.

If Chelsey hesitates on the commitment, the fallback ask is: *"What would have to be true for you to say yes?"*

---

## Wrap-up

- [ ] Recap commitments verbally — what they're testing, when, who
- [ ] Confirm next call cadence (weekly during pilot? bi-weekly?)
- [ ] Ask: "Anything we should have asked but didn't?"
- [ ] Thank the branch managers explicitly — they're the ones whose feedback matters most going forward

---

## Post-call checklist

- [ ] Send recap email within 24h with: confirmed beta tech names, start date, feedback cadence
- [ ] Update memory with new findings (especially branch manager perspectives — they're new voices)
- [ ] Create a Spruce beta scope doc — pilot tech names, jobs, success metrics, feedback channel
- [ ] Schedule the next call (weekly or bi-weekly per Chelsey's preference)
- [ ] If approval-workflow appetite is confirmed → start prototype iteration v3 (approval inbox + threshold rule)
- [ ] If cycle-counts appetite is confirmed → flag for the Logistics Central business case as the Phase 2 unlock

---

## Things to NOT do on this call

- Don't relitigate what was validated last week — recap quickly, then move forward
- Don't promise specific delivery dates for things not yet scoped (especially approval workflow + cycle counts)
- Don't show the competitive teardown — internal only
- Don't ask about cycle counts before showing the demo — let the demo earn the right to ask the harder questions
- Don't let the call run past 60 min without renegotiating

---

*Owner: Chandra · Last updated: 2026-05-07*
