import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDown, PlaneTakeoff } from "lucide-react";
import api from "../api/axios";
import SearchForm from "../components/SearchForm";
import FlightCard from "../components/FlightCard";
import { INDIAN_AIRPORTS } from "../constants/airports";

const cityName = (code) => INDIAN_AIRPORTS.find((a) => a.code === code)?.city || code;

export default function SearchResults() {
  const [params] = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("price");

  const origin = params.get("origin");
  const destination = params.get("destination");
  const date = params.get("date");
  const travelClass = params.get("travelClass") || "Economy";

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    api
      .get("/flights", { params: { origin, destination, date, travelClass, sort } })
      .then(({ data }) => {
        if (!ignore) setFlights(data);
      })
      .catch(() => {
        if (!ignore) setError("Couldn't load flights. Is the backend running?");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [origin, destination, date, travelClass, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <SearchForm compact />

      <div className="mt-8 flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink-900">
          {cityName(origin)} <span className="text-slate-400">to</span> {cityName(destination)}
        </h1>

        <label className="flex items-center gap-2 text-sm text-slate-500">
          <ArrowUpDown size={14} />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input h-9 w-40">
            <option value="price">Cheapest first</option>
            <option value="duration">Shortest first</option>
            <option value="departure">Earliest departure</option>
          </select>
        </label>
      </div>

      <div className="mt-5 space-y-3">
        {loading && <p className="py-10 text-center text-slate-500">Searching flights…</p>}

        {!loading && error && <p className="py-10 text-center text-red-600">{error}</p>}

        {!loading && !error && flights.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-center text-slate-500">
            <PlaneTakeoff size={28} className="text-slate-300" />
            <p>No flights match this route and date. Try another day.</p>
          </div>
        )}

        {!loading &&
          !error &&
          flights.map((flight) => <FlightCard key={flight._id} flight={flight} travelClass={travelClass} />)}
      </div>
    </div>
  );
}
