import { Link, useNavigate } from "react-router-dom";
import { Plane, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-ink-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <Plane size={20} className="text-marigold" />
          AeroBook
        </Link>

        <div className="flex items-center gap-5 text-sm">
          {user && (
            <Link to="/my-bookings" className="hover:text-marigold transition-colors">
              My bookings
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-1 hover:text-marigold transition-colors">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1 text-white/70 sm:flex">
                <User size={16} />
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20 transition-colors"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-marigold px-3 py-1.5 font-medium text-ink-900 hover:bg-marigold-600 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
