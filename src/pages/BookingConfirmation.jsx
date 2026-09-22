import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import api from "../api/axios";
import { formatINR } from "../constants/airports";

export default function BookingConfirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    api.get(`/bookings/${id}`).then(({ data }) => setBooking(data));
  }, [id]);

  if (!booking) return <p className="py-16 text-center text-slate-500">Loading booking…</p>;

  const { flight } = booking;

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 size={28} />
      </div>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900">Booking confirmed</h1>
      <p className="mt-1 text-slate-500">
        Your PNR is <span className="font-semibold text-ink-900">{booking.pnr}</span>
      </p>

      <div className="card mt-8 text-left">
        <p className="font-medium text-ink-900">
          {flight.origin.city} ({flight.origin.code}) &rarr; {flight.destination.city} ({flight.destination.code})
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {flight.airline} &middot; {flight.flightNumber} &middot; {booking.travelClass}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-slate-400">Passengers</p>
            <p className="font-medium text-ink-900">{booking.passengers.length}</p>
          </div>
          <div>
            <p className="text-slate-400">Total paid</p>
            <p className="font-medium text-ink-900">{formatINR(booking.totalAmount)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link to="/my-bookings" className="btn-primary">
          View my bookings
        </Link>
        <Link to="/" className="btn-secondary">
          Book another flight
        </Link>
      </div>
    </div>
  );
}
