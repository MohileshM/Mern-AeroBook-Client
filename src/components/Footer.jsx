import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2 font-display font-semibold text-ink-900">
            <Plane size={16} className="text-marigold" />
            AeroBook
          </div>
          <p>Domestic flight search &amp; booking across India.</p>
        </div>
      </div>
    </footer>
  );
}
