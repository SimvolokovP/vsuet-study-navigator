"use client";

import { useEffect } from "react";

interface PWAComponentProps {
  enabled?: boolean;
}

export function PWAComponent({ enabled = true }: PWAComponentProps) {
  useEffect(() => {
    if (!enabled) {
      console.log("ℹ️ Регистрация Service Worker отключена через настройки.");
      return;
    }

    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker успешно запущен!", reg.scope);
        })
        .catch((err) => {
          console.error("Ошибка запуска SW:", err);
        });
    }
  }, [enabled]);

  return null;
}
