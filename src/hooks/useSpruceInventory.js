import { useCallback, useState } from "react";
import {
  CURRENT_JOB_ID,
  currentSiteAsset,
  initialInventory,
  initialRequests,
  warehouseInventory,
} from "../data/spruceData";

export function useSpruceInventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [siteAsset, setSiteAsset] = useState(currentSiteAsset);
  const [requests, setRequests] = useState(initialRequests);
  const [selectedSku, setSelectedSku] = useState(null);
  const [reserveTarget, setReserveTarget] = useState(null);
  const [installTarget, setInstallTarget] = useState(null);
  const [requestTarget, setRequestTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast({ msg });
    setTimeout(() => setToast(null), 2200);
  }, []);

  const openSku = useCallback((sku) => {
    setSelectedSku(sku);
  }, []);

  const openReserveSerial = useCallback(
    (sku, unitId) => {
      const item = inventory.find((i) => i.sku === sku);
      setReserveTarget({ sku, unitId, qty: null, itemName: item?.name ?? "" });
    },
    [inventory],
  );

  const openReserveQty = useCallback(
    (sku) => {
      const item = inventory.find((i) => i.sku === sku);
      setReserveTarget({ sku, unitId: null, qty: 1, itemName: item?.name ?? "" });
    },
    [inventory],
  );

  const closeReserve = useCallback(() => setReserveTarget(null), []);

  const confirmReserve = useCallback(
    (jobId) => {
      if (!reserveTarget) return;
      const { sku, unitId, qty } = reserveTarget;
      setInventory((prev) =>
        prev.map((it) => {
          if (it.sku !== sku) return it;
          if (it.serialized && unitId) {
            return {
              ...it,
              units: it.units.map((u) =>
                u.id === unitId ? { ...u, status: "reserved", reservedFor: jobId } : u,
              ),
            };
          }
          if (!it.serialized && qty) {
            const existing = it.reservations || [];
            const found = existing.find((r) => r.jobId === jobId);
            const reservations = found
              ? existing.map((r) => (r.jobId === jobId ? { ...r, count: r.count + qty } : r))
              : [...existing, { jobId, count: qty }];
            return {
              ...it,
              qty: {
                ...it.qty,
                available: it.qty.available - qty,
                reserved: it.qty.reserved + qty,
              },
              reservations,
            };
          }
          return it;
        }),
      );
      closeReserve();
      showToast(`Reserved for ${jobId}`);
    },
    [reserveTarget, closeReserve, showToast],
  );

  const unreserve = useCallback(
    (sku, unitId) => {
      setInventory((prev) =>
        prev.map((it) => {
          if (it.sku !== sku) return it;
          return {
            ...it,
            units: it.units.map((u) =>
              u.id === unitId ? { ...u, status: "available", reservedFor: null } : u,
            ),
          };
        }),
      );
      showToast("Reservation released");
    },
    [showToast],
  );

  const openInstall = useCallback((target) => setInstallTarget(target), []);
  const closeInstall = useCallback(() => setInstallTarget(null), []);

  const justInstall = useCallback(
    (target) => {
      setInventory((prev) =>
        prev.map((it) => {
          if (it.sku !== target.sku) return it;
          return {
            ...it,
            units: it.units.map((u) =>
              u.id === target.unitId
                ? { ...u, status: "installed", reservedFor: null, installedAt: CURRENT_JOB_ID }
                : u,
            ),
          };
        }),
      );
      closeInstall();
      showToast(`${target.unitId} installed`);
    },
    [closeInstall, showToast],
  );

  const swapInstall = useCallback(
    (target, oldAsset) => {
      setInventory((prev) =>
        prev.map((it) => {
          if (it.sku !== target.sku) return it;
          return {
            ...it,
            units: it.units.map((u) =>
              u.id === target.unitId
                ? { ...u, status: "installed", reservedFor: null, installedAt: CURRENT_JOB_ID }
                : u,
            ),
          };
        }),
      );
      setSiteAsset((prev) => ({
        ...prev,
        status: "disposed",
        disposedReplacedBy: target.unitId,
      }));
      closeInstall();
      showToast(`Swapped: ${oldAsset.serial} → ${target.unitId}`);
    },
    [closeInstall, showToast],
  );

  const openRequest = useCallback((sku) => setRequestTarget(sku), []);
  const closeRequest = useCallback(() => setRequestTarget(null), []);

  const submitRequest = useCallback(
    (item, qty, jobId) => {
      const newReq = {
        id: `REQ-${Math.floor(Math.random() * 900) + 200}`,
        sku: item.sku,
        name: item.name,
        qty,
        jobId,
        status: "requested",
        createdAt: "Just now",
        approvedBy: null,
      };
      setRequests((prev) => [newReq, ...prev]);
      closeRequest();
      showToast(`Requested ${qty} × ${item.name} for ${jobId}`);
      setTimeout(() => {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === newReq.id ? { ...r, status: "approved", approvedBy: "Joe Kiss" } : r,
          ),
        );
        showToast("Joe Kiss approved your request");
      }, 1800);
      setTimeout(() => {
        setRequests((prev) =>
          prev.map((r) => (r.id === newReq.id ? { ...r, status: "in_transit" } : r)),
        );
      }, 3600);
    },
    [closeRequest, showToast],
  );

  const markReceived = useCallback(
    (reqId) => {
      setRequests((prev) => prev.map((r) => (r.id === reqId ? { ...r, status: "received" } : r)));
      showToast("Marked as received — added to truck");
    },
    [showToast],
  );

  return {
    inventory,
    siteAsset,
    requests,
    selectedSku,
    reserveTarget,
    installTarget,
    requestTarget,
    toast,
    openSku,
    openReserveSerial,
    openReserveQty,
    closeReserve,
    confirmReserve,
    unreserve,
    openInstall,
    closeInstall,
    justInstall,
    swapInstall,
    openRequest,
    closeRequest,
    submitRequest,
    markReceived,
    warehouseInventory,
  };
}
