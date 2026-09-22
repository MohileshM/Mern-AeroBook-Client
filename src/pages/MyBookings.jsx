import { useEffect, useState } from "react";
import { Plane, X } from "lucide-react";
import api from "../api/axios";
import { formatINR } from "../constants/airports";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/bookings/mine")
      .then(({ data }) => setBookings(data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCancel = async (bookingId) => {
    if (!confirm("Cancel this booking? This can't be undone.")) return;
    await api.put(`/bookings/${bookingId}/cancel`);
    load();
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink-900">My bookings</h1>

      {loading && <p className="mt-8 text-center text-slate-500">Loading…</p>}

      {!loading && bookings.length === 0 && (
        <p className="mt-8 text-center text-slate-500">You haven't booked any flights yet.</p>
      )}

      <div className="mt-6 space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo/10 text-indigo">
                  <Plane size={18} />
                </div>
                <div>
                  <p className="font-medium text-ink-900">
                    {b.flight.origin.city} ({b.flight.origin.code}) &rarr; {b.flight.destination.city} (
                    {b.flight.destination.code})
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatDate(b.flight.departureTime)} &middot; {b.flight.airline} &middot; {b.travelClass}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  b.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="text-sm text-slate-500">
                PNR <span className="font-medium text-ink-900">{b.pnr}</span> &middot; {b.passengers.length} passenger(s)
                &middot; <span className="font-medium text-ink-900">{formatINR(b.totalAmount)}</span>
              </div>
              {b.status === "CONFIRMED" && (
                <button
                  onClick={() => handleCancel(b._id)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <X size={14} /> Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
