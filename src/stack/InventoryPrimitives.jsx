import StackIcon from "./StackIcon";

export function DetailHeader({ title, subtitle }) {
  return (
    <div className="st-detail-header">
      <h1 className="st-detail-header__title">{title}</h1>
      {subtitle && <p className="st-detail-header__subtitle">{subtitle}</p>}
    </div>
  );
}

export function MetadataList({ rows }) {
  return (
    <dl className="st-metadata-list">
      {rows.map((row) => (
        <div key={row.label} className="st-metadata-list__row">
          <dt>{row.label}</dt>
          <dd>{row.value ?? "--"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function RecordStack({ children, className = "" }) {
  return <div className={`st-record-stack${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function RecordRow({ title, fields, onClick, action }) {
  const content = (
    <>
      <div className="st-record-row__head">
        <span className="st-record-row__title">{title}</span>
        {action}
      </div>
      {fields?.length > 0 && (
        <div className="st-record-row__fields">
          {fields.map((f) => (
            <div key={f.label} className="st-record-row__field">
              <span className="st-record-row__field-label">{f.label}</span>
              <span className="st-record-row__field-value">{f.value}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className="st-record-row st-record-row--interactive" onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className="st-record-row">{content}</div>;
}

export function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="st-segmented" role="tablist">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="tab"
          aria-selected={value === opt.id}
          className={`st-segmented__item${value === opt.id ? " st-segmented__item--active" : ""}`}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function FormStatusPill({ status }) {
  const normalized = status.toUpperCase();
  const isComplete = normalized === "COMPLETE";
  return (
    <span className={`st-form-pill${isComplete ? " st-form-pill--complete" : ""}`}>{normalized}</span>
  );
}

export function SheetHeader({ title, onClose }) {
  return (
    <header className="st-sheet-header">
      <button type="button" className="st-sheet-header__close" onClick={onClose} aria-label="Close">
        <StackIcon name="close" size={20} tone="muted" />
      </button>
      <h2 className="st-sheet-header__title">{title}</h2>
      <span aria-hidden="true" />
    </header>
  );
}

export function Fab({ onClick }) {
  return (
    <button type="button" className="st-fab" onClick={onClick} aria-label="Add">
      <StackIcon name="add" size={24} tone="white" />
    </button>
  );
}

export function BottomCta({ children, onClick }) {
  return (
    <div className="st-bottom-cta">
      <button type="button" className="st-bottom-cta__btn" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
