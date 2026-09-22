import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-10">
      <div className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
        <Plane size={20} className="text-marigold" />
        AeroBook
      </div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Create an account</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Full name</span>
          <input required value={form.name} onChange={update("name")} className="input" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Email</span>
          <input required type="email" value={form.email} onChange={update("email")} className="input" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Phone</span>
          <input value={form.phone} onChange={update("phone")} className="input" placeholder="10-digit mobile number" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Password</span>
          <input
            required
            type="password"
            minLength={6}
            value={form.password}
            onChange={update("password")}
            className="input"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-indigo">
          Log in
        </Link>
      </p>
    </div>
  );
}
