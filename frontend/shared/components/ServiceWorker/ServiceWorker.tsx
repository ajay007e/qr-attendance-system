"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {
      console.warn("Offline support is unavailable. You can still use the app online.");
    });
  }, []);

  return null;
}
