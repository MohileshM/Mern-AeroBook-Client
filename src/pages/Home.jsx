import { Plane, ShieldCheck, BadgeIndianRupee, Clock3 } from "lucide-react";
import SearchForm from "../components/SearchForm";
import { INDIAN_AIRPORTS } from "../constants/airports";

const perks = [
  {
    icon: BadgeIndianRupee,
    title: "Fares in rupees, no surprises",
    body: "Every price you see includes the base fare — taxes and fees are shown before you pay, never after.",
  },
  {
    icon: Clock3,
    title: "Live seat availability",
    body: "Seat counts update the moment a booking is confirmed, so what you see is what you can book.",
  },
  {
    icon: ShieldCheck,
    title: "Free cancellation window",
    body: "Change your mind? Cancel from My Bookings and your seat is released back for other travellers.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(232,151,29,0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(46,58,135,0.5), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
          <p className="flex items-center gap-2 text-sm font-medium text-marigold">
            <Plane size={16} />
            Domestic flights across India
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Book your next flight in minutes.
          </h1>
          <p className="mt-4 max-w-lg text-white/70">
            Search {INDIAN_AIRPORTS.length} cities, compare fares across India's major airlines, and lock in your
            seat — all priced in INR.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-6">
        <SearchForm />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-marigold/15 text-marigold-600">
                <Icon size={18} />
              </div>
              <h3 className="text-base font-semibold text-ink-900">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
