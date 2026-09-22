import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftRight, Search } from "lucide-react";
import { INDIAN_AIRPORTS } from "../constants/airports";

const todayISO = () => new Date().toISOString().split("T")[0];

export default function SearchForm({ compact = false }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [origin, setOrigin] = useState(params.get("origin") || "DEL");
  const [destination, setDestination] = useState(params.get("destination") || "BOM");
  const [date, setDate] = useState(params.get("date") || todayISO());
  const [travelClass, setTravelClass] = useState(params.get("travelClass") || "Economy");

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin === destination) return;
    const query = new URLSearchParams({ origin, destination, date, travelClass });
    navigate(`/search?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-3 rounded-2xl bg-white p-4 shadow-lg shadow-ink-900/10 sm:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] sm:items-end ${
        compact ? "" : "sm:p-5"
      }`}
    >
      <Field label="From">
        <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="input">
          {INDIAN_AIRPORTS.map((a) => (
            <option key={a.code} value={a.code}>
              {a.city} ({a.code})
            </option>
          ))}
        </select>
      </Field>

      <button
        type="button"
        onClick={swap}
        aria-label="Swap origin and destination"
        className="mb-0.5 hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 sm:flex"
      >
        <ArrowLeftRight size={16} />
      </button>

      <Field label="To">
        <select value={destination} onChange={(e) => setDestination(e.target.value)} className="input">
          {INDIAN_AIRPORTS.map((a) => (
            <option key={a.code} value={a.code}>
              {a.city} ({a.code})
            </option>
          ))}
        </select>
      </Field>

      <Field label="Departure">
        <input type="date" value={date} min={todayISO()} onChange={(e) => setDate(e.target.value)} className="input" />
      </Field>

      <Field label="Class">
        <select value={travelClass} onChange={(e) => setTravelClass(e.target.value)} className="input">
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
        </select>
      </Field>

      <button
        type="submit"
        className="flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo px-5 font-medium text-white transition-colors hover:bg-indigo-700"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}
