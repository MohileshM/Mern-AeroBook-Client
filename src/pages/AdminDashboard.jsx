import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Users, Plane, Ticket, BadgeIndianRupee } from "lucide-react";
import api from "../api/axios";
import { formatINR } from "../constants/airports";

const PIE_COLORS = ["#2E3A87", "#E8971D", "#1F8A4C", "#6B7280", "#94A3B8", "#B45309"];

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [overTime, setOverTime] = useState([]);
  const [byAirline, setByAirline] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    api.get("/admin/stats/summary").then(({ data }) => setSummary(data));
    api.get("/admin/stats/bookings-over-time", { params: { days: 14 } }).then(({ data }) => setOverTime(data));
    api.get("/admin/stats/bookings-by-airline").then(({ data }) => setByAirline(data));
    api.get("/admin/stats/popular-routes").then(({ data }) => setRoutes(data));
  }, []);

  const cards = [
    { label: "Total users", value: summary?.totalUsers, icon: Users },
    { label: "Flights listed", value: summary?.totalFlights, icon: Plane },
    { label: "Confirmed bookings", value: summary?.totalBookings, icon: Ticket },
    { label: "Total revenue", value: summary ? formatINR(summary.totalRevenue) : undefined, icon: BadgeIndianRupee },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink-900">Admin dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo/10 text-indigo">
              <Icon size={16} />
            </div>
            <p className="text-2xl font-semibold text-ink-900">{value ?? "—"}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 font-medium text-ink-900">Bookings & revenue — last 14 days</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={overTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(d) => d.slice(5)} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value, name) => (name === "revenue" ? formatINR(value) : value)} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#2E3A87" strokeWidth={2} name="Bookings" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#E8971D" strokeWidth={2} name="Revenue (INR)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="mb-4 font-medium text-ink-900">Bookings by airline</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={byAirline}
                dataKey="bookings"
                nameKey="airline"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
              >
                {byAirline.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card lg:col-span-2">
          <h2 className="mb-4 font-medium text-ink-900">Most popular routes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={routes} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="route" width={160} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#2E3A87" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
