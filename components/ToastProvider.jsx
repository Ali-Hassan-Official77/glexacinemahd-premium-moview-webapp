"use client";

import { Check, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToastProvider() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setToast({
        id: Date.now(),
        message: event.detail?.message || "Done",
        type: event.detail?.type || "success",
      });
    };
    window.addEventListener("glexa:toast", handler);
    return () => window.removeEventListener("glexa:toast", handler);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  const Icon = toast.type === "info" ? Info : Check;
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <div className="toast">
        <span className="toast-icon"><Icon size={15} /></span>
        <span>{toast.message}</span>
        <button type="button" onClick={() => setToast(null)} aria-label="Close notification"><X size={14} /></button>
      </div>
    </div>
  );
}
