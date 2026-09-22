import { Link } from "react-router-dom";
import { Plane, Clock } from "lucide-react";
import { formatINR } from "../constants/airports";

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

const formatDuration = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

export default function FlightCard({ flight, travelClass = "Economy" }) {
  const fare = flight.fares.find((f) => f.class === travelClass) || flight.fares[0];

  return (
    <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo/10 text-indigo">
          <Plane size={18} />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">
            {flight.airline} &middot; {flight.flightNumber}
          </p>

          <div className="mt-1 flex items-center gap-3">
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">{formatTime(flight.departureTime)}</p>
              <p className="text-xs text-slate-500">{flight.origin.code}</p>
            </div>

            <div className="flex w-20 flex-col items-center gap-1 sm:w-32">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock size={12} />
                {formatDuration(flight.durationMinutes)}
              </span>
              <div className="flight-path w-full" />
              <span className="text-[11px] text-slate-400">{flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}</span>
            </div>

            <div>
              <p className="font-display text-lg font-semibold text-ink-900">{formatTime(flight.arrivalTime)}</p>
              <p className="text-xs text-slate-500">{flight.destination.code}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0 sm:text-right">
        <div>
          <p className="font-display text-xl font-semibold text-ink-900">{formatINR(fare?.price ?? 0)}</p>
          <p className="text-xs text-slate-500">{travelClass} &middot; {fare?.seatsAvailable ?? 0} seats left</p>
        </div>
        <Link to={`/flights/${flight._id}?travelClass=${encodeURIComponent(travelClass)}`} className="btn-primary">
          Select
        </Link>
      </div>
    </div>
  );
}
