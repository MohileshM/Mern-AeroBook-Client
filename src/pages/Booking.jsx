import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Plane, Plus, Trash2 } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../constants/airports";

const emptyPassenger = () => ({ name: "", age: "", gender: "Male" });

export default function Booking() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const travelClass = params.get("travelClass") || "Economy";
  const navigate = useNavigate();
  const { user } = useAuth();

  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([emptyPassenger()]);
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [contactPhone, setContactPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/flights/${id}`).then(({ data }) => setFlight(data));
  }, [id]);

  const fare = flight?.fares.find((f) => f.class === travelClass);
  const total = fare ? fare.price * passengers.length : 0;

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addPassenger = () => {
    if (fare && passengers.length < fare.seatsAvailable) setPassengers((prev) => [...prev, emptyPassenger()]);
  };

  const removePassenger = (index) => setPassengers((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data } = await api.post("/bookings", {
        flightId: id,
        travelClass,
        passengers: passengers.map((p) => ({ ...p, age: Number(p.age) })),
        contactEmail,
        contactPhone,
      });
      navigate(`/booking-confirmation/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!flight) return <p className="py-16 text-center text-slate-500">Loading flight…</p>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="card mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo/10 text-indigo">
          <Plane size={18} />
        </div>
        <div>
          <p className="font-medium text-ink-900">
            {flight.origin.city} ({flight.origin.code}) &rarr; {flight.destination.city} ({flight.destination.code})
          </p>
          <p className="text-sm text-slate-500">
            {flight.airline} &middot; {flight.flightNumber} &middot; {travelClass}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {passengers.map((p, i) => (
            <div key={i} className="card">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-ink-900">Passenger {i + 1}</h3>
                {passengers.length > 1 && (
                  <button type="button" onClick={() => removePassenger(i)} className="text-slate-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">Full name</span>
                  <input
                    required
                    value={p.name}
                    onChange={(e) => updatePassenger(i, "name", e.target.value)}
                    className="input"
                    placeholder="As per government ID"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">Age</span>
                  <input
                    required
                    type="number"
                    min={1}
                    max={120}
                    value={p.age}
                    onChange={(e) => updatePassenger(i, "age", e.target.value)}
                    className="input"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">Gender</span>
                  <select value={p.gender} onChange={(e) => updatePassenger(i, "gender", e.target.value)} className="input">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
            </div>
          ))}

          {fare && passengers.length < fare.seatsAvailable && (
            <button type="button" onClick={addPassenger} className="btn-secondary text-sm">
              <Plus size={14} /> Add another passenger
            </button>
          )}

          <div className="card space-y-3">
            <h3 className="font-medium text-ink-900">Contact details</h3>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">Email</span>
              <input
                required
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="input"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">Phone</span>
              <input
                required
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="input"
                placeholder="10-digit mobile number"
              />
            </label>
          </div>
        </div>

        <aside className="card h-fit space-y-3">
          <h3 className="font-medium text-ink-900">Fare summary</h3>
          <div className="flex justify-between text-sm text-slate-500">
            <span>{travelClass} &times; {passengers.length}</span>
            <span>{formatINR(fare?.price ?? 0)} each</span>
          </div>
          <div className="border-t border-slate-100 pt-3 flex justify-between font-display text-lg font-semibold text-ink-900">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Confirming…" : "Confirm booking"}
          </button>
        </aside>
      </form>
    </div>
  );
}
