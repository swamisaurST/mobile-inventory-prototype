import {
  ChevronLink,
  NavBar,
  SectionCard,
} from "../stack/MobileShell";
import {
  BottomCta,
  DetailHeader,
  Fab,
  FormStatusPill,
  MetadataList,
  RecordRow,
  RecordStack,
  SegmentedControl,
  SheetHeader,
} from "../stack/InventoryPrimitives";
import StackIcon from "../stack/StackIcon";

const ITEMS = [
  {
    id: "antennas-cabinet",
    title: "Antennas Cabinet",
    fields: [
      { label: "Item Number", value: "2000" },
      { label: "Manufacturer", value: "--" },
      { label: "Category", value: "--" },
      { label: "Tracking Method", value: "Uniquely Tracked" },
      { label: "Usage Type", value: "Installable" },
      { label: "Total Available", value: "64" },
      { label: "Nearest Site", value: "North Base (8074.44mi)" },
    ],
  },
  {
    id: "antennas-cabinet-2",
    title: "Antennas Cabinet",
    fields: [
      { label: "Item Number", value: "2000" },
      { label: "Manufacturer", value: "--" },
      { label: "Category", value: "--" },
      { label: "Tracking Method", value: "Uniquely Tracked" },
      { label: "Usage Type", value: "Installable" },
      { label: "Total Available", value: "64" },
      { label: "Nearest Site", value: "North Base (8074.44mi)" },
    ],
  },
];

const FIELD_ASSETS = [
  {
    id: "fa-123",
    title: "123",
    fields: [
      { label: "Item", value: "500 Spool" },
      { label: "Serial", value: "123" },
      { label: "Top Level Parent", value: "SF_CABINNET_1" },
      { label: "Site", value: "Faiz site" },
      { label: "Status", value: "Available" },
      { label: "Available", value: "495" },
    ],
  },
  {
    id: "fa-1600",
    title: "1600_WST809-PSR",
    fields: [
      { label: "Item", value: "500 Spool" },
      { label: "Serial", value: "123" },
      { label: "Top Level Parent", value: "SF_CABINNET_1" },
      { label: "Site", value: "Faiz site" },
      { label: "Status", value: "Available" },
      { label: "Available", value: "495" },
    ],
  },
];

const USED_ITEMS = [
  { id: "used-1", title: "Antennas Cabinet", planned: "0.00", actual: "0.00" },
  { id: "used-2", title: "500 Spool", planned: "1.00", actual: "0.00" },
  { id: "used-3", title: "500 Spool", planned: "2.00", actual: "0.00" },
];

const FORMS = [
  { id: "f1", title: "Template4-DifferentFieldRefere...", site: "Faiz site", status: "NOT STARTED" },
  { id: "f2", title: "&pecial Ch@r - Test", site: "Faiz site", status: "NOT STARTED" },
  { id: "f3", title: "Bug repro form", site: "Faiz site", status: "NOT STARTED" },
  { id: "f4", title: "Complete example", site: "Faiz site", status: "COMPLETE" },
];

const breadcrumbs = {
  jobInventory: ["Job", "J-003448"],
  locateInventory: ["Job", "Locate Inventory"],
  itemDetail: ["Locate", "Antennas Cabinet"],
  fieldAssetDetail: ["Locate", "123"],
  installConsume: ["Field asset", "Install or Consume"],
};

export function RowMenu() {
  return (
    <button type="button" className="st-record-row__menu" aria-label="More options">
      <StackIcon name="overflow" size={18} tone="muted" />
    </button>
  );
}

export function LocateInventoryScreen({ nav, tab, onTab }) {
  const records = tab === "items" ? ITEMS : FIELD_ASSETS;
  const openDetail = (id) => nav(tab === "items" ? "itemDetail" : "fieldAssetDetail");

  return (
    <>
      <NavBar title="Locate Inventory" showBack onBack={() => nav("jobInventory")} />
      <div className="st-phone-content">
        <div className="st-search-row">
          <div className="st-search-field">
            <StackIcon name="search" size={16} tone="muted" />
            <span>Search</span>
            <span style={{ marginLeft: "auto" }}>
              <StackIcon name="scan" size={18} tone="brand" />
            </span>
          </div>
          <button type="button" className="st-search-row__filter" aria-label="Filter">
            <StackIcon name="filter" size={20} tone="muted" />
          </button>
        </div>
        <button type="button" className="st-site-picker">
          <StackIcon name="location" size={18} tone="brand" />
          <span>All Sites</span>
          <StackIcon name="chevrondown" size={14} tone="muted" />
        </button>
        <SegmentedControl
          options={[
            { id: "items", label: "Items" },
            { id: "fieldAssets", label: "Field Assets" },
          ]}
          value={tab}
          onChange={onTab}
        />
        <div className="st-result-count">Records Found: 200</div>
        <RecordStack>
          {records.map((row) => (
            <RecordRow
              key={row.id}
              title={row.title}
              fields={row.fields}
              onClick={() => openDetail(row.id)}
            />
          ))}
        </RecordStack>
        <div style={{ height: 72 }} />
      </div>
      <Fab />
    </>
  );
}

export function JobInventoryScreen({ nav }) {
  return (
    <>
      <NavBar title="J-003448" showBack showStar showMore onBack={() => nav("jobExecution")} />
      <div className="st-phone-content">
        <div className="st-page-title">J-003448</div>
        <SectionCard icon="task" title="Job Aids">
          <p style={{ fontSize: 14, color: "var(--st-text-weak)", lineHeight: "22px" }}>
            There are no available job aids.
          </p>
        </SectionCard>
        <SectionCard icon="workOrder" title="Inventory">
          <div className="st-section-card__actions">
            <button type="button" className="st-btn-secondary" onClick={() => nav("locateInventory")}>
              <StackIcon name="search" size={16} tone="brand" />
              Locate Inventory
            </button>
            <button type="button" className="st-btn-secondary">
              <StackIcon name="scan" size={16} tone="brand" />
              Uninstall
            </button>
          </div>
          <div className="st-section-card__eyebrow">USED</div>
          <RecordStack className="st-record-stack--in-card">
            {USED_ITEMS.map((item) => (
              <RecordRow
                key={item.id}
                title={item.title}
                action={<RowMenu />}
                fields={[
                  { label: "Qty Planned", value: item.planned },
                  { label: "Qty Actual", value: item.actual },
                ]}
              />
            ))}
          </RecordStack>
        </SectionCard>
        <div style={{ height: 72 }} />
      </div>
      <Fab />
    </>
  );
}

export function ItemDetailScreen({ nav }) {
  return (
    <>
      <NavBar title="Antennas Cabinet" showBack showStar showMore onBack={() => nav("locateInventory")} />
      <div className="st-phone-content st-phone-content--with-cta">
        <DetailHeader title="Antennas Cabinet" subtitle="2000" />
        <hr className="st-divider" />
        <MetadataList
          rows={[
            { label: "Manufacturer", value: "--" },
            { label: "Category", value: "--" },
            { label: "Tracking Method", value: "Uniquely Tracked" },
            { label: "Usage Type", value: "Installable" },
            { label: "Total Available", value: "64" },
            { label: "Nearest Site", value: "North Base (8074.44mi)" },
          ]}
        />
        <ChevronLink onClick={() => {}}>View Item Details</ChevronLink>
        <SectionCard icon="task" title="Forms" count={0}>
          <p className="st-empty-message">There are no forms attached to this item.</p>
        </SectionCard>
        <SectionCard icon="image" title="Photos & Files" count={0}>
          <button type="button" className="st-btn-primary">
            <StackIcon name="image" size={16} tone="white" style={{ marginRight: 6 }} />
            Add Photos & Files
          </button>
        </SectionCard>
        <div style={{ height: 80 }} />
      </div>
      <Fab />
      <BottomCta onClick={() => nav("installConsume")}>Install or Consume</BottomCta>
    </>
  );
}

export function FieldAssetDetailScreen({ nav }) {
  return (
    <>
      <NavBar title="123" showBack showStar showMore onBack={() => nav("locateInventory")} />
      <div className="st-phone-content st-phone-content--with-cta">
        <DetailHeader title="123" subtitle="500 Spool" />
        <hr className="st-divider" />
        <MetadataList
          rows={[
            { label: "Serial", value: "123" },
            { label: "Top Level Parent", value: "--" },
            { label: "Site", value: "Faiz site" },
            { label: "Status", value: "Available" },
          ]}
        />
        <ChevronLink onClick={() => {}}>View Field Asset Details</ChevronLink>
        <SectionCard
          icon="task"
          title="Forms"
          count={4}
          headerAction={(
            <button type="button" className="st-section-card__add" aria-label="Add form">
              <StackIcon name="add" size={16} tone="brand" />
            </button>
          )}
        >
          {FORMS.map((form) => (
            <div key={form.id} className="st-form-card">
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="st-form-card__title">{form.title}</div>
                <div className="st-form-card__site">Site: {form.site}</div>
              </div>
              <FormStatusPill status={form.status} />
            </div>
          ))}
        </SectionCard>
        <div style={{ height: 80 }} />
      </div>
      <Fab />
      <BottomCta onClick={() => nav("installConsume")}>Install or Consume</BottomCta>
    </>
  );
}

export function InstallConsumeScreen({ nav }) {
  return (
    <>
      <SheetHeader title="Install or Consume" onClose={() => nav("fieldAssetDetail")} />
      <div className="st-phone-content st-phone-content--white">
        <div className="st-form-field">
          <div className="st-form-field__label st-form-field__label--required">Quantity</div>
          <div className="st-form-field__value">123</div>
        </div>
        <div className="st-form-field">
          <div className="st-form-field__label st-form-field__label--required">Consumption Date</div>
          <div className="st-form-field__value">
            26/06/2026
            <StackIcon name="chevrondown" size={14} tone="muted" />
          </div>
        </div>
        <div className="st-form-field">
          <div className="st-form-field__label">
            Serial <StackIcon name="lock" size={12} tone="muted" style={{ marginLeft: 4 }} />
          </div>
          <div className="st-form-field__value">123</div>
        </div>
        <div className="st-form-field">
          <div className="st-form-field__label">Notes</div>
          <textarea className="st-form-field__input" placeholder="Notes" />
        </div>
        <div style={{ padding: "12px 14px", background: "var(--st-surface)" }}>
          <button type="button" className="st-btn-secondary st-btn-outline-media">
            <StackIcon name="image" size={16} tone="brand" />
            Add Photos & Files
          </button>
        </div>
        <div className="st-form-actions">
          <button type="button" className="st-btn-secondary">Consume &amp; Search</button>
          <button type="button" className="st-btn-primary">Consume</button>
        </div>
      </div>
    </>
  );
}

