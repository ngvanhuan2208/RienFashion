import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#282323] text-[#FFF9F5] px-4 py-3 rounded-full shadow-lg border border-[#6A504A]/30 flex items-center gap-3 animate-slide-in backdrop-blur-md"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-[#E8C7C9] shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 text-[#E8C7C9] shrink-0" />
          )}
          <p className="text-xs font-medium tracking-wide">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
