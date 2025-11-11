"use client";

import { ReactNode, useEffect, useId } from "react";

interface FoodModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  testId?: string;
}

export function FoodModal({ open, title, children, onClose, testId = "food-modal" }: FoodModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-gray-100/40 px-4 py-10"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-2xl max-h-[calc(100svh-5rem)] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl shadow-slate-900/20"
        data-test-id={testId}
      >
        <div className="flex items-start justify-center gap-4">
          <h2 className="text-[30px] font-bold tracking-tight text-[#ff9a0f]" id={titleId}>
            {title}
          </h2>
        </div>
        <div className="mt-8 space-y-6 mx-0 md:mx-16 xl:mx-16 lg:mx-16">{children}</div>
      </div>
    </div>
  );
}
