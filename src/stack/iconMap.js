/**
 * STACK utility icon registry — monochrome paths only (no Standard/Action tile backgrounds).
 * Sync assets: npm run sync-icons
 */
const catalog = (path) => `/stack-icons/catalog/${path}`;

/** @type {Record<string, { src: string }>} */
export const ICON_MAP = {
  // Shell (also in public/stack-icons/)
  notification: { src: "/stack-icons/notification.svg" },
  search: { src: "/stack-icons/search.svg" },
  add: { src: "/stack-icons/add.svg" },
  close: { src: "/stack-icons/close.svg" },
  favorite: { src: "/stack-icons/favorite.svg" },
  user: { src: "/stack-icons/user.svg" },
  home: { src: "/stack-icons/home.svg" },
  task: { src: catalog("Utility Icons/T/task.svg") },
  chevrondown: { src: "/stack-icons/chevrondown.svg" },
  chevronright: { src: "/stack-icons/chevronright.svg" },

  // Utility catalog
  chevronleft: { src: catalog("Utility Icons/C/chevronleft.svg") },
  chevronup: { src: catalog("Utility Icons/C/chevronup.svg") },
  calendar: { src: catalog("Utility Icons/D/date_input.svg") },
  clock: { src: catalog("Utility Icons/C/clock.svg") },
  chart: { src: catalog("Utility Icons/C/chart.svg") },
  location: { src: catalog("Utility Icons/L/location.svg") },
  layers: { src: catalog("Utility Icons/L/layers.svg") },
  photo: { src: catalog("Utility Icons/P/photo.svg") },
  image: { src: catalog("Utility Icons/I/image.svg") },
  scan: { src: catalog("Utility Icons/S/scan.svg") },
  voice: { src: catalog("Utility Icons/C/call.svg") },
  case: { src: catalog("Utility Icons/C/case.svg") },
  workOrder: { src: catalog("Utility Icons/W/work_order_type.svg") },
  workOrderItem: { src: catalog("Utility Icons/T/job_task_simple.svg") },
  expense: { src: catalog("Utility Icons/M/money.svg") },
  project: { src: catalog("Utility Icons/F/file.svg") },
  map: { src: catalog("Utility Icons/W/world.svg") },
  menu: { src: catalog("Utility Icons/R/rows.svg") },
  money: { src: catalog("Utility Icons/M/money.svg") },
  filter: { src: catalog("Utility Icons/F/filter.svg") },
  overflow: { src: catalog("Utility Icons/O/overflow.svg") },
  lock: { src: catalog("Utility Icons/L/lock.svg") },
  package: { src: catalog("Utility Icons/P/package.svg") },
};

export const ICON_NAMES = Object.keys(ICON_MAP);
