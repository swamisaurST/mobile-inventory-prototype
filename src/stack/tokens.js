/** STACK mobile design tokens — design/stack2/STACK-MOBILE-DESIGN.md */
export const C = {
  teal: "#00847C",
  tealDark: "#00736C",
  tealSelected: "#EBF5F4",
  topBar: "#1D2D34",
  subBar: "#354851",
  textDefault: "#1D2D34",
  textWeak: "#494D4F",
  textMuted: "#707577",
  textWhite: "#FFFFFF",
  iconDefault: "#666D71",
  iconDark: "#1D2D34",
  surface: "#FFFFFF",
  surfaceBg: "#F7F8F7",
  surfaceSection: "#F0EEED",
  border: "#DDDBDA",
  success: "#027E46",
  warning: "#FFB75D",
  error: "#C23934",
  calGreen: "#027E46",
  orange: "#F57C00",
  amber: "#FFB75D",
  blue: "#0176D3",
  red: "#C23934",
  newHighlight: "#FFF8F0",
  newBorder: "#FFF3E0",
};

export const statusColors = {
  New: C.blue,
  Logged: C.blue,
  Open: C.orange,
  "In Progress": C.teal,
  Closed: C.success,
  Urgent: C.error,
  "Checked-In": C.success,
};

export const priorityColors = {
  Urgent: C.error,
  High: C.orange,
  Medium: C.amber,
  Low: C.success,
};
