import { Link } from "react-router-dom";
import { PlaneTakeoff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <PlaneTakeoff size={32} className="text-slate-300" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900">Page not found</h1>
      <p className="mt-1 text-slate-500">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
