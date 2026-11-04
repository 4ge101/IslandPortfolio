interface FooterProps {
  isOverview: boolean;
}

export function Footer({ isOverview }: FooterProps) {
  if (!isOverview) return null;

  return (
    <footer className="fixed bottom-3 right-4 md:right-8 z-20 pointer-events-none hidden md:block">
      <div className="glass-pill px-3 py-1.5 rounded-full text-[11px] text-[#292827]/60 pointer-events-auto flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B9E87]" />
        <span>Doua</span>
        <span className="opacity-40">•</span>
        <span>Mathmatecian</span>
        <span className="opacity-40">•</span>
        <span>genius</span>
      </div>
    </footer>
  );
}
