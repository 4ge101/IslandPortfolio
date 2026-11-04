import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

interface ModalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function ModalPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle backdrop overlay (light-dismiss enabled) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#292827]/15 backdrop-blur-[2px] cursor-pointer"
            aria-hidden="true"
          />

          {/* Editorial Content Drawer */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[620px] lg:w-[680px] bg-[#F8F5EF]/95 backdrop-blur-xl border-l border-[#C99B9B]/25 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 md:px-8 md:py-6 border-b border-[#C99B9B]/20 flex items-center justify-between gap-4 bg-[#F8F5EF]/60">
              <div>
                <div className="text-[11px] uppercase tracking-widest font-semibold text-[#613F4D]">
                  {subtitle}
                </div>
                <h2
                  id="drawer-title"
                  className="font-serif text-2xl md:text-3xl font-medium text-[#292827] mt-0.5 tracking-tight"
                >
                  {title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#292827]/80 hover:text-[#292827] hover:bg-[#E8CFCB]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
                  aria-label="Return to Island"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Island</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-[#292827]/70 hover:text-[#292827] hover:bg-[#E8CFCB]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8 space-y-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
