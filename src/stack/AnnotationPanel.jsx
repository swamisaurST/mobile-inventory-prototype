import { ANNOTATION_EXTRA } from "../annotations";
import { SCREENS, SCREEN_ORDER, WORKFLOW_GROUPS } from "../workflows";

function screenAnnotation(screenId) {
  const base = SCREENS[screenId] ?? {};
  const extra = ANNOTATION_EXTRA[screenId] ?? {};
  return {
    ...base,
    ...extra,
    groupLabel: WORKFLOW_GROUPS.find((g) => g.id === base.group)?.label ?? base.group,
  };
}

export default function AnnotationPanel({ screenId, onScreenChange, locateTab }) {
  const data = screenAnnotation(screenId);
  const group = WORKFLOW_GROUPS.find((g) => g.id === data.group);

  return (
    <div className="st-annotation-body">
      <div className="st-annotation-block">
        <label className="st-annotation-label" htmlFor="st-screen-nav">Navigate to screen</label>
        <select
          id="st-screen-nav"
          className="st-screen-select"
          value={screenId}
          onChange={(e) => onScreenChange(e.target.value)}
        >
          {WORKFLOW_GROUPS.map((g) => (
            <optgroup key={g.id} label={g.label}>
              {SCREEN_ORDER.filter((id) => SCREENS[id].group === g.id).map((id) => (
                <option key={id} value={id}>
                  {SCREENS[id].title}
                  {ANNOTATION_EXTRA[id]?.isNew ? " ★ NEW" : ""}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {group && (
        <div className="st-annotation-block">
          <span className="st-annotation-label">Workflow</span>
          <div className="st-workflow-chips">
            {WORKFLOW_GROUPS.map((g) => (
              <span
                key={g.id}
                className={`st-workflow-chip${data.group === g.id ? " st-workflow-chip--active" : ""}`}
              >
                {g.label}
              </span>
            ))}
          </div>
          {group.description && (
            <p className="st-annotation-muted">{group.description}</p>
          )}
        </div>
      )}

      <div className="st-annotation-title-row">
        <h2 className="st-annotation-title">{data.title}</h2>
        {data.isNew && <span className="st-annotation-badge">NEW</span>}
      </div>

      {data.description && (
        <p className="st-annotation-desc">{data.description}</p>
      )}

      {data.newFeature && (
        <div className="st-annotation-callout">
          <div className="st-annotation-callout__label">What&apos;s new</div>
          <div className="st-annotation-callout__body">{data.newFeature}</div>
        </div>
      )}

      {screenId === "locateInventory" && (
        <p className="st-annotation-muted">
          Toggle <strong>Field Assets</strong> in the phone — currently{" "}
          <strong>{locateTab === "fieldAssets" ? "Field Assets" : "Items"}</strong>.
        </p>
      )}

      {data.components?.length > 0 && (
        <div className="st-annotation-block">
          <h3 className="st-annotation-section-title">Components</h3>
          <ul className="st-annotation-list">
            {data.components.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {data.interactions?.length > 0 && (
        <div className="st-annotation-block">
          <h3 className="st-annotation-section-title">Interactions</h3>
          <ul className="st-annotation-interactions">
            {data.interactions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="st-annotation-block">
        <h3 className="st-annotation-section-title">Demo paths</h3>
        <ul className="st-annotation-list">
          <li><strong>Spruce:</strong> Home → Job event → Install swap → Menu → Truck → Warehouse → Requests</li>
          <li><strong>Production:</strong> Job execution → Inventory → Locate → Detail → Install or consume</li>
          <li><strong>Tickets:</strong> Menu → Tickets</li>
        </ul>
      </div>

      <div className="st-annotation-screen-map">
        <div className="st-annotation-section-title">Screen map</div>
        {WORKFLOW_GROUPS.map((g) => (
          <div key={g.id} className="st-annotation-map-group">
            <div className="st-annotation-map-group__label">{g.label}</div>
            <div className="st-annotation-map-chips">
              {SCREEN_ORDER.filter((id) => SCREENS[id].group === g.id).map((id) => {
                const ann = screenAnnotation(id);
                return (
                  <button
                    key={id}
                    type="button"
                    className={`st-annotation-map-chip${id === screenId ? " st-annotation-map-chip--active" : ""}${ann.isNew ? " st-annotation-map-chip--new" : ""}`}
                    onClick={() => onScreenChange(id)}
                  >
                    {id === screenId ? "● " : ""}
                    {SCREENS[id].title.replace(/ ·.*/, "")}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="st-annotation-stack-foot">
        <div className="st-annotation-stack-foot__title">STACK Mobile Design System</div>
        <div className="st-annotation-stack-foot__body">
          <strong>Colors:</strong> ST Teal #00847C · Top Bar #1D2D34 · Success #027E46 · Error #C23934
          <br />
          <strong>Type:</strong> Barlow — Headline 16/20, Body 14/22, Caps 12/12
          <br />
          <strong>Icons:</strong> Sitetracker utility catalog via STACK icon map
        </div>
      </div>

      <div className="st-annotation-footnote">
        Field Central · Inventory · Mobile prototype · June 2026
      </div>
    </div>
  );
}
