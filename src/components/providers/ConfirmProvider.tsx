"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "info";
}

type ConfirmContextType = (options: ConfirmOptions | string) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({ message: "" });
  const resolverRef = useRef<(value: boolean) => void>(() => {});

  const confirm = (opts: ConfirmOptions | string) => {
    const parsedOptions = typeof opts === "string" ? { message: opts } : opts;
    setOptions({
      title: parsedOptions.title || "Konfirmasi",
      message: parsedOptions.message,
      confirmText: parsedOptions.confirmText || "Ya, Hapus",
      cancelText: parsedOptions.cancelText || "Batal",
      variant: parsedOptions.variant || "danger",
    });
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolverRef.current(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolverRef.current(true);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-stone-100 p-6 shadow-xl z-10"
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  options.variant === "danger" ? "bg-red-50 text-red-500" : "bg-accent-50 text-accent-500"
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-base font-semibold text-stone-900">
                    {options.title}
                  </h3>
                  <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                    {options.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  {options.cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-all cursor-pointer active:scale-[0.98] active:opacity-90 ${
                    options.variant === "danger"
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-stone-900 hover:bg-stone-800"
                  }`}
                >
                  {options.confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}
