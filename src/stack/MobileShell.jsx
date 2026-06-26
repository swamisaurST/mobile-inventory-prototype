import { C } from "./tokens";
import StackIcon from "./StackIcon";

export function StatusBar() {
  return (
    <div className="st-status-bar" aria-hidden="true">
      <span className="st-status-time">2:45</span>
      <div className="st-status-icons">
        <span className="st-signal-icon" />
        <span className="st-wifi-icon" />
        <span className="st-battery-icon" />
      </div>
    </div>
  );
}

export function SiteTrackerHeader() {
  return (
    <header className="st-mobile-header st-mobile-header-main">
      <StatusBar />
      <div className="st-mobile-main-row">
        <img
          className="st-mobile-logo"
          src="/stack-icons/sitetracker-lettermark-white.svg"
          alt="Sitetracker"
        />
        <button type="button" className="st-mobile-icon-btn st-mobile-notification" aria-label="Notifications">
          <StackIcon name="notification" size={24} tone="white" />
        </button>
        <button type="button" className="st-mobile-avatar" aria-label="User profile">
          <StackIcon name="user" size={16} tone="dark" />
        </button>
      </div>
      <div className="st-mobile-org-name">chandraorg.my.salesforce.com</div>
    </header>
  );
}

export function NavBar({
  title,
  showPlus,
  showStar,
  showMore,
  showBack,
  onBack,
  onPlus,
  leftContent,
}) {
  return (
    <header className="st-mobile-header st-mobile-header-secondary">
      <StatusBar />
      <div className="st-mobile-secondary-toolbar">
        <div className="st-mobile-secondary-side st-mobile-secondary-side--left">
          {showBack ? (
            <button type="button" className="st-mobile-back-btn" onClick={onBack} aria-label="Back">
              <StackIcon name="chevronleft" size={24} tone="white" />
            </button>
          ) : null}
        </div>
        {leftContent || <h1 className="st-mobile-screen-title">{title}</h1>}
        <div className="st-mobile-secondary-side st-mobile-secondary-side--right">
          {showStar && (
            <button type="button" className="st-mobile-icon-btn" aria-label="Favorite">
              <StackIcon name="favorite" size={20} tone="white" />
            </button>
          )}
          {showMore && (
            <button type="button" className="st-mobile-icon-btn" aria-label="More options">
              <StackIcon name="overflow" size={20} tone="white" />
            </button>
          )}
          {showPlus && (
            <button type="button" className="st-mobile-icon-btn" onClick={onPlus} aria-label="Add">
              <StackIcon name="add" size={24} tone="white" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export function BottomTabs({ active, onTab }) {
  const tabs = [
    { id: "home", label: "HOME", icon: "home" },
    { id: "map", label: "MAP", icon: "map" },
    { id: "menu", label: "MENU", icon: "menu" },
  ];
  return (
    <nav className="st-bottom-tabs" aria-label="Main navigation">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onTab(t.id)}
            className={`st-bottom-tab${isActive ? " st-bottom-tab--active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <StackIcon name={t.icon} size={18} tone={isActive ? "brand" : "muted"} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function SectionCard({ icon, title, count, children, style, headerAction }) {
  return (
    <div className="st-section-card" style={style}>
      {(icon || title) && (
        <div className="st-section-card__header">
          {icon && <StackIcon name={icon} size={16} tone="dark" />}
          <span className="st-section-card__title">
            {title}
            {count !== undefined ? ` (${count})` : ""}
          </span>
          {headerAction}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatusBadge({ status, size = "sm" }) {
  const color = {
    New: C.blue,
    Logged: C.blue,
    Open: C.orange,
    "In Progress": C.teal,
    Closed: C.success,
    Urgent: C.error,
    "Checked-In": C.success,
  }[status] || C.textMuted;

  return (
    <span
      className={`st-status-badge st-status-badge--${size}`}
      style={{ background: `${color}18`, color }}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const color = {
    Urgent: C.error,
    High: C.orange,
    Medium: C.amber,
    Low: C.success,
  }[priority] || C.textMuted;

  return (
    <span className="st-priority-badge" style={{ color }}>
      <span className="st-priority-badge__dot" style={{ background: color }} />
      {priority}
    </span>
  );
}

export function AccordionRow({ label, isOpen, onClick }) {
  return (
    <button type="button" className="st-accordion-row" onClick={onClick}>
      <StackIcon name={isOpen ? "chevrondown" : "chevronright"} size={14} tone="dark" />
      <span>{label}</span>
    </button>
  );
}

export function RecentItem({ icon, name, subtitle, onClick }) {
  return (
    <button type="button" className="st-recent-item" onClick={onClick}>
      <div className="st-recent-item__icon">
        <StackIcon name={icon} size={18} tone="white" />
      </div>
      <div>
        <div className="st-recent-item__name">{name}</div>
        <div className="st-recent-item__subtitle">{subtitle}</div>
      </div>
    </button>
  );
}

export function MenuItem({ icon, label, isNew, onClick }) {
  return (
    <button
      type="button"
      className={`st-menu-item${isNew ? " st-menu-item--new" : ""}`}
      onClick={onClick}
    >
      <div className={`st-menu-item__icon${isNew ? " st-menu-item__icon--new" : ""}`}>
        <StackIcon name={icon} size={18} tone={isNew ? "brand" : "white"} />
      </div>
      <span className="st-menu-item__label">{label}</span>
      {isNew && <span className="st-menu-item__badge">NEW</span>}
    </button>
  );
}

export function ChevronLink({ children, onClick, align = "between" }) {
  return (
    <button type="button" className={`st-chevron-link st-chevron-link--${align}`} onClick={onClick}>
      <span>{children}</span>
      <StackIcon name="chevronright" size={14} tone="brand" />
    </button>
  );
}

export function SearchField({ placeholder }) {
  return (
    <div className="st-search-field">
      <StackIcon name="search" size={16} tone="muted" />
      <span>{placeholder}</span>
    </div>
  );
}
